# Consent Management: Microsoft Consent Mode

_Last updated: 06/05/2025_  
_Announced: 05/06/2025_

---

## What is Microsoft UET Mode?

UET Consent Mode lets you adjust UET cookie access based on the consent status of your users. This enhances the privacy capabilities of UET and gives you control over whether first and third-party cookies are stored.

For the purposes of UET Consent Mode, first-party cookies are those created by the advertiser domain (your website), and third-party cookies are created by Microsoft Advertising (Bing.com).

## How does UET Consent Mode work?

Consent Mode is set via a property in UET called `ad_storage`. The possible values for `ad_storage` are:

| Value for `ad_storage` | Description                                                                                                                                                                            |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `granted`              | First and third-party cookies may be read and written for UET. If no default is set, UET uses `granted` by default.                                                                    |
| `denied`               | First-party cookies are not read nor written for UET. Third-party cookies are not written. Third-party cookies are read-only for fraud and spam purposes—not for advertising purposes. |

## Additional Resources

Based on the CMP you are using, please refer to below setup documentation for configuring Microsoft Consent Mode.

- [Gravito Intelligent CMP](../Gravito_Intelligent_CMP/advanced/Microsoft_consent_mode.md)
- [Gravito TCF CMP](../Gravito_TCF_2.2_CMP/advanced/Microsoft_consent_mode.md)
- [Official Microsoft Documentation](https://help.ads.microsoft.com/#apex/ads/en/56960/1-500)
