# Gravito CMP V6 Configuration Table

| Setting Name | Setting Value | Version Supported | Description |
| --- | --- | --- | --- |
| config.cmp.settings.useTopDomain | false | v6 | Writing cookie in top domain helps you to share cookie across your subdomains. |
| config.cmp.settings.catchCMPEvents | true | v6 | Check this box if you want to get real-time data of CMP stats on the Gravito admin dashboard. |
| config.cmp.settings.syncAfter | 1800 | v6 | This is the delay in seconds till which backend sync will not occur even after occurrence of sync events. |
| config.cmp.settings.sdkVersion | 6 | v6 | Version of the SDK being used. |
| config.cmp.settings.version | latest | v6 | Version of the CMP being used. |
| config.cmp.tcf.core.languageCode | en | v6 | This will be the default language of your CMP. |
| config.cmp.tcf.core.publisherCountryCode | FI | v6 | This is the country code of the publisher. |
| config.cmp.tcf.core.purposeOneTreatment | false | v6 | There is no special Purpose 1 status. <br>Purpose 1 was disclosed normally (consent) as expected by Policy. true Purpose 1 not disclosed at all. CMPs use <br> PublisherCC to indicate the publisher’s country of establishment <br>to help Vendors determine whether the vendor requires Purpose 1 consent. <br> In global scope TC strings, this field must always have a value of false. <br>When a CMP encounters a global scope string with purposeOneTreatment=true then that string <br>should be considered invalid and the CMP must re-establish transparency and consent. |
| config.cmp.tcf.core.hideLegitimateInterest | false | v6 | When selected, the legitimate-interest toggles are hidden. The end-user can still reject legitimate interests. |
| config.cmp.tcf.core.legitimateInterestDefaultBehavaior | true | v6 | If this is set to false then legitimate intereset fields will be set to false by default, When UI is rendered for the first time. |
| config.cmp.tcf.core.purposes | ```[{"type":"purposes","id":1},{"type":"purposes","id":10},{"type":"stacks","id":26}]``` | v6 | This will be the purposes/stacks for your CMP. |
| config.cmp.tcf.core.specialPurposes | [1,2] | v6 | This will be the special purposes for your CMP. |
| config.cmp.tcf.core.necessaryLegitimatePurposes | [] | v6 | This will be the necessary legitimate purposes for your CMP. |
| config.cmp.tcf.core.vendors | [2,6,8,511,11,14,278,755] | v6 | This will be the vendors for your CMP. |
| config.cmp.tcf.core.necessaryVendors | [] | v6 | These vendors will be given legitimate interest consent even if user clicks on Reject All. |
| config.cmp.tcf.core.features | [1,2,3] | v6 | This will be the features for your CMP. |
| config.cmp.tcf.core.specialFeatures | [1,2] | v6 | This will be the special features for your CMP. |
| config.cmp.tcf.core.useACM | false | v6 | Check this box If you want to use Additional Consent Mode. |
| config.cmp.tcf.core.googleVendors | [] | v6 | This will be the Google vendors for your CMP. |
| config.cmp.tcf.core.useGCM | true | v6 | Using this section you can configure the Google Consent Mode V2. Please select mapping for google required consents. |
| config.cmp.tcf.core.useAdvanceGCM | true | v6 | By checking/unchecking this checkbox you can switch between GCM advance mode and GCM basic mode. |
| config.cmp.tcf.core.adsConsentId | [1] | v6 | This will be the ads consent IDs for your CMP. |
| config.cmp.tcf.core.adsUserDataConsentId | [1,7] | v6 | This will be the User Data consent IDs for your CMP. |
| config.cmp.tcf.core.adsPersonalizationConsentId | [3,4] | v6 | This will be the Personalization consent IDs for your CMP. |
| config.cmp.tcf.core.analyticsConsentId | [7,9,10] | v6 | This will be the Analytics consent IDs for your CMP. |
| config.cmp.tcf.core.functionalityStorageConsentId | [10] | v6 | This will be the Functionality Storage consent IDs for your CMP. |
| config.cmp.tcf.core.functionalityStorageId | false | v6 | Check this box if you want to set functionality_storage default signal to granted. |
| config.cmp.tcf.core.personalizationStorageConsentId | [1,4] | v6 | This will be the Personalization Storage consent IDs for your CMP. |
| config.cmp.tcf.core.personalizationStorageId | false | v6 | Check this box if you want to set personalization_storage default signal to granted. |
| config.cmp.tcf.core.securityStorageConsentId | [9] | v6 | This will be the Security Storage consent IDs for your CMP. |
| config.cmp.tcf.core.securityStorageId | true | v6 | Check this box if you want to set security_storage default signal to granted. |
| config.cmp.tcf.core.useUET | true | v6 | Check this box If you want to enable Universal Event Tracking for Microsoft. |
| config.cmp.tcf.core.adsConsentId | [1] | v6 | This will be the ads consent IDs for your CMP. |
| config.cmp.tcf.core.cookieName | TcString | v6 | Name of cookie in which you want to store your TC string |
| config.cmp.tcf.core.cookieExpiry | 365 | v6 | This will be the expiry of cookie(in days) in which you need to store the consents |
| config.cmp.tcf.core.rejectAllCookieExpiry | 365 | v6 | This will be the expiry of cookie(in days) in case user rejects all the consents |
| config.cmp.tcf.core.version | 1 | v6 | If the config version is changed then CMP will re-surface. |
| config.cmp.tcf.core.googleTcfId | 755 | v6 | This will be the Google TCF ID for your CMP. |
| config.cmp.tcf.style.hideContentOnFirstLayer | true | v6 | When enabled, the content like purposes, special purposes & special features <br> will be hidden on the first layer of the CMP. Users will need to navigate to the second layer to view these details. |
| config.cmp.tcf.style.consentInputType | checkbox | v6 | This will be the consent input control for your CMP. |
| config.cmp.tcf.style.customCSS | ```/* Add CSS Here... */``` | v6 | This will be the custom CSS for your CMP. |
| config.cmp.styles.logoUrl | https://cdn.gravito.net/logos/Website_DEMO_logo.png | v6 | Url of logo to be used in CMP. |
| config.cmp.styles.logoAltText | website logo | v6 | This text will be shown when logo is not visible. |
| config.cmp.styles.allowBackgroundScroll | false | v6 | When enabled, users can scroll the background content while the CMP banner<br> is displayed. When disabled, the background content will be fixed, preventing any scrolling until the <br> CMP banner is dismissed. |
| config.cmp.styles.isLayeredLayout | false | v6 | This is needed if the tabbed menu is not in use. When selected, the end user can open <br> the settings page from the button, close the page, and return to the first page of the CMP banner. |
| config.cmp.styles.primaryColor | #f07e26 | v6 | Primary color to be used in CMP. |
| config.cmp.styles.secondaryColor | #a3a3a3 | v6 | Secondary color to be used in CMP. |
| config.cmp.styles.headerColor | #f07e26 | v6 | Header color to be used in CMP. |
| config.cmp.styles.footerColor | #f07e26 | v6 | Footer color to be used in CMP. |
| config.cmp.styles.fonts | ```[{"url":"https://cdn.gravito.net/fonts/lato-v22-latin-700.woff2","unicodeRange":"U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;"}]```| v6 | Font to be used for text in CMP. |