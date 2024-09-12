#Integration

Gravito TCF CMP emits “gravito:tcfv2:client” events. Events indicate the UI actions and points when the user has given or denied the consents and rest of the tags can either trigger or not.

## Events can be listened to by the `addEventListener` method:

```javascript
document.addEventListener('gravito:tcfv2:client', function(event) {
  var  eventType = e.detail.eventType;
//   you can also get consent state of Gravito TCF CMP
  var consentState =window.gravitoCMP.currentState ;
  console.log(eventType);
  console.log(consentState);
//   depending upon event types you can perform necessary actions
});
```

## Event Types:
<!-- create a table for events type with srn no event  and descriprtion -->
| Sr.No | Event Type | Trigger |
| ------ | ---------- | ----------- |
| 1 | `cmploaded` | This event is emitted when the CMP is loaded in browser window. |
| 2 | `layer1:opt-in:all` | This event is emitted when user click on accept all  button on layer 1. |
| 3 | `layer1:opt-out:all` | This event is emitted when user click on reject all.  |button on layer 1. |
| 4 | `layer1:show-settings` | This event is emitted when user click on settings   button on layer 1. |
| 5| `layer2:opt-in:all` | This event is emitted when user click on accept all  button on layer 2.  |
| 6 | `layer2:opt-out:all` | This event is emitted when user click on reject all  button on layer 2. |
| 7 | `layer2:opt-in:selected` | This event is emitted when user click on accept selected   button on layer 2. |
| 8 | `consent-not-set` | This event is emitted when user does not have consent cookies  |
| 9 | `opt-in:previously` | This event is emitted when user has consent cookies  |
| 10 | `opt-in:previously:outdated` | This event is emitted when user has consent cookies but are outdated  |


