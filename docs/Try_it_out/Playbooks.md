# Playbooks

Quick guides to get started with various deployment scenarios.

#### Deploy basic consent management banner and wire the tags on it

1.  Register/login to [https://adminv2.gravito.net](https://adminv2.gravito.net/)
2.  Navigate to CMP > Gravito CMP configurator > New Configuration
3.  Create configuration, you will find help from content menus and tooltips
4.  Upload configuration when satisfied with the result
5.  Generate deployment script from list of configurations, by clicking script icon in front of your config.
6.  Copy the script to clipboard (to deploy via GTM or similar) or download it to be uploaded to your server
7.  If you are up to deploy via GTM, follow the steps [here](../Gravito_Intelligent_CMP/GTM_Template.md)
8.  Otherwise embed the uploaded cmp script to your website template, third party tags that you might have need to be wrapped with custom triggers that are listening to CMP events and consent being set
9.  Add link on your website from which the user can resurface the CMP, give the link id "manageSettings" or whatever you specified when configuring the CMP. Alternatively you can specify the link to call window.gravitoLightCMP.openPreferences()
10. Test that CMP opens as it should and after accept/reject click the CMP won't surface again on page reload

#### Deploy consent management banner with first party API integration

1.  Register/login to [https://adminv2.gravito.net](https://adminv2.gravito.net/)
2.  If you have not added the domain you are up to deploy CMP to when registering, add the domain by going to Account > Register domains
3.  Add domain if needed
4.  Go to Domains > First party domains > New domain
5.  Select the domain you are planning to use CMP on, repeat the steps if you have multiple domains
6.  After you have added domain(s), you will have DNS settings to be made, add those to DNS server of your domain
7.  When you are complete with DNS settings wait few minutes (minimum) for the changes to propagate
8.  Open newly added first party domain from the list (click on Edit), check to confirm that you have done the required DNS settings and click on Validate
9.  After validation the certificate is created, repeat the steps for other domains if you added multiple
10. Navigate to CMP > Gravito CMP configurator > New Configuration
11. On the settings page of the configurator click on the "Use Gravito Backend" checkbox. you can optionally pass your first-party domain URL, else our code SDK will smartly derive it from the domain on which this configuration is deployed, We recommend keeping this field blank unless you need it
12. You will find help from content menus and tooltipsUpload configuration when satisfied with the result.
13. Generate deployment script from list of configurations
14. Copy the script to clipboard (to deploy via GTM or similar) or download it to be uploaded to your server
15. If you are up to deploy via GTM, follow the steps [here](https://docs.gravito.net/Gravito_Intelligent_CMP/GTM_Template/)
16. Otherwise embed the uploaded cmp script to your website template, third party tags that you might have need to be wrapped with custom triggers that are listening to CMP events and consent being set
17. Add link on your website from which the user can resurface the CMP, give the link id "manageSettings" or whatever you specified when configuring the CMP. Alternatively you can specify the link to call window.gravitoLightCMP.openPreferences()
18. Validate that there is request made to https://gto.<yourdomain> when CMP loads on your website (on first page load)
19. Test that CMP opens as it should and after accept/reject click the CMP won't surface again on page reload
