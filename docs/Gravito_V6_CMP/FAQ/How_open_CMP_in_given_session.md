# How to open Gravito CMP (New) in given sesssion?

To open Gravito CMP (New) in a given session, you can use the `window.gravito.cmp.openPreferences()` method. This method will open the CMP in the current session, allowing users to manage their consent preferences.
You can call this method in your JavaScript code when you want to open the CMP. For example, you can attach it to a button click event or any other event that you want to use to trigger the CMP.

This method will by default open the details/layer 2 of PRO-CMP button you can also specific the layer you want to open by passing the tab Index as an argument. For example, to open layer 1, you can use the following code:
```javascript
gravito.cmp.openPreferences(0);
```