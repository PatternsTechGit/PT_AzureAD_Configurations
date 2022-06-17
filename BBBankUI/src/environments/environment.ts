// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrlBase: 'http://localhost:5070/api/', // Url of the API this client app will try to access.
  clientId: '66f42264-8560-4d8b-9670-c28bb9e1a0c4', // Application (client) ID of this Angular app that was registered as client app in Azure AD App Registrations.
  authority: 'https://login.microsoftonline.com/0c087d99-9bb7-41d4-bd58-80846660b536', // The ID of the Tenant in which this client app was registered in Azure AD.
  redirectUri: 'http://localhost:4200', // Url where Azure AD will come back after Signing In Process completes. 
  postLogoutRedirectUri: 'http://localhost:4200/login', //Url where Azure AD will come back after Signing Out Process completes. 
  defaultScope: 'api://bbbankapi/default',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
export default environment;
