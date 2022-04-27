# Azure Active Directory Authentication

## Azure Active Directory Authentication

One of the main features of an identity platform is to verify, or authenticate, credentials when a user signs in to a device, application, or service. In Azure Active Directory (Azure AD), authentication involves more than just the verification of a username and password. 

![SPA](https://user-images.githubusercontent.com/100709775/165463550-04481e0d-dcc1-4b1e-9021-7f0cf3784798.jpeg)


## About this exercise

Previously we scaffolded a new Angular application in which we have integrated 

* FontAwesome Library for icons
* Bootstrap Library for styling buttons
* Routing for multiple components e.g. CreateAccountComponent, ManageAccountsComponent, DepositFundsComponent, TransferFundsComponent
* Side Nav with links for navigation
* Client side authorization using Auth Guard
* Show & Hide Side Nav links based on the logged in User's role.
* We have created two app registration one for UI & other for API, crated App roles, assigned scope in API app registration, Assigned clientId in API app registration,adding and grant permission to API, assigning roles to users and configured token in [Azure Portal](https://portal.azure.com/)   

For more details about how to setup the active directory configurations in Azure portal see : https://github.com/PatternsTechGit/PT_AzureAD_Setup


## In this exercise

 * We will configure [Azure Active Directory](https://azure.microsoft.com/en-us/services/active-directory/) in Azure Portal.
 * We will configure the Microsoft Authentication Library for Angular.

 Here are the steps to begin with 

 ## Step 1: Install Microsoft Authentication Library for Angular

 [Microsoft Authentication Library Angular](https://www.npmjs.com/package/@azure/msal-angular) (MSAL) enables Angular web applications to authenticate users using Azure AD work and school accounts (AAD), Microsoft personal accounts (MSA) and social identity providers like Facebook, Google, LinkedIn, Microsoft accounts, etc through Azure AD B2C service. It also enables your app to get tokens to access Microsoft Cloud services such as [Microsoft Graph](https://developer.microsoft.com/en-us/graph).

 To install the MSAL in angular application use the command below : 
 
 ```
    npm install @azure/msal-browser @azure/msal-angular@latest
 ```

 ## Step 2: Setting Up Environment variable
 We will configure the app registration, clientID and other values in environment.ts as below :

 ```ts
export const environment = {
  production: false,
  apiUrlBase: 'http://localhost:5070/api/',  // Base Url of API Project
  clientId: '66f42264-8560-4d8b-9670-c28bb9e1a0c4', // Application (client) ID from the app registration
  authority: 'https://login.microsoftonline.com/0c087d99-9bb7-41d4-bd58-80846660b536', // The Azure cloud instance and the app's sign-in audience (tenant ID, common, organizations, or consumers)
  redirectUri: 'http://localhost:4200', // This is your redirect URI
  postLogoutRedirectUri: 'http://localhost:4200/login', // redirect URI on logout
  defaultScope: 'api://bbbankapi/default',
};
 ```

  ## Step 3: Configure msalConfig 
  Create a new `auth-config.ts` file and paste the code as below :

  ```ts
/**
* This file contains authentication parameters. Contents of this file
 * is roughly the same across other MSAL.js libraries. These parameters
 * are used to initialize Angular and MSAL Angular configurations in
 * in app.module.ts file.
 */

import { LogLevel, Configuration, BrowserCacheLocation } from '@azure/msal-browser';
import environment from 'src/environments/environment';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

/**
  * Configuration object to be passed to MSAL instance on creation.
  * For a full list of MSAL.js configuration parameters, visit:
  * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
  */
export const msalConfig: Configuration = {
  auth: {
    clientId: environment.clientId,  // Assigning ClientId value.
    authority: environment.authority, // Assigning authority value.
    redirectUri: environment.redirectUri, // Assigning redirect URL value.
    postLogoutRedirectUri: environment.postLogoutRedirectUri, // Assigning postLogoutRedirectUri value.
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage, // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    storeAuthStateInCookie: isIE, // Set this to "true" if you are having issues on IE11 or Edge.
  },
  system: {
    loggerOptions: {
      // logging of MSAL statements.
      loggerCallback(logLevel: LogLevel, message: string) {
        console.log(message);
      },
      logLevel: LogLevel.Verbose, // Default. MSAL logs the full details of library behavior.
      piiLoggingEnabled: false, // If set to true, logs personal and organizational data. By default this is false so that your application doesn't log personal data. 
    },
  },
};

/**
 * Add here the endpoints and scopes when obtaining an access token for protected web APIs. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const protectedResources = {
  bbbankApi: {
    endpoint: environment.apiUrlBase, // Assigning Base URL of API Project.
    scopes: [environment.defaultScope], // Assigning default scope value.
  },
};

export const loginRequest = {
  scopes: [environment.defaultScope] as any[], // Initializing default scope value.
};
  ```
