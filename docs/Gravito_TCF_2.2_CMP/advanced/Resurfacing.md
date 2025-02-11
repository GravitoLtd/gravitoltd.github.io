# CMP resurfacing scenarios and Core module updates

## Manual Resurfacing

Manual resurfacing of Gravito CMP can be done using the  method  *gravitoCMP.openPreferences()*. Once the CMP is loaded and the consents given,  manually resurfacing of the CMP can be under a *"Cookie Settings"* link or button for eg. 

### Sample Script

```javascript
<script>
// Function to be called when the link is clicked
function buttonClicked() {
    window.gravitoCMP.openPreferences();
}

function main() {
    // Create a new anchor element
    var link = document.createElement('a');
    // Set the link text
    link.innerHTML = 'Cookie Settings';
    // Set the link's href attribute to '#'
    link.href = '#';
    // Set the link's onclick event to call the buttonClicked function
    link.onclick = function(event) {
        event.preventDefault(); // Prevent the default link behavior
        buttonClicked();
    };
    // Apply CSS styles to center the link
    link.style.display = 'block';
    link.style.textAlign = 'center';
    link.style.margin = '0 auto';
    
    // Find the div with id 'footer-3'
    var targetDiv = document.getElementById('footer-wrapper');
    if (targetDiv) {
        // Append the link to the target div
        targetDiv.appendChild(link);
        // Apply CSS styles to center the content of the target div
        targetDiv.style.display = 'flex';
        targetDiv.style.justifyContent = 'center';
        targetDiv.style.alignItems = 'center';
    } else {
        console.error('Div with id "footer-3" not found');
    }
}

main();
</script>

```

## Automatic Resurfacing

### Overview

As you are aware, the **Transparency and Consent Framework (TCF) 2.2** was introduced about November 2023. The Interactive Advertising Bureau (IAB) limits the validity of Transparency and Consent Strings (TC Strings) to **13 months**. Many TC Strings are now nearing their expiration date. While invalid consents are unlikely if the Consent Management Platform (CMP) has resurfaced in the past, it's important to ensure ongoing compliance.

### Update

We have  rolling out an update to our CMP core module that includes an extra check for the validity of TC Strings. This fix ensures that any obsolete or invalid consents are identified, and new consents are obtained automatically. As a result, users may be prompted again (resurfacing) to provide their consent.

#### Key Details of the update

- **Rollout Date**: **28/11/2024**
- **Who is Affected**: Everyone running TCF 2.2 Version
- **Action Required**: **No action is required from the publisher's end**. If the consent strings of users are invalid, the CMP will automatically resurface to obtain re-consent.

### Example: Impact on Google Ad Manager

Outdated or invalid consent strings can lead to issues with advertising platforms like **Google Ad Manager**. Specifically, if the consent strings are expired or invalid, [Google Ad Manager may throw **3.3 errors**](https://support.google.com/admanager/answer/9999955?hl=en), indicating consent-related problems that can hinder ad serving.

#### What is a 3.3 Error?

A 3.3 error in Google Ad Manager signifies that there's an issue with the consent string provided in the ad request:

- **Missing or Invalid Consent**: The ad request lacks a valid TC String, or the string is outdated.
- **Ad Delivery Impact**: Ads may not be served properly, leading to decreased fill rates and potential revenue loss.

#### How the Update Addresses This Issue

With this CMP update:

- **Automatic Resurfacing**: The CMP will prompt users to renew their consent when the TC String becomes obsolete.
- **Error Prevention**: Ensuring valid consent strings are in place will prevent 3.3 errors in Google Ad Manager.


### Next Steps

- **Publishers**: No action is required on your part. The CMP will handle the resurfacing process automatically.
- **Users**: May experience a prompt to provide consent again, which is a standard procedure to maintain compliance.

