# Introducing Gravito CMP (New)!

**Gravito CMP (New)** is the latest version of Gravito and is a powerful, new tool from Gravito designed for ultimate customizability and flexibility. It provides a single, consistent setup-to-deployment process for all CMP frameworks, making consent management smoother than ever! 

<span style="background-color: #FFFF00">Are you looking for the documentation of Gravito TCF CMP, Intelligent CMP or the PRO CMP. The links you had earlier will work and the documentation is still valid. If you cannot find a specific documentation please email us at **support(@)gravito.net** and we will help you with the same.</span>

## Quick Reminder:
Have you registered with Gravito yet? 👉 [Get Registered Here](https://adminv2.gravito.net).

## Gravito CMP (New) Configurator:
Use our intuitive configurator to create a consent banner tailored to your selected framework and specific needs. Customize it and make your website truly yours!

## Easy Integration:
To include Gravito CMP (New) in your website, simply copy and paste the following script into your site’s code:


**Note** Replace gravitoConfig with your config object.

```javascript

// init gravito
window.gravito = {};
// add config object to gravito
window.gravito.config=gravitoConfig

    // load gravito SDK
  var gravitoSDKTag = document.createElement("script");
      gravitoSDKTag.src = "https://cdn.gravito.net/sdk/v6/latest/sdk.js";
      gravitoSDKTag.onload = function () {
        window.gravito.init();
      };
      document.head.appendChild(gravitoSDKTag);;

```


### Resurfacing 

To open the CMP again, we have a window-scoped function which can be used:

```window.gravito.cmp.openPreferences() — this will open the second layer (Details tab).```

To open the first layer (Declaration tab):

```window.gravito.cmp.openPreferences(0) — this will open the first layer (Declaration).```