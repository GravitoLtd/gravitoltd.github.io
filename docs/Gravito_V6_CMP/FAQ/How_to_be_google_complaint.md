# How to Provide Google with the Required Legitimate Interests Even on Reject All Action (Only for TCF Components)?

In Gravito CMP (New), there is a provision to provide Google with the required legitimate interests even on the Reject All action. This is done by configuring the `necessaryLegitimatePurposes` field in the `window.gravito.config.cmp.tcf.core` object.  
Google requires legitimate interests for purposes `[2, 7, 9, 10]` to be provided even on a Reject All action.

You can modify this field in either of the following ways:

1.  **Using Configurator**:  
    -   Open the CMP configurator in the Admin Portal.  
    -   Select the config from the list and click on the **Copy Configuration** icon/button.  
    -   This will create a new CMP config with the same settings as the original one. Now enter the name on the Basic Settings page and click the **Get Started** button.  
    -   In the left-side menu, select the **TCF CMP** component.  
    -   Now click on **TCF Settings**.  
    -   In the TCF settings, you will see the `necessaryLegitimatePurposes` field. Change it to use purposes `2, 7, 9, 10`, then click the **Save Progress** button, and finally click the **Publish** button to publish the new config.  
    -   Now, when you use this updated config on your website, it will provide Google with the required legitimate interests even on a Reject All action.

2.  **Without Configurator**:  
    -  Update the `necessaryLegitimatePurposes` field at `window.gravito.config.cmp.tcf.core.necessaryLegitimatePurposes` in the config object.  
    
    -   Now, when you use this updated config on your website, it will provide Google with the required legitimate interests even on a Reject All action.

> **Note:** This is only applicable for the TCF CMP component. The CMP will also additionally provide legitimate interest to Google’s TCF vendor. Its ID is configured in the config at `window.gravito.config.cmp.tcf.core.googleTcfId` in the config object.
