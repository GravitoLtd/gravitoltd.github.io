# How to Add Custom Font in PRO CMP?


To add custom fonts in PRO CMP, you can use the `customCSS` field (Code Editior) in the configurator. You can add any CSS syntax in this field, including `@font-face` rules to load custom fonts.
Here is an example of how to add a custom font using `@font-face`:
```css
@font-face {
    font-family: 'MyCustomFont';
    src: url('https://example.com/fonts/MyCustomFont.woff2') format('woff2'),
         url('https://example.com/fonts/MyCustomFont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
```
You can then use this font name to override the default font in the CSS class for the root container of PRO CMP, i.e., the class `gravitoPROCMP-tab-container`.

```css
.gravitoPROCMP-tab-container {
    font-family: 'MyCustomFont', sans-serif;
}
```