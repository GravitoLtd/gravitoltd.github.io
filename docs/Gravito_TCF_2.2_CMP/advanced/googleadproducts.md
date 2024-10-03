Gravito CMP Integration with Google Advertising Products
========================================================

## ​ Gravito CMP Integration with Google Advertising Products: TCFv2.0 Compliance Guide

## Introduction 

This guide details the steps and best practices for integrating Gravito's Consent Management Platform (CMP) with Google Advertising Products, ensuring compliance with the IAB Transparency & Consent Framework version 2.0 (TCFv2.0). Our aim is to facilitate a smooth setup and address common integration challenges to optimize compliance and performance. 

### Ensuring CMP Configuration and Vendor Setup 

To integrate Gravito's CMP with Google Advertising Products, it is crucial to ensure that the CMP is correctly configured: 


### Vendor Configuration: 

-   Include Google (Vendor ID 755) in your list of vendors through the Gravito admin panel. 
-   Enable TCF settings for Google and verify that all necessary advertising products (Google Ad Manager, AdSense, AdMob) are correctly listed under Google's vendor configuration. 

### Consent String Verification: 

-   The Gravito CMP automatically generates and appends the TCFv2.0 compliant TC string to ad requests. 
-   Regularly verify the integrity and accuracy of the TC string using the [IaB provided decoding tool](https://iabtcf.com/#/decode) to ensure it reflects user consent preferences accurately. 

### Common Integration Issues and Their Resolutions 

#### Issue 1: TC String Not Recognized 

-   Problem: Google services may reject the TC string due to formatting errors or incomplete data. 
-   Solution: Use the IAB's decode tool at <https://iabtcf.com/#/decode>  to validate the TC string. Ensure that the string adheres to the latest specifications set by the IAB. 

​### Issue 2: Incomplete or Incorrect Vendor Configuration 

-   Problem: Google Advertising Products might not operate correctly if not configured properly in the CMP's vendor list. 
-   Solution: Double-check the vendor settings in Gravito's CMP. Make sure that Google and its services are enabled with appropriate consent features activated. 

#### Troubleshooting of Google Ad Manager (GAM) Errors 

When integrating Gravito's CMP with Google Advertising Products, understanding and resolving errors reported by Google Ad Manager is crucial for maintaining both compliance and ad performance. This section expands on how to address common issues using insights adapted from Google's own resources. 

### Common GAM Errors and Troubleshooting Steps 

#### Error Code: 1.x (Consent-related Errors) 

-   Description: This series of errors typically indicates that consent for one or more ad technology providers, including Google, has not been granted. 

#### Troubleshooting: 

-   Verify that the CMP is active and correctly integrated on all pages of your website. 
-   Check that the TC string is being passed correctly in ad requests and that it accurately reflects the consent status of all users. 
-   Use the "Test Suite" available in Google Ad Manager to simulate ad requests and identify consent-related discrepancies. 

#### Error Code: 2.x (Ad Tag Errors) 

-   Description: These errors often occur when there are issues in the ad request itself, such as incorrect tagging or problems with ad unit configurations. 

#### Troubleshooting: 

-   Ensure that all ad tags are implemented correctly and are calling the correct ad units and parameters. 
-   Review ad unit settings in Google Ad Manager to confirm they are configured to handle consented ad requests appropriately. 
-   Check for any syntax errors in the ad tags that might be preventing the ad from being served. 

#### Error Code: 413 (Payload Too Large) 

-   Description: This error happens when the URL of an ad request exceeds the maximum allowed length, often due to an overly long consent string. 
-   Troubleshooting: 

-   Minimize the number of optional purposes and features included in the consent string. Aim to simplify the data included without sacrificing compliance. 
-   Check if the consent string can be compressed or if certain parameters can be omitted without affecting compliance. 
-   Review the configuration of your ad tags to ensure they are not redundantly appending extra parameters that inflate the request size. 

#### Using Google Ad Manager's Diagnostic Tools 

To further aid in troubleshooting, Google Ad Manager offers a range of diagnostic tools that can provide deeper insights into issues: 

-   Creative Preview Tool: Use this tool to test individual creatives in a live environment to see how they behave when an ad request is made. This can help pinpoint issues specific to certain ad formats or configurations. 
-   Delivery Tools: These tools allow you to simulate ad requests in real-time to verify how ads are being served under various conditions, including different user consent states. 
-   Event-Level Troubleshooting Reports: These reports give detailed breakdowns of ad behavior at the event level, allowing you to trace the path of a request and see where failures occur. 
-   By utilizing these methods and tools, publishers can better diagnose and resolve issues related to Google Ad Manager and ensure that ads are delivered in compliance with user consent preferences set through Gravito's CMP. 
-   For additional information and more specific guidance on using Google Ad Manager's features for troubleshooting, refer to the [official Google support page](https://support.google.com/admanager/answer/9999955). This resource is invaluable for understanding the intricate details of GAM's error messages and troubleshooting processes. 

### Best Practices for Ongoing Compliance and Performance 

-   Regular CMP Updates: Keep your CMP implementation up-to-date with the latest TCF standards and Google requirements. Gravito frequently updates its CMP to align with regulatory changes and technical specifications. 
-   Enhance User Interface for Better Consent Rates: Optimize the user consent interface to make it as clear and user-friendly as possible, which can help in increasing consent rates and ensuring better compliance. 
-   Detailed Logging and Monitoring: Utilize Gravito's comprehensive logging features to keep an audit trail of consent strings and decisions, which is crucial for compliance and troubleshooting. 

### Conclusion 

By following this guide, publishers can effectively integrate Gravito's CMP with Google Advertising Products under TCFv2.0, ensuring both compliance with privacy regulations and optimal operational performance. For further assistance, our technical support team is available to help you resolve any specific issues or to provide additional guidance on best practices for using Gravito's CMP solutions.