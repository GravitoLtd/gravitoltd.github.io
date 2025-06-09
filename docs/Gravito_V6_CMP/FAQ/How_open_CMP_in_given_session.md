# How to Open Gravito CMP (New) in a Given Session?

To open Gravito CMP (New) in a given session, you can use the `window.gravito.cmp.openPreferences()` method. This method will open the CMP in the current session, allowing users to manage their consent preferences.

You can call this method in your JavaScript code whenever you want to open the CMP. For example, you can attach it to a button click event or any other event that should trigger the CMP.

By default, this method opens the **details view (layer 2)** of the Gravito CMP. You can also specify the layer you want to open by passing the tab index as an argument. For example, to open layer 1, use the following code:

```javascript
gravito.cmp.openPreferences(0);