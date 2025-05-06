# Microsoft Consent Mode (UET)

## Enabling Microsoft Consent Mode in Gravito Intelligent CMP

Gravito CMP supports two ways to enable Universal Consent Mode:

### 1. Using Configurator

1. **Login** to the Gravito Admin Portal.
2. Click on the **CMP** tab.
3. Select the **Gravito CMP Configurator** from the option.
4. On the CMP Config listing page, click the **New Configuration** button to create a new CMP config.
5. Fill in the **basic information**, then click **Next** at the bottom-left corner.
6. On the **Consent Category** page:

    - **Tick the checkbox** labeled **"Microsoft's Universal Event Tracking (UET)"**.
    - This will open a section for **Microsoft UET Setup**.
     ![](../images/UET_Img1.png)

#### Consent Mapping:

You’ll now see dropdowns to map category for : `ad_storage`

Select the relevant **consent category** from the dropdown list.

**Note:** This mapping is for the `ad_storage` signal only is common across both GCMv2 & UET.

Once mapping is complete, click **Save** at the bottom-right. Now you have successfully enabled Microsoft UET Consent Mode in your CMP configuration.

You may continue filling out the other CMP configuration steps, or jump directly to the **"Deploy"** tab.

### 2. Without Configurator

1.  **Enable UET Mode**:  
    Add the `useUET` flag under the `settings` section of your configuration and set its value to `true`.

     <pre><code>
     "settings": {
         "useUET": true
         // ... other settings
     }
     </code></pre>

2.  Add `adsConsentId`

    You must also define the `adsConsentId` property in your configuration. This is required to map consent values for Microsoft UET. There are two cases:

    - **If Google Consent Mode is already configured**:

          The `adsConsentId` property will already be available in your config.

    - **If not configured**:

          Add the `adsConsentId` property under the `core` section of your config manually.

    <pre><code>
      "core": {
          "adsConsentId": [1] // or {{YOUR_CONSENT_ITEM_ID}}
          // ... other core settings
      }
    </code></pre>

3.  Define `adsConsentId` Based on CMP Type

    The `adsConsentId` should be a **single ID** referring to the custom consent item that you have defined in the config. It is not an array of TCF purpose IDs in this case.

      Example:
      <pre><code>
      "core": {
          "adsConsentId": {{YOUR_CONSENT_ITEM_ID}}
      }
      </code></pre>

      This means the consent value of the item with ID `"{{YOUR_CONSENT_ITEM_ID}}"` will be used for Microsoft UET.

4.  How Gravito CMP Handles UET Consent

    Once the above configuration is complete:

    - Microsoft UET mode is considered **enabled**.
    - Gravito CMP adds the corresponding ads consent value (`denied` or `granted`) to the global `uetq` window object.
    - By default, the value is `denied`.
    - After consent is obtained, the CMP updates the value based on the mapping defined in `adsConsentId`.

    Microsoft reads this value from the `uetq` object to determine whether tracking is allowed.

    Gravito CMP's follow the approach mentioned [Here](https://help.ads.microsoft.com/#apex/ads/en/60119/1-500)
