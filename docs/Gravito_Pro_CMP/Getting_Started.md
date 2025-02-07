# Getting Started

Gravito Pro CMP is a new tool from Gravito. It is a CMP that is designed to be more customizable and flexible and provides single consistent setup to deployment process for all the CMP frameworks.

💡 Note: Have you registered with Gravito yet? Please find here on how to get [registered with Gravito](../Getting_started/Register.md)

We have the Gravito Pro CMP configurator using which you can create the consent banner of selected framework based on your needs

To include Pro CMP in your website copy and paste following script in your website.

**Note** Replace gravitoPROCMPConfig with your config object.

```javascript
window.gravitoPROCMPConfig = gravitoPROCMPConfig;

var gravitoSDKTag = document.createElement("script");
gravitoSDKTag.src = "https://cdn.gravito.net/prosdkbuilds/latest/sdk.js";
gravitoSDKTag.onload = function () {
  window.gravito.init("proCMP", "firstParty");
};
document.body.appendChild(gravitoSDKTag);
```
