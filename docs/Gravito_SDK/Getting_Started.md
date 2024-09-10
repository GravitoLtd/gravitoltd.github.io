Getting Started
===============

The Gravito SDK ( Latest Version 2) is a tool that allows developers to communicate with the Gravito APIs and deploy both light CMP and TCF CMP. It includes functions for interacting with the Gravito first party backend solution and is used by all major services within the Gravito platform.

How to include Gravito SDK to your project?

```
<script>
window.gravitoCMPConfig = {
  settings: {
    sdkVersion: 2,
  },
};
var gravitoSDKTag = document.createElement("script");
gravitoSDKTag.src = "https://cdn.gravito.net/sdkv2/latest/sdk.js";
gravitoSDKTag.onload = function () {
  console.log("gravito SDK loaded");
};
document.body.appendChild(gravitoSDKTag);
</script>
```