Version 4 (Latest)
==================

How it works?
-------------

### Configuration

Light CMP can be configure and customize as per your need with the help of configuration object.You can generate this configuration object using our Admin Portal or you can create your own from scratch. Following is the example of config object for light CMP.

```
var gravitoCMPConfig={
    "settings": {
      "type": "Light",
      "useGCM": false,
      "useGravitoBackend": false,
      "backendUrl": "",
      "catchCMPEvents": true,
      "sdkVersion": 2,
      "gtmTags": []
    },
    "core": {
      "cookieName": "GCString",
      "languageCode": "en",
      "cookieExpiry": 365,
      "settingBtnId": "manageSettings",
      "firstLayerId": "",
      "secondLayerId": "",
      "cookieReportLayerId": "",
      "syncEvents": [
        "layer1:opt-in:all",
        "layer2:opt-in:all",
        "layer2:opt-in:selected",
        "layer2:opt-out:all",
        "layer1:opt-out:all"
      ],
      "syncAfter": 1800,
      "useTopDomain": false,
      "adsConsentId": 4,
      "analyticsConsentId": 3,
      "version": 1,
      "consents": [
        {
          "type": "consent",
          "id": 1,
          "name": "Essential cookies",
          "description": "Essential cookies and similar technologies are implementing the basic functions of the website such as page navigation, use of forms and shopping cart functionality. Without these technologies the website will not work properly.",
          "isConsentable": false
        },
        {
          "type": "consent",
          "id": 2,
          "name": "Functional cookies",
          "description": "Functional cookies and similar technologies make it possible to save information that changes the way the website appears to you or functions, e.g. your preferred language.",
          "isConsentable": true
        },
        {
          "type": "consent",
          "id": 3,
          "name": "Statistical cookies",
          "description": "Statistical cookies and similar technologies allow us to collect information about how our website is used. This information helps us to improve the content and usability of the website.",
          "isConsentable": true
        },
        {
          "type": "consent",
          "id": 4,
          "name": "Marketing & advertising cookies",
          "description": "Marketing cookies and similar technologies are used to track visitors across websites. The intention is to display ads that are relevant and interesting to you and thus more valuable for us and third-party advertisers.",
          "isConsentable": true
        }
      ]
    },
    "text": {
      "firstLayer": {
        "title": "We need your consent to provide personalized experience",
        "introductionText": "We and our third-party vendors are collecting personal data (e.g. IP address, device identifier) through the use of cookies and other technical methods which are storing and accessing data on your device to provide the best user experience and show targetted content and advertising.",
        "legalFooter": "By accepting, you are allowing data processing within the service, rejection can affect the user experience.",
        "privacyPolicyUrl": "https://site.url.invalid/privacy-policy",
        "privacyLabel": "Privacy Policy",
        "checkBoxLabels": {
          "consent": "Consent"
        },
        "actions": ["Accept all", "Settings", "Reject all"]
      },
      "secondLayer": {
        "title": "Gravito Settings",
        "introductionText": "Please select from the following list of purposes to help us serve you better.",
        "privacyPolicyUrl": "https://site.url.invalid/privacy-policy",
        "privacyLabel": "Privacy Policy",
        "checkBoxLabels": {
          "consent": "Consent"
        },
        "actions": ["Accept all", "Accept selected", "Reject all"]
      },
      "confirmationLayer": {
        "confirmationForUncheck": {
          "heading": "Are you sure you want to disable?",
          "paragraphs": [
            "These cookies or other technical methods are important so that we can provide you with a better and more personal user experience."
          ]
        },
        "confirmationForAcceptSelected": {
          "heading": "Are you sure you want to disable?",
          "paragraphs": [
            "Cookies and other technical methods are important so that we can provide you with a better and more personal user experience.",
            "Without cookies or other technical methods, our ability to develop our services based on your preferences becomes more difficult, some features may be blocked, and your user experience may deteriorate."
          ]
        },
        "actions": ["Cancel", "Yes"]
      },
      "cookieReportLayer": {
        "buttonTitle": "Cookie Report",
        "heading": "Cookie Reports layer header",
        "introductionText": "Cookies are small text files that websites can use to make the user experience more efficient. We use cookies on the website. We use cookies on this website to improve the visitor experience and to better serve you. Based on our scan, this is how the cookies that will be used based on the preference set by you.",
        "beforeAcceptHeader": "Before Accepting",
        "afterAcceptHeader": "After Accepting",
        "nameHeader": "Name",
        "domainHeader": "Domain",
        "descriptionHeader": "Description",
        "cookieTypeHeader": "Cookie Type",
        "expiryHeader": "Expiry in days",
        "httpOnlyHeader": "Http Only",
        "noCookieDataMessage": "No scan results available",
        "noCookieDataBeforeAcceptingMsg": "No cookies were found before Accepting the consents on this domain.",
        "noCookieDataAfterAcceptingMsg": "No cookies were found after Accepting the consents on this domain "
      }
    },
    "style": {

      "customCSS": "",
      "logoUrl": "https://cdn.gravito.net/logos/gravito_logo.jpg",
      "logoSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"105\" height=\"18\" viewBox=\"0 0 105 18\"><path fill=\"#1C4598\" fill-rule=\"evenodd\" d=\"M88.922 10.934h6.569l-3.285-6.331-3.284 6.331zm9.95 6.844l-1.563-3.046H87.086l-1.545 3.045h-5.837L89.07.29h6.568L105 17.778h-6.128zM73.445.291h5.284v17.487h-5.284V.291zm-9.152 0h6.974l-9.413 8.18 10.617 9.307h-7.463l-9.64-9.12L64.293.291zM50.085 17.778h5.283V.291h-5.283v17.487zm-9.04-4.209c1.156 0 1.563-.069 1.84-.325.258-.24.372-.548.372-1.576V6.332c0-1.028-.114-1.334-.372-1.574-.277-.258-.684-.326-1.84-.326h-8.208c-1.155 0-1.561.068-1.837.326-.26.24-.374.546-.374 1.574v5.336c0 1.028.114 1.337.374 1.576.276.256.682.325 1.837.325h8.209zm6.976-1.198c0 2.43-.423 3.269-1.123 4.072C45.826 17.64 44.265 18 41.258 18h-8.632c-3.007 0-4.57-.36-5.641-1.557-.7-.803-1.122-1.641-1.122-4.072V5.629c0-2.43.423-3.266 1.122-4.071C28.057.36 29.619 0 32.626 0h8.633c3.006 0 4.567.36 5.64 1.558.699.805 1.122 1.642 1.122 4.071v6.742zM5.056 17.778H0V.291h8.744l10.031 13.055V.291h5.056v17.487h-8.567L5.056 4.5v13.278z\"/></svg>",
      "logoType": "img",
      "primaryColor": "orange",
      "secondaryColor": "grey",

      "disableConfirmationModal": false,

      "fonts": [
        {
          "url": "https://cdn.gravito.net/fonts/lato-v22-latin-700.woff2",
          "unicodeRange": "U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;"
        },
        {
          "url": "https://cdn.gravito.net/fonts/lato-v22-latin-700.woff2",
          "unicodeRange": "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;"
        }
      ]
    }
  },

```

