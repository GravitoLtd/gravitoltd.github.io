# Release Notes

Gravito Intelligent CMP release notes.

## Version 4.0.7

1.  **Multiple Language Support:**

    - Light CMP now supports multiple languages within the user interface, offering a more inclusive experience for users worldwide. Users can access a language selection dropdown within the CMP UI, allowing them to translate the interface into their preferred language.
    - This feature empowers publishers to provide a localized experience, catering to diverse language preferences and improving accessibility for users globally.

2.  **Google Consent Mode V2 Integration:**

    - Light CMP now integrates Google Consent Mode V2 functionalities, enabling publishers to leverage advanced consent management features offered by Google. This integration enhances the CMP’s capabilities in managing user consent preferences for data collection and processing, especially for advertising purposes.
    - With Google Consent Mode V2 support, publishers can align their consent mechanisms with evolving privacy regulations and user expectations, ensuring more nuanced control over data usage. More about the Google Consent Mode V2 is [available here](https://www.gravito.net/docs/google-consent-mode-v2/)

## Version 4.0.5

Release date: 07/11/2023

**New features to our admin portal**

- Gravito CMP now, supports saving configuration in draft status. Customers can revisit their draft configurations and can make changes to it till they decide to publish it.
- Gravito CMP, provides following deployment options now to make it easy to integrate with your website, customers will get to choose their preferred deployment option and would be guided with the deployment steps.

  - GTM Template
  - WordPress plugin
  - Standard Tag management based deployment

## Version 4.0.0

New major release

1.  SDK v2 compatibility.
2.  Feature to capture CMP events such as Accept-All, and Reject-All, and have a report generated on the Admin portal.
3.  Prebid.js user Id support with Light CMP.

## Version 3.0.0

New major release, introducing headless mode and other major improvements. As this version introduces new UI elements and third layer, release 1 and 2 deployments will not automatically upgrade, the jump needs to be performed manually (by loading “\_latest_3” scripts). As the logic for look & feel customization changes entirely, some configuration changes will need to be made to migrate from R2 to R3, please contact gravito support for assistance.

## Version 2.0.5

First layer supports now “Reject all” button, enable it by defining third button label for first layer:

`  actions: ["Asetukset","Hyväksy kaikki","Estä kaikki"]  `

## Version 2.0.4

Max-width of the screen is changed to 100px with small screens.

## Version 2.0.3

CMP cookie content encoded (allows special characters in names of consent groups).

## Version 2.0.2

Minor bug and CSS fixes.

## Version 2.0.1

Support for Gravito SDK (enables e.g. integration with Gravito CDP), naming changes, minor enhancements.

## Version 1.0.4

Minor bug fixes, cookie setting to support subdomains added. Add following to configuration of CMP:

`  useTopDomain:true  `

## Version 1.0.3

CSS fixes, support for RTL.

## Version 1.0.2

CSS fixes, minor bug fixes

## Version 1.0.1

Added support for Google Consent Mode (beta), see separate page for more details.

## Version 1.0.0

- Fully responsive, mobile optimized UI
- Presentation, CMP core logic and configuration are separated to allow maximum customization flexibility and deployment strategies
- Event-driven, user activity (consents, rejections etc.) emits events that can trigger ad/martech tags, data to analytics etc.
- Localization through configuration file
- Standard, tested deployment with tag management systems like Google Tag Manager, Tealium iQ and Ensighten
