# How to Resurface the CMP UI to All users and Collect Consent Again?

Gravito PRO CMP configs maintains version number for each CMP Component.it is in the core section of the cmp  config object. CMP will compare this object number with the consent setting in the cookie. If the version number is different, it will show the CMP UI to the user again.

You can increement the version number in either of the following ways:

1.  **Using Configurator**:  

    -   Open the CMP configurator in admin Portal.
    -   Select the Confg from the list and click on the copy configuration icon button.
    -   This will create a new CMP config with the same settings as the original one. Now enter the name on the basic setting page and click on the **Get Started** button.
    -   Now in the left side menu select the CMP component you want to update this will open CMP specific configuration page.
    -   Now click on TCF Settings or Consent Categories depending on the CMP component you are updating.
    -   In this tab at the bottom you will the explore Advance setup button. Click on it to open the advanced settings.
    -   In the advanced settings you will see the config version. Change it to a new number and click on the **Save Progress** button. and then click on the **Publish** button to publish the new config.
    -   Now when you will use this updated config in your website, it will show the CMP UI to the user again.

2.  **Without Configurator**:

    -   if you are having TCF CMP component in context then update the version number at `window.gravitoPROCMPConfig.tcfCMP.core.version` in the config object.
    -   if you are having Gravito CMP component in context then update the version number at `window.gravitoPROCMPConfig.gravitoCMP.core.version` in the config object.
    -   Now when you will use this updated config in your website, it will show the CMP UI to the user again.
   
   


