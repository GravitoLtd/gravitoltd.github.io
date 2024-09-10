Version 2 (Latest)
==================

Using SDK V2
============

To use Gravito's SDK you should have the Gravito config added to your site. Make sure you also have settings section added inside your config. You can get the config from the [Gravito Admin Portal](https://adminv2.gravito.net/)

👉Looking for an older version of Gravito SDK? You can find the older versions here

[Gravito SDK V1](./advanced/Gravito_sdk_v1.md)

How it works?
-------------

### Configuration

SDK Version can be configured using gravitoCMPConfig object.

```
window.gravitoCMPConfig = {
  settings: {
    sdkVersion: 2,
  },
};

```

### Deployment

To Include Gravito SDK Version 2 add following JavaScript to your site. Make sure config loading logic is added above this script.

```
var gravitoSDKTag = document.createElement("script");
gravitoSDKTag.src = "https://cdn.gravito.net/sdkv2/latest/sdk.js";
gravitoSDKTag.onload = function () {
  console.log("gravito SDK loaded");
};
document.body.appendChild(gravitoSDKTag);

```

### Sample Scripts

Using SDK to deploy First-Party. To include first-party helper functions of SDK V2 add following JavaScript to your site. Make sure config loading logic is added above this script.

```
var gravitoSDKTag = document.createElement("script");
gravitoSDKTag.src = "https://cdn.gravito.net/sdkv2/latest/sdk.js";
gravitoSDKTag.onload = function () {
  window.gravito.init("firstParty");
};
document.body.appendChild(gravitoSDKTag);

```

To check if the first party has been added to your site or not, please use following script and test it with browser console window. It should return your gravito registered first-party URL

```
gravito.firstParty.getDefaultURL();
```

Once First-party is added to your website you can use the first-party function to interact with gravito backend.

##### Get Your profile.

To get your profile you can call following function

```
function customCb(data) {
  console.log("data", data);
}
gravito.firstParty.getProfile(customCb);

```

##### Have your own First Party Id?

Using gravito first-party you can use your own ID and give it more persistence using Gravito First Party API

```
function customCb(data) {
  console.log("data", data);
}
var gmId = "your own id";
gravito.firstParty.postEvents(
  {
    "gmId-overide": "gmid changed to " + gmId,
  },
  customCb,
  gmId
);

```

##### Send a Key value pair of events.

You can attach key-value pairs to the profile for eg: pageViews : n

```
function customCb(data) {
  console.log("data", data);
}
let key = "pageViews";
let value = 2;
let model = {};
model[key] = value;
gravito.firstParty.postEvents(model, customCb);

```

##### Send a Keys to the Profile.

Attach keys to the profile to get a complete picture of the profile. eg: GA ID.

```
function customCb(data) {
  console.log("data", data);
}
let keysInput = [
  {
    i: "56396541p-0jud-7qawe-lk45ue973723",
    K: "GAID",
    v: "56396541p-0jud-7qawe-lk45ue973723",
  },
];

gravito.firstParty.postKeys(keysInput, customCb);

```

##### Send a Consent to the Profile.

Attach consents to the profile to access it any time.

```
function customCb(data) {
  console.log("data", data);
}
let consentInputs = [
  { i: "t", c: "consent1", s: false },
  { i: "m", c: "consent2", s: false },
];

gravito.firstParty.postConsents(consentInputs, customCb);

```

##### Bridge in Match On id.

Connect with matchOnId ( eg: a deterministic Id) to connect X-domain and X-device.

```
function customCb(data) {
  console.log("data", data);
}
let matchOnId = "your_match_onId";

gravito.firstParty.attachMatchOnId(matchOnId, customCb);

```

##### Reset Profile.

To reset your firstParty profile use following snippet.

```
function customCb(data) {
  console.log("data", data);
}
let matchOnId = "reset";

gravito.firstParty.attachMatchOnId(matchOnId, customCb);

```

##### Delete Profile.

To delete your firstParty profile use following snippet

```
function customCb(data) {
  console.log("data", data);
}
let matchOnId = "delete";

gravito.firstParty.attachMatchOnId(matchOnId, customCb);

```

#### Using SDK to deploy Light CMP.

To know how to deploy light CMP with SDK v2 please click here(Link to Deployment section of Light CMP).

#### Using SDK to deploy TCF CMP.

To know how to deploy TCF CMP with SDK v2 please click here(Link to Deployment section of TCF CMP ).

#### Using SDK to Include Gravito's prebid js usermodule.

To know how to include Gravito's prebid js usermodule with SDK v2 please click here(Link to Deployment section of prebid js usermodule).