### Deployment

Light CMP's can be deployed with the help of SDK V2. Add your config object to window.gravitoCMPConifg variable.

```
window.gravitoCMPConfig = gravitoCMPConfig;

```

#### Standalone Light CMP.

To add Standalone light CMP add following script in your website below your gravitoCMPConfig object.

```
var gravitoSDKTag = document.createElement("script");
gravitoSDKTag.src = "https://cdn.gravito.net/sdkv2/latest/sdk.js";
gravitoSDKTag.onload = function () {
  window.gravito.init("lightCMP");
};
document.body.appendChild(gravitoSDKTag);

```

#### Light CMP with backend.

To add Light CMP with backend add following values to settings section of your config object

```
window.gravitoCMPConfig = {
  settings: {
    type: "Light",
    useGravitoBackend: true,
    backendUrl: "https://gto.yourDomainName", // if left empty url will be generated from hostname
    version: "bundle_latest_4",
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
  window.gravito.init("lightCMP", "firstParty");
};
document.body.appendChild(gravitoSDKTag);

```

#### Using GCM mode.

GCM support can be added to both standalone CMP and CMP with backend by adding useGCM property to settings section.

```
window.gravitoCMPConfig = {
  settings: {
    type: "Light",
    useGCM: true, // add this to enable GCMuseGravitoBackend: true,
    backendUrl: "https://gto.yourDomainName", // if left empty url will be generated from hostname
    version: "bundle_latest_2",
    sdkVersion: 2,
  },
  //other sections
};

```

