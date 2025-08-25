// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  env: 'local',
  baseURL: "https://stg-kube.fazeal.com/business-admin/graphql",
  businessChatBaseUrl: "https://dev-kube-business-chat.fazeal.com",
  baseCustomerGraphQlURL: "https://stg-kube.fazeal.com/fazeal-social/graphql",
  baseCustomerSiteURL: "https://stg-business-admin.fazeal.com/graphql",
  chatUrL: "http://localhost:8008/",
  awsKey: 'https://s3.us-east-1.wasabisys.com/fazeal-social-nonprod.fazeal.com/',
  landingUrl: 'https://dev-business.fazeal.com/',
  assetsAwsKey:"https://s3.us-east-1.wasabisys.com/fazeal-ui-assets.fazeal.com/"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
