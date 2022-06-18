# Azure Active Directory Authentication

## Azure Active Directory Authentication

Azure AD is the identity platform to manage your internal and external users securely. Organizations use Azure AD to store user information like Name, ID, Email, Address, etc.

Azure Active Directory is a secure online authentication store, which can contain users and groups. Users have a username and a password which are used when you sign into an application that uses Azure AD for authentication. So for example all of the Microsoft Cloud services use Azure AD for authentication: Office 365, Dynamics 365 and Azure.

--------


## **About this exercise**

## Previously
Previously we scaffolded a new Angular application in which we have integrated 

* **FontAwesome** Library for icons
* **Bootstrap** Library for styling buttons
* We have multiple components e.g. (*CreateAccountComponent, ManageAccountsComponent, DepositFundsComponent, TransferFundsComponent*) in our application for which we have already configured routing.
* There is an **authorization service** with two functions `Login` & `Logout`, The login function is setting up a hardcoded user properties (Name,Email,Roles) and storing it in local storage where as logout function is removing that user object from local storage.
* There is an *login component* with login button which calls the authorization service's login function. 
* There is a *Toolbar Component* with logout link which calls the authorization service' logout function.  
* There is an **Angular Materials SideNav** that has links to the Components mentioned above but they are Shown or hidden based on logged in user's role.
* We have already registered 2 apps in azure portal(*BBankUI and BBankAPI*), Created App Roles in BBankAPI, assigned them to users and exposed the API
through a default scope and set permission of this API to BBankUI App.

For more details about how to setup the active directory configurations in Azure portal see : https://github.com/PatternsTechGit/PT_AzureAD_Setup

## In this exercise

