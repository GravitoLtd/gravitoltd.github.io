Headless CMP
============

In the headless version of Gravito Intelligent CMP you can render the first layer and second layer of CMP into to your own container elements that are present on your website. It provides a way to use your own CSS (and design system) to style the elements on CMP modals.

Using your own elements for CMP instead of default modals
---------------------------------------------------------

To render the first-layer and second-layer of Gravito Intelligent CMP into your own container elements you need to add following fields inside core section of your CMP config

```
gravitoCMPconfig={
    core:{
        // ... other properties ...
        firstLayerId: "cmpfirstlayer", // elementID for CMP 1st layer
        secondLayerId: "cmpsecondlayer", // elementID for CMP 2nd layer
        thirdLayerId: "cmpthirdlayer", // elementID for CMP 3rd layer

    }

}
```

NOTE: If CMP do not find these elements in DOM i.e document.getElementById(id)===undefined, then CMP will use it's own container instead and append those inside the body of html. Keep these fields undefined if you want to use CMP default modals.

Using your own CSS to style the elements
----------------------------------------

With this headless version you can use customize the UI of CMP by providing your own CSS for the given class of CMP element. To configure CMP to use custom CSS file you change "useCustomCss:true" inside style section of your config.

```
gravitoCMPconfig={
    style:{
        ///other properties
        useCustomCss: true,//  false to use gravito's Default CSS
    }
}
```

NOTE: You should ensure that your custom css file is loaded in DOM before loading CMP. Make sure your CSS file has all classes specified in CMP CSS file. You can see the [sample CSS file here](https://gravitodevcdn.blob.core.windows.net/assets/custom.css).

Examples
========

Customizing CMP UI using "useCustomCss" option and Gravito's CSS file
---------------------------------------------------------------------

For Example let's assume that you need to change the color of "Accept All" button on first layer of CMP. By default it is orange.

Before:

![](https://gravitodevcdn.blob.core.windows.net/assets/beforeModImag.PNG)

Step 1 : Copy the custom CSS file provided by gravito into your css file, you can find the file [here](https://gravitodevcdn.blob.core.windows.net/assets/custom.css). 

Step 2 : find the CSS class name ".gravitoLightCMP-layer1-actions-accept-all". It will look like this

```
.gravitoLightCMP-layer1-actions-accept-all {
        outline: none;
        margin: 10px;
        font-size: 18px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #fff;
        box-sizing: border-box;
        display: block;
        border-radius: 22px;
        border: none;
        cursor: pointer;
        height: 40px;
        width: auto;
        padding: 0px 12px;
        margin: 0px 5px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        font-family: "gravitoFont";
        background-color: #ffa500;
        font-size: 10pt;
    }
```

Step 3: Change the background color property value to the color you want to use,here I will make it "purple". Now the class should look like this

```
.gravitoLightCMP-layer1-actions-accept-all {
        outline: none;
        margin: 10px;
        font-size: 18px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #fff;
        box-sizing: border-box;
        display: block;
        border-radius: 22px;
        border: none;
        cursor: pointer;
        height: 40px;
        width: auto;
        padding: 0px 12px;
        margin: 0px 5px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        font-family: "gravitoFont";
        background-color: purple;
        font-size: 10pt;
    }
```

Step 4 : Now Add this file to your website. Make sure to place it above the CMP's deployment scripts as the style should be loaded inside the DOM before loading CMP.

After:

![](https://gravitodevcdn.blob.core.windows.net/assets/afterMod.PNG)