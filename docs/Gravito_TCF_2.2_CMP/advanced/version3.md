Version 3(Internal) (Latest)
============================

Note: Version 3 does not correspond to TCF Version 3 but it is Internal Version 3 for gravito CMP, and is TCF version 2 complaint.

How it works?
-------------

**Configuration**

TCF CMP can be configure and customize as per your need with the help of configuration object.You can generate this configuration object using our Admin Portal or you can create your own from scratch. 

* **Note**: *{VendorsCount}* is a placeholder which you can insert anywhere in the text. It will display the total number of vendors in your config.

Following is the example of config object for TCF CMP.

```
window.gravitoCMPConfig = {
settings: {
type: "TCF",
useGravitoBackend: true,
catchCMPEvents: true,
sdkVersion: 2,
userIdModule: false,
backendUrl: "",
version: "bundle_latest_3",
},
core: {
cookieName: "TcString",
cookieExpiry: 2,
useTopDomain: false,
syncAfter: 1800,
settingBtnClassname: "manageSettings",
version: 2,
purposeOneTreatment: true,
publisherCountryCode: "EN",
googleTcfId: 755,
purposes: [
  {
    type: "purposes",
    id: 1,
  },
  {
    type: "stacks",
    id: 26,
  },
  {
    type: "purposes",
    id: 10,
  },
],
specialFeatures: [1, 2],
specialPurposes: [1, 2],
features: [1, 2, 3],
vendors: [2, 6, 8, 511, 11, 14, 278, 755],
nonTCFVendors: [
  {
    type: "nonTCFVendors",
    id: 2,
    name: "Amazon",
    description: "description for amazon",
    isConsentable: false,
  },
],
customPurposes: [
  {
    type: "customPurpose",
    id: 1,
    name: "Data Collection",
    description:
      "Gravito can collect data and can use it for better experience of its customers",
    descriptionLegal:
      "Gravito can collect data and can use it for better experience of its customers",
    isLegitimate: true,
  },
  {
    type: "customPurpose",
    id: 2,
    name: "Targeting",
    description: "Gravito can use data for targeting its customers",
    descriptionLegal: "Gravito can use data for targeting its customers",
    isLegitimate: false,
  },
],
publisherRestrictions: [
  {
    purposeID: 1,
    restrictionType: "REQUIRE_CONSENT",
    vendors: [6, 12],
  },
  {
    purposeID: 1,
    restrictionType: "REQUIRE_CONSENT",
    vendors: [8],
  },
  {
    purposeID: 2,
    restrictionType: "REQUIRE_CONSENT",
    vendors: [8],
  },
],
},
text: {
firstLayer: {
  title: "We need your consent to provide personalized experience",
  introductionText:
    "Gravito and its <span id='partners-link'> {VendorsCount} third-party vendors</span> collect personal data (e.g. IP address, device identifier) through the use of cookies and other technical methods which are storing and accessing data on your device to provide the best user experience and show targetted content and advertising.",
  consentableItemDescription:
    "Gravito and its partners require consent for following:",
  legalFooter:
    'By accepting, you are allowing data processing within the service, rejection can affect the user experience. Some third-party vendors might use their legitimate interest to operate, you can object that or change other settings at any time by selecting "Settings" at the bottom of the page.',
  privacyPolicyUrl: "https://www.gravito.net/#privacy-policy",
  privacyLabel: "Privacy Policy",
  actions: ["Settings", "Accept All"],
},
secondLayer: {
  title: "Gravito Setting title changed",
  introductionText:
    "Please select from the following list of purposes to help us serve you better.",
  tabLabels: ["Purposes and Characteristics", "Vendors"],
  copyTCstringTooltip: "Click here to copy TC string to clipboard",
  checkBoxLabels: {
    consent: "Consent",
    legitimateInterest: "Legitimate interest",
  },
  actions: ["Accept All", "Accept Selected", "Reject All"],
},
thirdLayer: {
  confirmationForUncheck: {
    heading: "Are you sure you want to disable?",
    paragraphs: [
      "These cookies or other technical methods are important so that we can provide you with a better and more personal user experience.",
    ],
  },
  confirmationForAcceptSelected: {
    heading: "Are you sure you want to disable?",
    paragraphs: [
      "Cookies and other technical methods are important so that we can provide you with a better and more personal user experience.",
      "Without cookies or other technical methods, our ability to develop our services based on your preferences becomes more difficult, some features may be blocked, and your user experience may deteriorate.",
    ],
  },
  actions: ["Cancel", "Yes"],
},
cookieReportLayer: {
  buttonTitle: "Cookie Report",
  heading: "Cookie Reports layer header",
  introductionText:
    "Cookies are small text files that websites can use to make the user experience more efficient. We use cookies on the website. We use cookies on this website to improve the visitor experience and to better serve you. Based on our scan, this is how the cookies that will be used based on the preference set by you.",
  beforeAcceptHeader: "Before Accepting",
  afterAcceptHeader: "After Accepting",
  nameHeader: "Name",
  domainHeader: "Domain",
  descriptionHeader: "Description",
  cookieTypeHeader: "Cookie Type",
  expiryHeader: "Expiry in days",
  httpOnlyHeader: "Http Only",
  noCookieDataMessage: "No scan results available",
  noCookieDataBeforeAcceptingMsg:
    "No cookies were found before Accepting the consents on this domain.",
  noCookieDataAfterAcceptingMsg:
    "No cookies were found after Accepting the consents on this domain ",
},
commonTerms: {
  purposes: "Purposes",
  consent: "Consent",
  legitimateInterest: "Legitimate interest",
  specialPurposes: "Special Purposes",
  specialFeatures: "Special Features",
  features: "Features",
  policyURl: "Policy Url",
  nonTCFVendors: "Non TCF Vendors",
  vendors: "Vendor",
  customPurposes: "Custom Purposes",
  cookieMaxAge: "Cookie max age (seconds)",
  disclouserDetails: "Details",
  disclouserFetchingError: "Unable to get Json data",
  disclouserHeaderIdentifier: "Identifier",
  disclouserHeaderDomain: "Domain",
  disclouserHeaderType: "Type",
  disclosureHeaderMaxAge: "Max Age(s)",
  disclosureHeaderPurpose: "Purposes",
  cookieRefresh: "Cookie refresh",
  usesCookies: "Uses cookies",
  usesNonCookieAccess: "Uses non cookie access",
  yes: "Yes",
  no: "No",
  seconds: "seconds",
  days: "days",
  alertMessageForCopiedTcString: "CMP Settings Copied",
},
},
style: {
logoUrl: "https://cdn.gravito.net/logos/gravito_logo_white_background.png",
primaryColor: "orange",
secondaryColor: "#666",
fonts: [
  {
    url: "https://fonts.gstatic.com/s/lato/v17/S6uyw4BMUTPHjxAwXjeu.woff2",
    unicodeRange:
      "U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;",
  },
  {
    url: "https://fonts.gstatic.com/s/lato/v17/S6uyw4BMUTPHjx4wXg.woff2",
    unicodeRange:
      "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;",
  },
],
customCSS: "",
consentInputType: "checkbox",
useAccordionForPurpose: true,
layoutType: "2-tabs",
disableConfirmationModal: true,
showCopyTcStringButton: true,
},
};

```

