# How to Provide Google with the Required Legititimate Interest's Even on Reject All Action (Only for TCF Components)?

In PRO CMP there is provision to provide Google with the required Legitimate Interest's even on Reject All action. This is done by configuring the necessaryLegitimatePurposes field in gravitoPROCMPConfig object.
Google requires legitimate interest's for purposes [2,7,9,10] to be provided even on reject all action.

You can modify this field in either of the following ways:

1.  **Using Configurator**:  
    -   Open the CMP configurator in admin Portal.
    -   Select the Confg from the list and click on the copy configuration icon button.
    -  This will create a new CMP config with the same settings as the original one. Now enter the name on the basic setting page and click on the **Get Started** button.
    -   Now in the left side menu select the TCF CMP component 
    - Now click on TCF Settings.
   
    -   In the TCF settings you will see the necessaryLegitimatePurposes field. Change it to use purpose `2,7,9,10` and click on the **Save Progress** button. and then click on the **Publish** button to publish the new config.
    - Now when you will use this updated config in your website, it will provide Google with the required Legitimate Interest's even on Reject All action.
2.  **Without Configurator**:
    -   if you are having TCF CMP component in context then update the necessaryLegitimatePurposes field at `window.gravitoPROCMPConfig.tcfCMP.core.necessaryLegitimatePurposes` in the config object.
    -   if you are having Gravito CMP component in context then update the necessaryLegitimatePurposes field at `window.gravitoPROCMPConfig.gravitoCMP.core.necessaryLegitimatePurposes` in the config object.
    - Now when you will use this updated config in your website, it will provide Google with the required Legitimate Interest's even on Reject All action.

>**Note:** This is only applicable for TCF CMP component. CMP will additional also give legititmate interest to google's TCF vendor , its id is configured in conifg at `window.gravitoPROCMPConfig.tcfCMP.core.googleTcfId` in the config object.  