### Sample Scripts

#### Light CMP in Modal View.

By using customCSS property you can render CMP in modal view. Following script demonstrates this type of customization.

```
var customCss =
  "gravitoLightCMP-layer1-logo{ margin: 0 25px 0 0 !important; width: 80px !important; }.gravitoLightCMP-layer1-modal,.gravitoLightCMP-layer2-modal {width: 75%;top: 50%;left: 50%;-ms-transform: translate(-50%, -50%);transform: translate(-50%, -50%);bottom: unset;}";
window.gravitoCMPConfig = {
  settings: {
    type: "Light",
    useGCM: false,
    useGravitoBackend: false,
    backendUrl: "",
    catchCMPEvents: true,
    sdkVersion: 2,
    userIdModule: false,
    gtmTags: [],
    version: "bundle_latest_4",
  },
  core: {
    cookieName: "GCString",
    languageCode: "en",
    cookieExpiry: 365,
    settingBtnId: "manageSettings",
    firstLayerId: "",
    secondLayerId: "",
    cookieReportLayerId: "",
    syncEvents: [
      "layer1:opt-in:all",
      "layer2:opt-in:all",
      "layer2:opt-in:selected",
      "layer2:opt-out:all",
      "layer1:opt-out:all",
    ],
    syncAfter: 1800,
    useTopDomain: false,
    adsConsentId: 4,
    analyticsConsentId: 3,
    version: 1,
    consents: [
      {
        type: "consent",
        id: 1,
        name: "Essential cookies",
        description:
          "Essential cookies and similar technologies are implementing the basic functions of the website such as page navigation, use of forms and shopping cart functionality. Without these technologies the website will not work properly.",
        isConsentable: false,
      },
      {
        type: "consent",
        id: 2,
        name: "Functional cookies",
        description:
          "Functional cookies and similar technologies make it possible to save information that changes the way the website appears to you or functions, e.g. your preferred language.",
        isConsentable: true,
      },
      {
        type: "consent",
        id: 3,
        name: "Statistical cookies",
        description:
          "Statistical cookies and similar technologies allow us to collect information about how our website is used. This information helps us to improve the content and usability of the website.",
        isConsentable: true,
      },
      {
        type: "consent",
        id: 4,
        name: "Marketing & advertising cookies",
        description:
          "Marketing cookies and similar technologies are used to track visitors across websites. The intention is to display ads that are relevant and interesting to you and thus more valuable for us and third-party advertisers.",
        isConsentable: true,
      },
    ],
  },
  text: {
    firstLayer: {
      title: "We need your consent to provide personalized experience",
      introductionText:
        "We and our third-party vendors are collecting personal data (e.g. IP address, device identifier) through the use of cookies and other technical methods which are storing and accessing data on your device to provide the best user experience and show targetted content and advertising.",
      legalFooter:
        "By accepting, you are allowing data processing within the service, rejection can affect the user experience.",
      privacyPolicyUrl: "https://site.url.invalid/privacy-policy",
      privacyLabel: "Privacy Policy",
      checkBoxLabels: {
        consent: "Consent",
      },
      actions: ["Accept all", "Settings", "Reject all"],
    },
    secondLayer: {
      title: "Gravito Settings",
      introductionText:
        "Please select from the following list of purposes to help us serve you better.",
      privacyPolicyUrl: "https://site.url.invalid/privacy-policy",
      privacyLabel: "Privacy Policy",
      checkBoxLabels: {
        consent: "Consent",
      },
      actions: ["Accept all", "Accept selected", "Reject all"],
    },
    confirmationLayer: {
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
  },
  style: {
    customCSS: customCss,
    logoUrl: "https://cdn.gravito.net/logos/gravito_logo.jpg",
    logoSvg:
      '<svg xmlns="http://www.w3.org/2000/svg" width="105" height="18" viewBox="0 0 105 18"><path fill="#1C4598" fill-rule="evenodd" d="M88.922 10.934h6.569l-3.285-6.331-3.284 6.331zm9.95 6.844l-1.563-3.046H87.086l-1.545 3.045h-5.837L89.07.29h6.568L105 17.778h-6.128zM73.445.291h5.284v17.487h-5.284V.291zm-9.152 0h6.974l-9.413 8.18 10.617 9.307h-7.463l-9.64-9.12L64.293.291zM50.085 17.778h5.283V.291h-5.283v17.487zm-9.04-4.209c1.156 0 1.563-.069 1.84-.325.258-.24.372-.548.372-1.576V6.332c0-1.028-.114-1.334-.372-1.574-.277-.258-.684-.326-1.84-.326h-8.208c-1.155 0-1.561.068-1.837.326-.26.24-.374.546-.374 1.574v5.336c0 1.028.114 1.337.374 1.576.276.256.682.325 1.837.325h8.209zm6.976-1.198c0 2.43-.423 3.269-1.123 4.072C45.826 17.64 44.265 18 41.258 18h-8.632c-3.007 0-4.57-.36-5.641-1.557-.7-.803-1.122-1.641-1.122-4.072V5.629c0-2.43.423-3.266 1.122-4.071C28.057.36 29.619 0 32.626 0h8.633c3.006 0 4.567.36 5.64 1.558.699.805 1.122 1.642 1.122 4.071v6.742zM5.056 17.778H0V.291h8.744l10.031 13.055V.291h5.056v17.487h-8.567L5.056 4.5v13.278z"/></svg>',
    logoType: "img",
    primaryColor: "orange",
    secondaryColor: "grey",
    disableConfirmationModal: false,
    fonts: [
      {
        url: "https://cdn.gravito.net/fonts/lato-v22-latin-700.woff2",
        unicodeRange:
          "U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;",
      },
      {
        url: "https://cdn.gravito.net/fonts/lato-v22-latin-700.woff2",
        unicodeRange:
          "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;",
      },
    ],
  },
};
var gravitoSDKTag = document.createElement("script");
gravitoSDKTag.src = "https://cdn.gravito.net/sdkv2/latest/sdk.js";
gravitoSDKTag.onload = function () {
  window.gravito.init("lightCMP");
};
document.body.appendChild(gravitoSDKTag);

```

