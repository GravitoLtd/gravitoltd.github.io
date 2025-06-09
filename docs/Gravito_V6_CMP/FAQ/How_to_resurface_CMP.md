# How to Resurface the CMP UI to All Users and Collect Consent Again?

Gravito CMP (New) configs maintain a version number for each CMP component. It is in the core section of the CMP config object. CMP will compare this version number with the consent setting in the cookie. If the version number is different, it will show the CMP UI to the user again.

You can increment the version number in either of the following ways:

1.  **Using Configurator**:  

    -   Open the CMP configurator in the admin portal.
    -   Select the config from the list and click on the copy configuration icon button.
    -   This will create a new CMP config with the same settings as the original one. Now enter the name on the basic settings page and click on the **Get Started** button.
    -   Now, in the left-side menu, select the CMP component you want to update. This will open the CMP-specific configuration page.
    -   Now click on **TCF Settings** or **Consent Categories**, depending on the CMP component you are updating.
    -   In this tab, at the bottom, you will see the **Explore Advanced Setup** button. Click on it to open the advanced settings.
    -   In the advanced settings, you will see the config version. Change it to a new number and click on the **Save Progress** button. Then click on the **Publish** button to publish the new config.
    -   Now, when you use this updated config on your website, it will show the CMP UI to the user again.

2.  **Without Configurator**:

    -   If you are using the TCF CMP component, update the version number at `window.gravito.config.cmp.tcf.core.version` in the config object.
    -   If you are using the Standard CMP component, update the version number at `window.gravito.config.cmp.standard.core.version` in the config object.
    -   Now, when you use this updated config on your website, it will show the CMP UI to the user again.
