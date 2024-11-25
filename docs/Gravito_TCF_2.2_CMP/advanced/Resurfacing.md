# CMP resurfacing scenarios and Core module updates

## Overview

As you are aware, the **Transparency and Consent Framework (TCF) 2.2** was introduced about a year ago. The Interactive Advertising Bureau (IAB) limits the validity of Transparency and Consent Strings (TC Strings) to **13 months**. Many TC Strings are now nearing their expiration date. While invalid consents are unlikely if the Consent Management Platform (CMP) has resurfaced in the past, it's important to ensure ongoing compliance.

## Upcoming Update

We are rolling out an update to our CMP core module that includes an extra check for the validity of TC Strings. This fix ensures that any obsolete or invalid consents are identified, and new consents are obtained automatically. As a result, users may be prompted again (resurfacing) to provide their consent.

### Key Details

- **Rollout Date**: **28/11/2024**
- **Who is Affected**: Everyone running TCF 2.2 Version
- **Action Required**: **No action is required from the publisher's end**. If the consent strings of users are invalid, the CMP will automatically resurface to obtain re-consent.

## Example: Impact on Google Ad Manager

Outdated or invalid consent strings can lead to issues with advertising platforms like **Google Ad Manager**. Specifically, if the consent strings are expired or invalid, [Google Ad Manager may throw **3.3 errors**](https://support.google.com/admanager/answer/9999955?hl=en), indicating consent-related problems that can hinder ad serving.

### What is a 3.3 Error?

A 3.3 error in Google Ad Manager signifies that there's an issue with the consent string provided in the ad request:

- **Missing or Invalid Consent**: The ad request lacks a valid TC String, or the string is outdated.
- **Ad Delivery Impact**: Ads may not be served properly, leading to decreased fill rates and potential revenue loss.

### How the Update Addresses This Issue

With this CMP update:

- **Automatic Resurfacing**: The CMP will prompt users to renew their consent when the TC String becomes obsolete.
- **Error Prevention**: Ensuring valid consent strings are in place will prevent 3.3 errors in Google Ad Manager.


## Next Steps

- **Publishers**: No action is required on your part. The CMP will handle the resurfacing process automatically.
- **Users**: May experience a prompt to provide consent again, which is a standard procedure to maintain compliance.

