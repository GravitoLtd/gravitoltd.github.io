# Introducing Gravito Pro CMP!

**Gravito Pro CMP** is a powerful, new tool from Gravito designed for ultimate customizability and flexibility. It provides a single, consistent setup-to-deployment process for all CMP frameworks, making consent management smoother than ever! 

## Quick Reminder:
Have you registered with Gravito yet? 👉 [Get Registered Here](https://adminv2.gravito.net).

## Gravito Pro CMP Configurator:
Use our intuitive configurator to create a consent banner tailored to your selected framework and specific needs. Customize it and make your website truly yours!

## Easy Integration:
To include Gravito Pro CMP in your website, simply copy and paste the following script into your site’s code:


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


### Resurfacing 

To open the CMP again, we have a window-scoped function which can be used:

```window.gravitoPROCMP.openPreferences() — this will open the second layer (Details tab).```

To open the first layer (Declaration tab):

```window.gravitoPROCMP.openPreferences(0) — this will open the first layer (Declaration).```