### Deployment

TCF CMP's can be deployed with the help of SDK V2. Add your config object to window.gravitoCMPConifg variable.

```
window.gravitoCMPConfig = gravitoCMPConfig;

```

#### Standalone TCF CMP.

To add Standalone TCF CMP add following script in your website below your gravitoCMPConfig object.

```
var gravitoSDKTag = document.createElement("script");
gravitoSDKTag.src = "https://cdn.gravito.net/sdkv2/latest/sdk.js";
gravitoSDKTag.onload = function () {
  window.gravito.init("tcfCMP");
};
document.body.appendChild(gravitoSDKTag);

```

#### TCF CMP with backend.

To add TCF CMP with backend add following values to settings section of your config object

```
window.gravitoCMPConfig = {
  settings: {
    type: "TCF",
    useGravitoBackend: true,
    backendUrl: "https://gto.yourDomainName", // if left empty url will be generated from hostname
    version: "bundle_latest_3",
    sdkVersion: 2,
  },
  //other sections
};

```

And add following script in your website below your gravitoCMPConfig object.

```
var gravitoSDKTag = document.createElement("script");
gravitoSDKTag.src = "https://cdn.gravito.net/sdkv2/latest/sdk.js";
gravitoSDKTag.onload = function () {
  window.gravito.init("tcfCMP", "firstParty");
};
document.body.appendChild(gravitoSDKTag);

```

Migrating to TCF CMP Version 3
------------------------------

1.  Add settings section your config Object with following properties.

```
var gravitoCMPConfig = {
  settings: {
    type: "TCF",
    useGravitoBackend: false, // Set this flag to true if you want to use gravito backend with TCF CMP

    backendUrl: "", // This will be the URL of your gravito firstparty domain for backend support EX: https://gto.yourdomain.net. if left empty it will be evaluated from your hosted domain.

    version: "bundle_latest_3", // This will be the version of your TCFCMP. bundle_latest_3 is recommended

    sdkVersion: 2, // Don;t change this value ,

    catchCMPEvents: false, // Set this value to true if you want to capture CMP events and generate report on https://admin.gravito.net dashborad.
  },
  // other properties
};

```

1.  TCF CMP Version 3 should be deployed with gravito SDK version 2.Change your deployment script as follows.

```
window.gravitoCMPConfig = gravitoCMPConfig; // Replace this with your config object;var gravitoSDKTag = document.createElement("script");
gravitoSDKTag.src = "https://cdn.gravito.net/sdkv2/latest/sdk.js";
gravitoSDKTag.onload = function () {
  window.gravito.init("tcfCMP"); // For Standalone TCF CMP
// window.gravito.init("tcfCMP",firstParty); // For TCF CMP with backend
};
document.body.appendChild(gravitoSDKTag);

```

1.  TCF CMP Version 3 adds some special feature such as providing your custom html for first layer of UI, Configuring necessary consents. To use any of them please contact gravito support.
2.  Test your implementation of TCF CMP Version 3 thoroughly to ensure that all features are working as expected and that there are no issues with backend integration.
3.  Once you have confirmed that everything is working as expected, you can proceed with deploying TCF CMP Version 3 on your production website.

Note Please note that this is a general guide and your specific implementation may require additional steps. It is always recommended to test your implementation thoroughly before deploying it to production. If you have any questions or issues during the migration process, please reach out to Gravito support for assistance.