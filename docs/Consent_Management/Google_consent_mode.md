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

---

## What is Google Consent Mode?

Google Consent Mode provides a way for websites to communicate user consent choices to Google’s tags. It enables Google services to adjust data collection based on consent status, ensuring better compliance and reporting continuity. [Read more here]( https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced)

For example:

- If a user declines marketing cookies, `ad_storage` is set to `denied`, limiting tracking.
- If the user accepts analytics cookies, `analytics_storage` is set to `granted`, enabling full data collection.

---

## Requirements

To enable Google Consent Mode via Gravito CMP, you’ll need:

1. **A Gravito TCF 2.2 CMP implementation**  
   - This should be already configured and running on your site. If not, [follow the setup guide](https://docs.gravito.net/Gravito_TCF_2.2_CMP/).

2. **Gravito Google Consent Mode support enabled**  
   - Gravito handles tag-level behavior without needing manual Google Tag Manager configuration.  
   - The required consent signals (`ad_storage`, `analytics_storage`, etc.) are automatically injected based on user preferences.

3. **Google Tags already present**  
   - Either through Google Tag Manager or gtag.js, your analytics or ad tracking must be installed to benefit from Consent Mode.

---

## How Gravito Handles Google Consent Mode

Gravito CMP is designed to dynamically manage Consent Mode with minimal configuration:

- The CMP loads before any tags fire.  
- User consent decisions are collected and stored per TCF 2.2 standards.  
- Gravito automatically triggers the required `gtag('consent', 'update')` calls using the appropriate `ad_storage`, `analytics_storage`, `functionality_storage`, and `security_storage` values.  
- No need to manually configure Google Tag Manager’s Consent Initialization.

