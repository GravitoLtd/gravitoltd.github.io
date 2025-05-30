# Render Certain Elements Based on Consent value provided by Gravito CMP

Gravito CMP emits events to DOM whenever user takes any action on the consent banner. You can use these events to render certain elements based on the consent value provided by Gravito CMP.

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
        //  consent values was updated/changed
        // opt-in:previously event is fired when user has already given consent and has cookies
  
        }
      });

```

When the events are triggered you can check the consent value and update the elements vissibilty.here is an example of how to do that:

```javascript
function updateViewState() {
        console.log("updateViewState");
        let id = 2; // id of the consent you want to check
        let elementID = "YOUR_ELEMENT_ID"; // id of the map
        // to check for consent value of cookie
        let isCookieConsent =
          window.gravitoLightCMP.consentHandler.getConsentValue(2);
        //  on basis of the consent value you can hide/show map
        if (!isCookieConsent) {
          document.getElementById(elementID).style.display = "none";
        } else {
          document.getElementById(elementID).style.display = "block";
        }
      }
```

You can call this function in the event listener to update the view state whenever the consent value changes.

```javascript
function updateViewState() {
        console.log("updateViewState");
        let id = 2; // id of the consent you want to check
        let elementID = "YOUR_ELEMENT_ID"; // id of the map
        // to check for consent value of cookie
        let isCookieConsent =
          window.gravitoLightCMP.consentHandler.getConsentValue(2);
        //  on basis of the consent value you can hide/show map
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

In some cases you might want to show a button or clickable items as the placeholder for hidden elements, if there is no consent. On clicking the button you can call a accept all method to accept all the consents and show the elements.

CMP provides a method to accept all the consents.You can call this method on the button click to accept all the consents and call the updateViewState method to show the elements.


```javascript
function buttonClick() {
      window.gravitoLightCMP.useractionHandler.saveAll()
        updateViewState();
      }
```