# Amazon Consent Signal
In addition to supporting the Interactive Advertising Bureau’s (IAB) Transparency & Consent Framework (TCF) signal, Amazon Ads has introduced Amazon Consent Signal (ACS) which enables advertisers and other third parties to transmit their end users' privacy choices to Amazon Ads.

Gravito CMP has built-in support for ACS. You must set up Gravito CMP with ACS once you start collecting or passing user data to Amazon Ads services (e.g., Amazon Advertising). 

## How does Amazon Consent Signal work

ACS uses two parameters to communicate user consent:

- amzn_user_data: Indicates whether the user has consented to Amazon processing personal data (e.g. an advertising identifier) for advertising purposes. Acceptable values are GRANTED or DENIED.
 - amzn_ad_storage: Indicates whether the user has given Amazon consent to read or write advertising cookies or similar technologies from the user's device. Acceptable values are GRANTED or DENIED.


The permissions `amzn_user_data` and `amzn_ad_storage` are both mapped to the Marketing category.

The values amzn_user_data and amzn_ad_storage are set to GRANTED only when the user has given consent for the **Marketing* category. This writes a cookie named `amzn_consent`.

## Technical Specs

ACS will be set when cookie consent is master (no TCF string available).

```javascript
var acsPayload = {
  geo: { countryCode: gravitoCMP.getVisitorCountry() },
  amazonConsentFormat: {
    amznAdStorage: cats.marketing ? 'GRANTED' : 'DENIED',
    amznUserData:  cats.marketing ? 'GRANTED' : 'DENIED'
  },
  timestamp: new Date().toISOString(),
  version: '1'
};

document.cookie = 'amzn_consent=' + JSON.stringify(acsPayload)
  + '; path=/; max-age=31536000; SameSite=Lax';
```