Migrating to lightCMP Version 4
-------------------------------

1.  Add settings section your config Object with following properties.

```
var gravitoCMPConfig = {
  settings: {
    type: "Light",
    useGCM: false, // Set this flag to true if you want to use Google Consent Mode with light CMP
    useGravitoBackend: false, // Set this flag to true if you want to use gravito backend with Light CMP
    backendUrl: "", // This will be the URL of your gravito firstparty domain for backend support EX: https://gto.yourdomain.net. if left empty it will be evaluated from your hosted domain.
    version: "bundle_latest_4", // This will be the version of your lightCMP. bundle_latest_4 is recommended
    sdkVersion: 2, // Don;t change this value ,
    catchCMPEvents: false, // Set this value to true if you want to capture CMP events and generate report on https://admin.gravito.net dashborad.
  },
  // other properties
};
```

1.  CSS structure in Version 4 is different from that of Version 2 so if you are comming from version 2 you will have to redo the css customization for v4 and update you customCSS property in style section of your config object.
2.  Light CMP Version 4 should be deployed with gravito SDK version 2.Change your deployment script as follows.

```
window.gravitoCMPConfig = gravitoCMPConfig; // Replace this with your config object;var gravitoSDKTag = document.createElement("script");
gravitoSDKTag.src = "https://cdn.gravito.net/sdkv2/latest/sdk.js";
gravitoSDKTag.onload = function () {
  window.gravito.init("lightCMP"); // For Standalone Light CMP
  // window.gravito.init("lightCMP",firstParty); // For Light CMP with backend
};
document.body.appendChild(gravitoSDKTag);

```

1.  Version 4 now has feature to resurface CMP to users if their is version upgrade in config. To enable this you will have to add `resurfaceOnMissingVersion: true` to the core section of your config.
2.  Test your implementation of Light CMP Version 4 thoroughly to ensure that all features are working as expected and that there are no issues with the updated CSS structure or GCM/backend integration.
3.  Once you have confirmed that everything is working as expected, you can proceed with deploying Light CMP Version 4 on your production website.

Note Please note that this is a general guide and your specific implementation may require additional steps. It is always recommended to test your implementation thoroughly before deploying it to production. If you have any questions or issues during the migration process, please reach out to Gravito support for assistance.