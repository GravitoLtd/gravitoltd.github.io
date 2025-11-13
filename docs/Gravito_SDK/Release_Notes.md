# Release Notes

Release Notes 6.1.0 (11/11/2025)
New Features:

- Added Support for New SDK feature called IsHuman
  This feature allows websites to determine if a user is human or a bot, enhancing security and user experience.

  To enable this feature, set:

  ```js
  window.gravito.config = {
    baseURL: "https://your-base-url.com", // Base URL for sending data to backend, if not set, default Gravito URL will be used
    sendIsHumanToBackend: true, // Enable sending IsHuman data to backend
    performanceThreshold: 0.02, // Threshold for performance metrics
    isHumanLikenessThreshold: 1, // Threshold for determining human likeness
  };
  ```

Release Notes 6.0.1 (13/10/2025)

Bug Fixes:

- Fixed an issue where sdk was not able to deploy only firstParty module when CMP module was not included in the configuration.

Release Notes 6.0.0 (v600) (10/06/2025)

New Features:

- Added support for Gravito CMP v6 and all its components.  
  This version introduces full compatibility with the latest Gravito CMP v6, enabling seamless integration with all CMP modules.
- Changed the signature of the `gravito.init()`  
  This allows for more flexible and dynamic initialization of the Gravito SDK.

Changes:

- Removed unused modules to improve performance and reduce SDK size.
- Major refactor for v6 compatibility.

Breaking Changes:

- This version is not backward compatible.
- CMP versions below v6 are no longer supported.

Integration:

Use the following snippet to include this version of the SDK in your project:

```html
<script>
  // init gravito
  window.gravito = {};

  // add config object to gravito
  window.gravito.config = {
    cmp: {
      settings: {
        // common settings for all CMP components
      },
      styles: {
        // common styles for all CMP components
      },
      tcf: {
        // configuration for TCF CMP
      },
      standard: {
        // configuration for standard CMP
      },
    },
    firstParty: {
      // configuration for first party CMP
    },
  };

  // load gravito SDK
  var gravitoSDKTag = document.createElement("script");
  gravitoSDKTag.src = "https://cdn.gravito.net/sdk/v6/latest/sdk.js";
  gravitoSDKTag.onload = function () {
    window.gravito.init();
  };
  document.body.appendChild(gravitoSDKTag);
</script>
```

Release Notes 3.0.6 (v306)_ (06/05/2025)_

New Features:

- Added Support for Microsoft Universal Event Tracking (UET) Mode
  You can now enable Microsoft UET tracking by configuring useUET and adsConsentId in your CMP setup. This allows consent-aware integration with Microsoft's advertising platform.

Release Notes (V 2.0.12)_ (08/02/2024)_

New Features:

- SDK now emits separate events when the user has clicked "reject all" previously. This enhancement provides more granular insights into user interactions, allowing for better tracking and analysis of user behavior.
- Added support for GCMV2 for TCF Consent Banners. With this update, Gravito now supports GCMV2.

Release Notes (V 2.0.11 ) *(31/01/2024)*

New Features:

1\. Additional Consent Mode Support with TCF CMP

GravitoSDK now seamlessly supports Google's Additional Consent Mode when integrated with TCF CMP. This enhancement ensures that your application is equipped to handle additional consent requirements in compliance with evolving privacy standards set by Google.

Bug Fixes:

1\. Crash Fix for Empty First-Party Data

In version 2.0.11, we've addressed a  bug that caused the SDK to crash when encountering empty first-party data. This bug fix ensures the stability of your website, providing a seamless experience for users even when first-party data is absent.

Release Notes ( V 2.0.8 ) (_04/01/2024_)

New Features

1.  Google Consent Mode V2 Integration in Light CMP:
    - Gravito SDK now seamlessly integrates Google Consent Mode V2 functionalities within the Light CMP (Consent Management Platform). This update empowers developers to leverage Google's enhanced consent management features, allowing for more refined control over data tracking and advertising purposes.
    - With this integration, developers can align their applications with evolving privacy regulations and user preferences by managing consent behavior based on user preferences regarding data collection and processing for advertising purposes.
2.  Support for Custom Cookie Expiry in TCF CMP 'Reject-All' Action:
    - The Gravito SDK introduces support for customizing cookie expiration specifically for the 'Reject-All' action within the TCF CMP (Transparency and Consent Framework Consent Management Platform).
    - Developers can now set distinct cookie expiry duration for cookies generated when users opt to 'Reject All' within the CMP UI. This feature empowers publishers to manage cookie lifespans, facilitating re-prompting of CMP UI after a lower expiry period for users who have initially rejected all consent. This is available to be set in the TCF CMP configurator on Gravito portal

![](https://www.gravito.net/wp-content/uploads/2024/01/rejectall-cookie.jpg)

---

## Release Notes ( V2 )

1.  Gravito SDK Version 2 now uses a modular approach to avoid unnecessary imports of files into your website. You can configure which modules you want to use at the time of initialization process.
2.  Currently, it supports four modules: LightCMP, TCFCMP, FirstParty, and UserId modules. The SDK is compatible with LightCMP version 4 and above and TCF CMP version 3 and above.
3.  This new version of the SDK allows for more flexibility and control over the data collection and processing on your website.
4.  We recommend updating to this latest version to take advantage of the new features and improvements. Note If you have any issues or questions, please reach out to our support team for assistance.
