# Consent Management: Google Consent Mode

*Last updated: January 15, 2024*  
*Announced: January 10, 2024*

---

## Overview

Google Consent Mode allows you to adjust how your Google tags behave based on the consent status of your end users. When integrated with **Gravito**’s TCF 2.2 CMP, it helps ensure compliance by dynamically controlling tag behavior across Google products such as Google Analytics, Google Ads, and more — without needing manual tag setup in Google Tag Manager (GTM). It is important to note that Google consent mode is not meant to be a solution to any regulatory requirement.

This document explains:

- What Google Consent Mode is  
- The requirements to use it with Gravito  
- How Gravito handles tag behavior and consent signals  
- How to test if your setup is working  
- Getting Support

---

## What is Google Consent Mode?

Google Consent Mode provides a way for websites to communicate user consent choices to Google’s tags. It enables Google services to adjust data collection based on consent status, ensuring better compliance and reporting continuity. [Read more here]( https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced)

For example:

- If a user declines marketing cookies, `ad_storage` is set to `denied`, limiting tracking.
- If the user accepts analytics cookies, `analytics_storage` is set to `granted`, enabling full data collection.

---

## Requirements

To enable Google Consent Mode via Gravito CMP, you’ll need:

1. **A Gravito TCF 2.2 CMP/ Intelligent CMP implementation**
      - This should be already configured and running on your site. If not, 
      - [TCF 2.2 setup and implementation guide](../Gravito_TCF_2.2_CMP/advanced/googleconsentmode.md).
      - [Intelligent CMP setup and implementation guide](../Gravito_Intelligent_CMP/advanced/Google_consent_mode_v2.md).

2. **Gravito Google Consent Mode support enabled**
      - Gravito handles tag-level behavior without needing manual Google Tag Manager configuration.  
      - The required consent signals (`ad_storage`, `analytics_storage`, etc.) are automatically injected based on user preferences.

---

## How Gravito Handles Google Consent Mode

Gravito CMP is designed to dynamically manage Consent Mode with minimal configuration. It depends basically on how you implement the CMP either with the deployment script or using Gravito's GTM template available in the GTM Gallery Here


## How to test if your setup is working

Please get in touch with Gravito support to get access to tooling which includes chrome extension's, sample script etc to validate that GCM is correctly setup on your site. 
Here is an excmple of the Gravito's GCM validator plugin in action. Basically, you can check from the data layer how the consents are populated, like below. This example screenshot shows that the consent were *"denied"* which later was updated to *"granted"* when user gave consent

 ![Screenshot of Gravito's GCM Validator](./img/gcm_validator.jpg "Screenshot of Gravito's GCM Validator")


## Google Consent Mode support

All support issues related to implementation and working of **Google Consent Mode**, must be raised to Gravito's GCM support box : [gcm.support(@)gravito.net](mailto: gcm.support@gravito.net)