# GTM Custom Trigger Setup Based on Gravito GCM Consents

## Overview

Gravito CMP pushes consent updates using a custom event named
`gravitoGCMConsents`.
Each consent value is available under `consent.*` in the dataLayer.

This guide explains how to: 

- Create Data Layer Variables (DLVs) 
- Create Custom Event triggers 
- Map consent categories to GCM signals 
- Fire tags based on consent

------------------------------------------------------------------------

## Mapping: Consent Category to GCM Signals



| Cookie Consent Category | GCM v2 Values                                      |
|------------------------|----------------------------------------------------|
| Necessary              | security_storage                                   |
| Analytics              | analytics_storage                                  |
| Functional             | functionality_storage, personalization_storage      |
| Marketing              | ad_storage, ad_user_data, ad_personalization       |


## Step 1: Create Data Layer Variables

Go to GTM UI:

1.  Navigate to Variables
2.  Click New under User-Defined Variables
3.  Click Variable Configuration
4.  Select Data Layer Variable

Create variables for the following:

-   consent.security_storage
-   consent.analytics_storage
-   consent.functionality_storage
-   consent.personalization_storage
-   consent.ad_storage
-   consent.ad_user_data
-   consent.ad_personalization

### Example:<br>
Name: DLV - consent.analytics_storage<br>
Data Layer Variable Name: consent.analytics_storage<br>
Version: Version 2<br>

------------------------------------------------------------------------

## Step 2: Create Custom Event Trigger

1.  Go to Triggers
2.  Click New
3.  Select Custom Event

Configuration:<br>

Name: CE - Gravito GCM Consents<br>
Event Name: gravitoGCMConsents<br>
Trigger fires on: All Custom Events<br>

------------------------------------------------------------------------

## Step 3: Create Category-Based Triggers

### Analytics Trigger

1.  Go to Triggers → New
2.  Select Custom Event

Name: CE - Analytics Granted<br>
Event: gravitoGCMConsents

Condition: DLV - consent.analytics_storage equals granted

------------------------------------------------------------------------

### Marketing Trigger

Name: CE - Marketing Granted<br>
Event: gravitoGCMConsents

Condition (strict): DLV - consent.ad_storage equals granted<br>
AND<br>
DLV - consent.ad_user_data equals granted<br>
AND<br>
DLV - consent.ad_personalization equals granted<br>

------------------------------------------------------------------------

### Functional Trigger

Name: CE - Functional Granted<br>
Event: gravitoGCMConsents

Condition: DLV - consent.functionality_storage equals granted

OR

DLV - consent.personalization_storage equals granted

------------------------------------------------------------------------

### Necessary Trigger

Name: CE - Necessary Granted<br>
Event: gravitoGCMConsents

Condition: DLV - consent.security_storage equals granted

------------------------------------------------------------------------

## Step 4: Attach Triggers to Tags

1.  Go to Tags
2.  Select a tag
3.  Click Triggering
4.  Add the relevant trigger

Example:

-   Analytics Script → CE - Analytics Granted
-   Marketing Pixel → CE - Marketing Granted
-   Functional Script → CE - Functional Granted

------------------------------------------------------------------------

## Step 5: Testing

1.  Click Preview in GTM
2.  Open your website
3.  Trigger consent changes

Verify:

-   Event gravitoGCMConsents is fired
-   Variables show correct values
-   Tags fire only when consent is granted

------------------------------------------------------------------------

## Final Flow

Gravito CMP → dataLayer (consent values)\
→ GTM Variables<br>
→ Custom Event Trigger<br>
→ Conditional Trigger<br>
→ Tag Fires


## Example 

The following script delays the initialization of **Google Analytics 4 (GA4)** until the default Google Consent Mode (GCM) consent is received.
The Gravito CMP dispatches an event when the default consent values are added to the dataLayer. 
<br>
This script listens for that event and initializes GA4 only after the consent information becomes available.
<br>
This script must be placed inside the <head> section of the document, and the original GA4 initialization script should be removed to prevent GA4 from loading before the default consent is applied.

```js

   <script>
      document.addEventListener("gcmConsentUpdated", (event) => {

        let ga4Script = document.createElement("script");
        ga4Script.src =
          "https://www.googletagmanager.com/gtag/js?id=<Unique_ID>";
        ga4Script.async = true;
        document.head.appendChild(ga4Script);
        if (!gtag) {
          window.dataLayer = window.dataLayer || [];
          function gtag() {
            dataLayer.push(arguments);
          }
        }
        gtag("js", new Date());

        gtag("config", "<Unique_ID>", {
          send_page_view: false,
        });
      });
    </script>
    
```