Using the BBBankUI App that was registered in Azure AD Portal 

 * We will configure the **Microsoft Authentication Library** in our Angular project.
 * We will replace the fake authorization service with [MSAL service](https://azuread.github.io/microsoft-authentication-library-for-js/ref/msal-angular/classes/_msal_service_.msalservice.html) in login component
 * Using Client App(*BBBankAPI*) that was registered in the Azure AD Portal, we will configure *Asp.net Core* App to validate incoming token from Azure AD.    


 Whenever our Angular Single Page Application (SPA) clicks on the login button it will redirect to the Azure Active Directory page and after logging-in it will return back to our Angular application with token. The Angular application will inject the received token in every call to .Net Core API. The API will verify the received token from Azure AD and then  will send response.

![SPA](https://user-images.githubusercontent.com/100709775/165463550-04481e0d-dcc1-4b1e-9021-7f0cf3784798.jpeg)

---------

 Here are the steps to begin with. But before starting you can clone **Before** folder from our repository. It will give you a head start for this lab. 

 ## Step 1: Install Microsoft Authentication Library for Angular

 [Microsoft Authentication Library Angular](https://www.npmjs.com/package/@azure/msal-angular) (MSAL) enables Angular web applications to authenticate users using Azure AD work and school accounts (AAD), Microsoft personal accounts (MSA) and social identity providers like Facebook, Google, LinkedIn, Microsoft accounts, etc through Azure AD B2C service. It also enables your app to get tokens to access Microsoft Cloud services such as [Microsoft Graph](https://developer.microsoft.com/en-us/graph).

 To install the MSAL in angular application use the command below : 

 ```
    npm install @azure/msal-browser @azure/msal-angular@latest
 ```
 --------

 ## Step 2: Setting Up Environment variable
 We will configure the app registration, clientID and other values. For this go to *BBBankUI* and replace below given code in `environment.ts` file. Assign the values from Azure AD account we created in last lab. For more, you can [Read Here](https://github.com/PatternsTechGit/PT_AzureAD_Setup)

 ```ts
export const environment = {
  production: false,
  apiUrlBase: 'http://localhost:5070/api/', // Url of the API this client app will try to access.
  clientId: 'xxxxxx-8560-4d8b-9670-c28bb9e1a0c4', // Application (client) ID of this Angular app that was registered as client app in Azure AD App Registrations.
  authority: 'https://login.microsoftonline.com/xxxxxx-9bb7-41d4-bd58-80846660b536', // The ID of the Tenant in which this client app was registered in Azure AD.
  redirectUri: 'http://localhost:4200', // Url where Azure AD will come back after Signing In Process completes. 
  postLogoutRedirectUri: 'http://localhost:4200/login', //Url where Azure AD will come back after Signing Out Process completes. 
  defaultScope: 'api://xxxxxapi/xxxult',
};
 ```
-------------

  ## Step 3: Setting Up msalConfig 
  Create a new `auth-config.ts` file in *app folder*.

  In this file we will configure 3 things as below :

  * We will pass the configuration parameters to create an *MSAL instance*. 
  * We will configure *MSAL Interceptor* that will inject token to all http communication.
  * We will configure *MSALGuard* to restrict users to routes to a protected components.

  We will replace `AuthGuard` with `MsalGuard` in *app-routing.module.ts* to protect DashboardComponent 
```ts
{ path: '', component: DashboardComponent, canActivate: [MsalGuard] }
```
Import MSAL in the same file
```ts
import { MsalGuard } from '@azure/msal-angular'
```

We will configure the MSAL items. For this go to *auth-config.ts* file we created and paste the below given code. 

  ```ts
/**
 * This file contains authentication parameters. Contents of this file
 * is roughly the same across other MSAL.js libraries. These parameters
 * are used to initialize Angular and MSAL Angular configurations in
 * in app.module.ts file.
 */

import { MsalGuardConfiguration, MsalInterceptorConfiguration } from '@azure/msal-angular';
import { LogLevel, Configuration, BrowserCacheLocation, InteractionType, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { environment } from 'src/environments/environment';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

/**
  * Configuration object to be passed to MSAL instance on creation.
  * For a full list of MSAL.js configuration parameters, visit:
  * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
  */
export const msalConfig: Configuration = {
  auth: {
    clientId: environment.clientId, // Application (client) ID of this Angular app that was registered as client app in Azure AD App Registrations.
    authority: environment.authority, // The ID in this URI is the Id of the Tenant in which this client app was registered in Azure AD.
    redirectUri: environment.redirectUri, // Url where Azure AD will come back after Signing In Process completes. 
    postLogoutRedirectUri: environment.postLogoutRedirectUri, //Url where Azure AD will come back after Signing Out Process completes. 
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage, // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    storeAuthStateInCookie: isIE, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: { // MSAL provides loggerOptions where we can configure logging to receive logs of all steps performed during sign in process. 
      loggerCallback(logLevel: LogLevel, message: string) {
        console.log(message);
      },
      logLevel: LogLevel.Info, // Different levels of logs are available . 'Verbose' will have most detailed information. 
      piiLoggingEnabled: false,
    },
  },
};

/**
 * Add here the endpoints and scopes when obtaining an access token for protected web APIs. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
 export const protectedResources = {
  bbbankApi: {
    // Scopes defines what client application (this Angular app) can do in the Api.
    // in our application all resources of api are exposed through one default scope. and App Roles are there to define what a particular user can do. 
    // Which will be handled on API side using [Authorize(Roles="xxx")] attribute.
    // Since all resources in the API can be accessed by one default scope we are getting token against the baseUrl. 
    endpoint: environment.apiUrlBase,
    scopes: [environment.defaultScope],
    // We could have introduced multiple scopes for different types of resources om api and could have handled them using [RequireScope('xxx')] attribute on api side.
  },
}; 

export const loginRequest = {
  // This scope is exposed by API App and added as permission by Client app (this app) in the Azure AD Portal. 
  // When client app (this App) will try to login with this scope, it will receive App Roles information as well in the token since App roles are also configured in API App
  scopes: [environment.defaultScope] as any[],
};


/**
 * Here we pass the configuration parameters to create an MSAL instance.
 * For more info, visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/configuration.md
 */

 export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication(msalConfig);
}

/**
 * MSAL Angular will automatically retrieve tokens for resources
 * added to protectedResourceMap. For more info, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/initialization.md#get-tokens-for-web-api-calls
 */

// This Interceptor setting will add access token to all http calls that are mentioned in  protectedResourceMap. 
// Since we are mentioning baseUrl, So all the http calls starting with baseUrl will have access_token injected in the header that will have role and scope info in it
export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();

  protectedResourceMap.set(protectedResources.bbbankApi.endpoint, protectedResources.bbbankApi.scopes);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

/**
 * Set your default interaction type for MSALGuard here. If you have any
 * additional scopes you want the user to consent upon login, add them here as well.
 */
// Setting up MSAL on any route will automatically check if the user is logged in and will take the user to login flow if its not logged in and then will let route to proceed. 
export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: loginRequest,
  };
}
  ```
  ----------

## Step 4: Configure AppModule

  We will inject `MSAL_INSTANCE` , `MsalInterceptor` and `MSALGuardConfigFactory` in *app.module.ts*

  ```ts
  @NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ManageAccountsComponent,
    CreateAccountComponent,
    DepositFundsComponent,
    TransferFundsComponent,
    ToolbarComponent,
    SidenavComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,  // CLI adds AppRoutingModule to the AppModule's imports array
    MsalModule
  ],
  providers: [TransactionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService],
  bootstrap: [AppComponent,MsalRedirectComponent]
})
export class AppModule { }
  ```
-------------

  ## Step 5: Setting Up MSAL Login Functionality

  In *login.component.ts* component we will inject the `MsalService` and will call the `loginRedirect` function on login button click event.

  We will setup the `MsalBroadcastService` for Different events which are triggered by MSAL throughout the Auth process, Here we will filter the `LOGIN_SUCCESS` event and will decode the received token then set loggedInUser properties.

  ```ts
  /* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType, } from '@azure/msal-browser';
import { Subject, takeUntil } from 'rxjs';
import { filter } from 'rxjs/internal/operators/filter';
import jwt_decode from 'jwt-decode'; //Run 'npm install jwt-decode' to install the library.
import { AppUser } from '../models/app-user';
import { loginRequest } from '../auth-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loggedInUser: AppUser;

  private readonly _destroying$ = new Subject<void>();

  constructor(
    private authService: MsalService,
    private router: Router,
    // Different events are triggered by MSAL throughout the Auth process. You can filter upon these events to to perform custom operations. 
    // complete list of Events are available at https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/events.md
    private msalBroadcastService: MsalBroadcastService,
  ) { }

  ngOnInit(): void {
    this.msalBroadcastService.msalSubject$
      .pipe(
        // filtering on LOGIN_SUCCESS event. Every event returns object of type EventMessage
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
        // eslint-disable-next-line no-underscore-dangle
        takeUntil(this._destroying$),
      )
      .subscribe((result: EventMessage) => {
        const payload = result.payload as AuthenticationResult;
        // Sets the account to use as the active account. If no account is passed to the acquireToken APIs, then MSAL will use this active account.
        this.authService.instance.setActiveAccount(payload.account);
        if (payload.account.homeAccountId) {
          this.setLoggedInUser(payload.accessToken);
        }
      });
  }

  login() {
    this.authService.loginRedirect(loginRequest);
  }

  setLoggedInUser(accessToken: any) {
    //decoding the token and setting up values of logged in user.
    const tokenInfo = this.getDecodedAccessToken(accessToken);
    this.loggedInUser = {
      id: tokenInfo.oid,
      firstName: tokenInfo.given_name,
      lastName: tokenInfo.family_name,
      username: tokenInfo.unique_name,
      email: tokenInfo.email,
      roles: tokenInfo.roles,
    } as AppUser;
    localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));
    this.router.navigate(['/'])
      .then(() => {
        window.location.reload();
      });
  }

  // eslint-disable-next-line class-methods-use-this
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
  ```
-------------
  ## Step 6: Setting Up MSAL Logout Functionality

  We will inject the `MsalService` in `toolbar.component.ts` and will call the `logout` function on logout button click event. 

  ```ts
 import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MsalService } from '@azure/msal-angular';
import { AppUser } from '../models/app-user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Input() inputSideNav: MatSidenav;
  loggedInUser?: AppUser;
  constructor(private authService: AuthService) {
    
  }

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  }
  
  logout(): void {
    localStorage.removeItem('loggedInUser');
    this.authService.logout();
  }

}
  ```
  --------------

  ## Step 7: Configuring Authentication in Asp.net core 

To tell Asp.net core, form where it has to validate incoming token, we have to first add the required nuget package using the command. 

```
Install-Package Microsoft.AspNetCore.Authentication.AzureAD.UI
```

In the appsettings.json file add the following Configuration Section 

```json
,
  "AzureAd": {
    "Instance": "https://login.microsoftonline.com/",
    "Domain": "xxxx.onmicrosoft.com", // Tenant URL
    "TenantId": "xxxxx-9bb7-41d4-bd58-80846660b536", // Client ID of API App registered in Azure AD Portal
    "ClientId": "api://xxxxxx", // Application ID URI from the Overview tab of API App registered in Azure AD Portal
    "Audience": "api://xxxxxx" // Application ID URI from the Overview tab of API App registered in Azure AD Portal
  }
```

Using this configuration settings we will add Authorization in *Program.cs* file 

```c#
builder.Services.AddAuthentication(AzureADDefaults.BearerAuthenticationScheme)
    .AddAzureADBearer(options => configuration.Bind("AzureAd", options));
```
We will add a variable
```csharp
var configuration = new ConfigurationBuilder()
               .SetBasePath(Directory.GetCurrentDirectory())
               .AddJsonFile("appsettings.json")
               .Build();
```

and finally add Authentication and Authorization in Asp.net Core's pipeline

```csharp
app.UseCors(MyAllowSpecificOrigins);
// Order is important here
app.UseAuthentication();
app.UseAuthorization();
// Order is important here
app.MapControllers();
```




Next we will decorate *GetLast12MonthBalances* function of **TransactionController** with *Authorize* attribute and **account-holder** role as this function will return transactions of a single account. For this paste the below given code 

```c#
[Authorize(Roles = "account-holder")]
```

--------------

## Step 8: Getting User ID and Display User Data

This is the final step of this lab where we will login our user and display their data. Follow these steps to complete this task

- Run your API and UI
- To run your UI in local environment use this url http://localhost:4200/login


- CLick the login button   
![](/Before/BBBankUI/src/assets/images/1.png)
- At this point it will ask you to authorize via Microsoft OAuth 
![](/Before/BBBankUI/src/assets/images/2.jpg)

- After successfully logging in you must see this screen. 
![](/Before/BBBankUI/src/assets/images/4.jpg)

Here you are successfully logged in but you will notice that no user data(balances, years, etc) is displaying at the moment. This is because we have not sent UserID to our API for authorization.

In this lab we will provide this UserID manually to our API. Follow these steps for this task:

- *Right click* and *inspect* this dashboard
- Go to *Applications* and check the local storage http://localhost:4200
- Here we have stored userID in in variable *loggedInUser*
![](/Before/BBBankUI/src/assets/images/5.jpg)
- Copy this LoggedIn User-ID
- In API code go to *BBBankContext.cs* file and replace this userId in the variable **AzureADUserID**
```csharp
private string AzureADUserID = "0e34f8a4-e09b-4f9f-9765-d062exxxxxx";
```

- Finally logout from portal completely and run API/UI again. You will see all the data of your loggedIn user. 
![](/Before/BBBankUI/src/assets/images/3.jpg)

-------------