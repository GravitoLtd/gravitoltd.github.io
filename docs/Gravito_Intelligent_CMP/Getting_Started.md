Getting Started
===============

Gravito Intelligent CMP is a consent management solution that helps to collect consent for data collection, analytics, targeting, personalization and whatever your business needs to fulfil legal or regulatory terms.

💡 NoteHave you registered with Gravito yet? Please find here on how to get [registered with Gravito](https://www.gravito.net/docs/getting-started/register/)

We have the Gravito Intelligent CMP configurator using which you can create the consent banner based on your needs

Note: If you are advertiser or publisher, you might benefit from [GravitoTCF 2.2 compliant CMP](https://www.gravito.net/docs/tcf-cmp/) but not every use case is the same so choice is yours.

To include light CMP in copy and paste following script in your website.

**Note** Replace gravitoCMPConifg with your config object.

`   window.gravitoCMPConfig = gravitoCMPConfig; // your config object  var gravitoSDKTag = document.createElement("script");  gravitoSDKTag.src = "https://cdn.gravito.net/sdkv2/latest/sdk.js";     gravitoSDKTag.onload = function () {       window.gravito.init("lightCMP");     };  document.body.appendChild(gravitoSDKTag);   `