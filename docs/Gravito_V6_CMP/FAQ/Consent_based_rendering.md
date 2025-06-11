
# Render Certain Elements Based on Consent Value Provided by Gravito CMP

Note: This guide is for the Gravito CMP (New) 's Standard component..

Gravito CMP emits events to the DOM whenever a user takes any action on the consent banner. You can use these events to render certain elements based on the consent value provided by Gravito CMP.

To listen to these events, you can use the following code snippet:

```javascript
window.addEventListener("gravito:cmp:light", function (e) {
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

When these events are triggered, you can check the consent value and update the element visibility. Here is an example of how to do that:

```javascript
function updateViewState() {
  console.log("updateViewState");
  let id = 2; // ID of the consent you want to check
  let elementID = "YOUR_ELEMENT_ID"; // ID of the map or element

  // Check the consent value for cookies
  let isCookieConsent =
    window.gravito.cmp.standard.consentHandler.getConsentValue(2);

  // Show or hide the element based on consent value
  if (!isCookieConsent) {
    document.getElementById(elementID).style.display = "none";
  } else {
    document.getElementById(elementID).style.display = "block";
  }
}
```

You can call this function in the event listener to update the view state whenever the consent value changes:

```javascript
function updateViewState() {
  console.log("updateViewState");
  let id = 2; // ID of the consent you want to check
  let elementID = "YOUR_ELEMENT_ID"; // ID of the map or element

  let isCookieConsent =
    window.gravito.cmp.standard.consentHandler.getConsentValue(2);

  if (!isCookieConsent) {
    document.getElementById(elementID).style.display = "none";
  } else {
    document.getElementById(elementID).style.display = "block";
  }
}

window.addEventListener("gravito:cmp:light", function (e) {
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
    updateViewState();
  }
});
```

In some cases, you might want to show a button or clickable item as a placeholder for hidden elements when consent is not given. On clicking the button, you can call a method to accept all consents and show the hidden elements.

The CMP provides a method to accept all consents. You can call this method on button click and then call the `updateViewState` method to show the elements:

```javascript
function buttonClick() {
  window.gravito.cmp.standard.useractionHandler.saveAll();
  updateViewState();
}
```
