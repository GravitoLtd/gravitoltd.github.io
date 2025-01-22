Getting Started
===============

Gravito has a user module in prebid js, customers now can use Gravito’s first party service and prebid js usermodule to use a persistent first party id in prebid’s bit stream.

To Add prebid user ID module add following code to your site.

Note: If you are using a wrapper like *Livewrapped* to initiate Prebid Id modules, you dont need to initiate Gravito's UserId module as part of the SDK. 

```javascript

window.gravitoCMPConfig = {    
    settings: {      
    sdkVersion: 2,      
userIdModule: true,      
prebidUrl: "your prebid.js build URL", // url from which prebid build should be loaded. default will point to gravito's build    
},  
};  
var gravitoSDKTag = document.createElement("script");  
gravitoSDKTag.src = "https://cdn.gravito.net/sdkv2/latest/sdk.js";  
gravitoSDKTag.onload = function () {    
    // init gravito with two comma separated parameters, firstParty and prebid    
// this will make sure that the first party service drops a persistent id which can be utlized in prebids bit stream.    
window.gravito.init("firstParty", "prebid");  
};  document.body.appendChild(gravitoSDKTag);   

```