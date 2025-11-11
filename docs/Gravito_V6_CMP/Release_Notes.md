# Release Notes

## Release Notes 6.5.0 (11/11/2025)

New Features:

- Added support for hiding the Legitimate Interest checkbox on the CMP UI.
  This change is UI-only and does not affect internal consent or TCF logic.

  To enable this feature, set:

  ```gravito.config.cmp.tcf.core.hideLegitimateInterest = true;```

Bug Fixes:

- Fixed an inconsistency in the window.gravitoData object’s data type.
  It will now always be a JSON string.

- When no consents are present gravitoData.lightCMP / gravitoData.CMP → "{}"

- When consents exist → JSON string containing the corresponding consent data.

## Release Notes 6.4.3 (05/11/2025)

Bug Fixes:

- Fixed an issue regarding 5.1 issue where TC String generated using latest IAB TCF library was not being accepted by Google Ad Manager. This issue was fixed by using an stable version of IAB TCF library to generate TC String.

## Release Notes 6.4.2 (03/11/2025)

Bug Fixes:

- Resloved the issue for mapping releated to GCMV2 consents in TCF CMP for security_storage, functionality_storage, and personalization_storage.
  Now the mapping can be done correctly as per the configuration.

## Release Notes 6.4.1 (28/10/2025)

Bug Fixes:

- Fixed an issue with OOB vendors section getting populated incorectly when adding disclosed vendors in TCF CMP.

## Release Notes 6.4.0 (14/10/2025)

New Features:

- GPP (Global Privacy Platform) Support
  Added support for GPP, enabling multi-region compliant CMP solutions. This enhancement allows the CMP to handle consent frameworks across multiple jurisdictions seamlessly, offering improved flexibility for global deployments.

- Hide Cookie Count on Second Layer
  Introduced a configuration option to hide the cookie count on the second layer of the standard CMP banner. This provides a cleaner and more customizable user experience while maintaining compliance.

Improvements:

- Enhanced Internal Performance
  Improved lazy loading mechanisms and optimized internal processes for faster initialization and smoother runtime performance.

- General Stability Enhancements
  Minor internal fixes and optimizations to improve reliability and overall system responsiveness.

## Release Notes 6.3.0 (16/09/2025)

New Features:

- Configurable GCMv2 Storage Mapping
  Added support for configuring Google Consent Mode mappings for personalization_storage, functionality_storage, and security_storage. These can now be explicitly mapped to cookie categories on the consent banner, providing more granular control and transparency.

- Detailed Vendor Listings Under Purposes
  In the TCF CMP, the vendor count shown under each purpose is now expanded into an actual list of vendors consuming that purpose. This improvement allows users to see exactly which vendors rely on each purpose, enhancing clarity and compliance.

## Release Notes 6.2.0 (05/08/2025)

New Features:

- Configurable Consentable Items in TCF Components
  You can now explicitly define which Purposes, Special Features, and Extras are shown and saved via configuration. The TCF CMP respects these configurations when constructing the final tcString, allowing for more tailored and compliant consent flows.

- Decoupled GCMv2 Consent Handling
  GCMv2 consents are now managed independently of Google’s advertising TCF vendor. This allows more flexibility in deploying GCMv2-based consent strategies even when Google TCF consent is not required or applicable.

## Release Notes 6.2.0 (05/08/2025)

Enhancements:

- The Deployment Tab has been redesigned for better usability and clarity. It now provides a more intuitive interface for deploying Gravito CMP across various platforms.

- An option to preview a published CMP configuration has been added. This allows users to see how their CMP will appear on the live site before finalizing deployment.

- In TCF section, the configuration for "Features", "Special Features", and "Special Purposes" is now available to allow for more granular control over consent settings.

## Release Notes 6.1.0 (01/07/2025)

New Features:

- WebView Support for TCF CMP  
  Gravito CMP (New) now supports usage in WebView-based mobile applications for the TCF CMP component. This enables seamless integration of the consent flow inside hybrid or native mobile apps using platforms like React Native, Flutter, Android, and iOS.

- UX Improvements in Defaults Tab

  - Fixed scrolling behavior on the second layer of the CMP interface for smoother interaction.
  - Minor refinements in layout and interaction for improved usability.

- Smart Link Handling for Privacy Policy  
  Added feature to suppress CMP UI display when navigating to links matching the privacy policy URL. Improves user experience on privacy-related pages.

- DOM Layering Enhancements  
  CSS adjustments ensure the CMP consistently renders as the top-most DOM element, preventing visual obstructions.

## Release Notes 6.0.0 (v600) (10/06/2025)

New Features:

- Gravito CMP (New) – A New Flavor of Gravito CMP  
  This is the initial release of Gravito CMP (New), a newly developed variant of our CMP platform. It is built using Preact, a lightweight alternative to React, offering improved performance and reduced bundle size.

- Support for Standard and TCF CMP  
  Gravito CMP (New) supports both Standard CMP and TCF CMP components, allowing you to choose the best fit for your compliance needs.

  - Standard CMP: Gravito’s own non-TCF CMP, suitable for any website.
  - TCF CMP: A TCF-certified CMP designed for GDPR compliance, suitable for any website.

- Lazy Loading for Better Performance  
  Gravito CMP (New) includes lazy loading, reducing the initial load size of CMP bundles. This leads to faster page loads and a smoother user experience.

- Enhanced Tab-Based Layout  
  The new tab-based layout improves usability and consent navigation. Users can now switch easily between different layers and settings, resulting in a more intuitive and efficient consent flow.

- Custom Tabs  
  Now you can create custom tabs in the CMP interface, allowing you to display your own content or additional information relevant to your users.
