Gravito CMP emits "gravito:cmp:light" events. Events indicate the UI actions and points when the user has given or denied the consents and rest of the tags can either trigger or not.

The event types are:

| Action | eventType | Trigger |
| --- | --- | --- |
| Custom settings confirmed by clicking "Accept selected" | layer2:opt-in:selected | User clicks on "Accept selected" on 2nd layer of CMP |
| "Accept all" clicked on layer 1 | layer1:opt-in:all | User clicks on "Accept selected" on 2nd layer of CMP |
| "Accept all" clicked on layer 2 | layer2:opt-in:all | User clicks on "Accept all" button on 1st layer |
| "Reject all" clicked on layer 2 | layer2:opt-out:all | User clicks on "Accept all" button on 2nd layer |
| CMP UI closed | cmpui:closed | User clicks on "Reject all" button on 2nd layer |
| Parent site visible without CMP UI | layer2:back-to-site | CMP UI closes because of user actions |

Example of listening events and currentState object

```
const getCookieData = (cname) => {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};
document.addEventListener("gravito:cmp:light", function (event) {
  var button_click_events = [
    "layer1:opt-in:all",
    "layer2:opt-out:all",
    "layer2:opt-in:selected",
    "layer2:opt-in:all",
  ];
  if (button_click_events.includes(event.detail.eventType)) {
 let currentState = getCookieData(
                gravitoCMPConfig.core.cookieName
              );
depending upon the currentState of consent you can perform the required actions

  }
});
```