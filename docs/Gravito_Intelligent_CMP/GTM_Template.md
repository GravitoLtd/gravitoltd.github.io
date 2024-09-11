GTM Template
============

Gravito CMP now can be deployed using GTM Template. In order to use this feature, check the "GTM Template?" option in the deploy section of the configuration wizard.

![](./images/GTMTemplateOption.png)

If the config is published using the "GTM Template " option then in the list view we can see an additional GTM icon in front of it. By clicking on the icon we can copy the Unique GTM token of the config which can be used in your GTM container.

![](./images/GTMToken.png)

Now go to your Google Tag Manager, and while creating a GTM tag search for Gravito Lite Custom Template

![](./images/GravitoCMPTag.png)

Inside the tag configuration UI, paste your GTM token, Which you copied from the configurator UI of the Gravito admin portal.

![](./images/GTMTag.png)

Add your required Triggers and then click on save. This template will now use the configuration that you have created and will add Gravito CMP to your website.