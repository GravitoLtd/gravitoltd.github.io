Config example
==============

You can check out a Gravito Intelligent CMP configuration example [here](https://www.gravito.net/docs/lightcmp/lightcmp-configuration-example/)

Following variables are good within "gravitoCMPConfig" variable.

| Variable | Description | Release |
| --- | --- | --- |
| style.customCSS | Enter your custom CSS definitions, all on one line. Sounds weird but that is what IE requires. | 1.0.0 |
| core.cookieName | Cookie name the CMP settings are stored to | 1.0.0 |
| core.cookieExpiry | Cookie lifetime in days | 1.0.0 |
| core.settingBtnId | Element ID the CMP resurfacing click is bound to | 1.0.0 |
| core.version | Configuration version, increasing version causes the CMP to resurface and request consents again. | 1.0.0 |
| style.logoUrl | URL where the CMP can load the logo image, leave empty if you don't want logo on it | 1.0.0 |
| style.primaryColor | Primary color of your brand/styling | 1.0.0 |
| style.secondaryColor | Secondary color of your brand/styling | 1.0.0 |
| fonts | Define which fonts CMP should use, unicodeRange can be left out if not needed | 1.0.0 |
| core.adsConsentId | Which consent ID can be used as indication of ads consent, required by Google Consent Mode | 1.0.1 |
| core.analyticsConsentId | Which consent ID can be used as indication of analytics consent, required by Google Consent Mode | 1.0.1 |
| style.logoSvg | You can enter the logo as SVG code here | 1.0.1 |
| style.logoType | img or svg | 1.0.1 |
| style.disableConfirmationModal | true/false, controls if the removal of consent is confirmed with popup or is the function direct | 1.0.1 |
| core.useTopDomain | true/false, set to true if you want to share the collected consent between subdomains | 1.0.4 |
| core.*withBackendIntegration* | true/false, tells the CMP if there it waits for backend response | 1.0.4 |