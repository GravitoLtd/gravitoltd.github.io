Release Notes
=============

Release Notes 6.1.0 (01/07/2025)

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

Release Notes 6.0.0 (v600) (10/06/2025)

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
