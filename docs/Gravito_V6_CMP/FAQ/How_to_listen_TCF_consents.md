# How to listen to TCF Consents changes?

>Note: This Feature is only available in Gravito CMP (New) - TCF CMP Component.
Through out its lifecycle Gravito CMP (New) TCF component will emit events whenever there is a change in the consents. You can listen to these events to take actions based on the consents given by the user.

you can listen to these events as follows:

```javascript
window.addEventListener("gravito:tcfv2:client", function (e) {
  var syncEvents = [
    "layer1:opt-out:all",
    "layer2:opt-out:all",
    "layer2:opt-in:selected",
    "layer1:opt-in:all",
    "layer2:opt-in:all",
    "opt-in:previously",
    "cmploaded",
  ];
  if (syncEvents.includes(e.detail.eventType)) {
    // Consent values were updated/changed
    // "opt-in:previously" event is fired when the user has already given consent and has cookies
  }
});
```

When these events are triggered you can check the consent value using "window.gravito.cmp.tcf.currentState" object. Here is an example of how to do that:

```javascript
let currentState = window.gravito.cmp.tcf.currentState;
// current state will be an object with the consent values
// Example of currentState object:
{
    "whiteListVendors": {
        "consent": {
            "2": true,
            "6": true,
            "8": false,
            "11": true,
            "14": true,
            "278": true,
            "511": true,
            "755": true
        },
        "legitimateInterests": {
            "2": true,
            "6": true,
            "8": false,
            "11": true,
            "14": true,
            "278": true,
            "511": true,
            "755": true
        }
    },
    "purposes": {
        "consent": {},
        "legitimateInterests": {}
    },
    "specialFeatures": {
        "1": true,
        "2": true,
        "34": false
    },
    "customPurposes": {
        "consent": {
            "1": true,
            "2": true
        },
        "legitimateInterests": {
            "1": true,
            "2": false
        }
    },
    "nonTCFVendors": [
        {
            "id": 1,
            "name": "Facebook",
            "consent": true
        },
        {
            "id": 2,
            "name": "Amazon",
            "consent": false
        }
    ]
}
```

By using the conbination of the event listener and the currentState object, you can take actions based on the consents given by the user. here is an example of how to do that:

```javascript
window.addEventListener("gravito:tcfv2:client", function (e) {
  var syncEvents = [
    "layer1:opt-out:all",
    "layer2:opt-out:all",
    "layer2:opt-in:selected",
    "layer1:opt-in:all",
    "layer2:opt-in:all",
    "opt-in:previously",
    "cmploaded",
  ];
  if (syncEvents.includes(e.detail.eventType)) {
    // Consent values were updated/changed
    let currentState = window.gravito.cmp.tcf.currentState;
    // here you check the consent value for a specific vendor or purpose or non-tcf vendor
    // say you want to check the consent value for non-tcf vendor with id 1
    let nonTCFVendorConsent = currentState.nonTCFVendors.find(
      (vendor) => vendor.id === 1
    ).consent;
    if (nonTCFVendorConsent) {
      // do something if the user has given consent to this vendor
      console.log("User has given consent to non-tcf vendor with id 1");
    } else {
      // do something if the user has not given consent to this vendor
      console.log("User has not given consent to non-tcf vendor with id 1");
    }
  }
});
```
