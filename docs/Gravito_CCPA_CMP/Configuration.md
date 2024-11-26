# CCPA CMP Configuration

Here you can find the configuration options for the Gravito CCPA CMP.

<table>
    <tr>
        <th>Property Name</th>
        <th>Purpose</th>
        <th>Datatype</th>
    </tr>
    <tr>
        <td>title</td>
        <td>The title of the CMP.</td>
        <td style="text-align: center;">String</td>
    </tr>
    <tr>
        <td>introductionText</td>
        <td>The introduction text displayed at the top of the CMP below title.</td>
        <td style="text-align: center;">String</td>
    </tr>
    <tr>
        <td>cookieName</td>
        <td>The name of the cookie used to store user preferences.</td>
        <td style="text-align: center;">String</td>
    </tr>
    <tr>
        <td>cookieExpiry</td>
        <td>The expiry time of the cookie in days.</td>
        <td style="text-align: center;">Number</td>
    </tr>
    <tr>
        <td>defaultUspString</td>
        <td>The default USPrivacy string to be used if the cookie is not present.</td>
        <td style="text-align: center;">String</td>
    </tr>
    <tr>
        <td>consents</td>
        <td>The list of consents to be displayed in the CMP.</td>
        <td style="text-align: center;">Array</td>
    </tr>
    <tr>
        <td>consents[i] > name</td>
        <td>The name of the consent.</td>
        <td style="text-align: center;">String</td>
    </tr>
    <tr>
        <td>consents[i] > label</td>
        <td>The label of the consent.</td>
        <td style="text-align: center;">String</td>
    </tr>
    <tr>
        <td>logoUrl</td>
        <td>The URL of the logo to be displayed in the CMP.</td>
        <td style="text-align: center;">String</td>
    </tr>
    <tr>
        <td>style</td>
        <td>The style configuration of the CMP.</td>
        <td style="text-align: center;">Object</td>
    </tr>
    <tr>
        <td>style > customCss</td>
        <td>The custom CSS to be applied to the CMP.</td>
        <td style="text-align: center;">String</td>
    </tr>
    <tr>
        <td>style > fonts</td>
        <td>The font configuration of the CMP.</td>
        <td style="text-align: center;">Array</td>
    </tr>
    <tr>
        <td>style > fonts[i] > url</td>
        <td>The URL of the font file.</td>
        <td style="text-align: center;">String</td>
    </tr>
    <tr>
        <td>style > fonts[i] > unicodeRange</td>
        <td>The unicode range of the font.</td>
        <td style="text-align: center;">String</td>
    </tr>
    <tr>
        <td>componentUrl</td>
        <td>The URL of the component to be loaded in the CMP.</td>
        <td style="text-align: center;">String</td>
    </tr>
</table>
