# Azure Active Directory Authentication

## Azure Active Directory Authentication

One of the main features of an identity platform is to verify, or authenticate, credentials when a user signs in to a device, application, or service. In Azure Active Directory (Azure AD), authentication involves more than just the verification of a username and password. 

## About this exercise

Previously we scaffolded a new Angular application in which we have integrated 

* FontAwesome Library for icons
* Bootstrap Library for styling buttons
* Routing for multiple components e.g. CreateAccountComponent, ManageAccountsComponent, DepositFundsComponent, TransferFundsComponent
* Side Nav with links 
* Client side authorization using Auth Guard
* Show & Hide Side Nav links based on the logged in User's role.

For more details about this base project See: https://github.com/PatternsTechGit/PT_ClientSideAuthorization


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

