
# Gravito WebView-based CMP Integration Guide

## Section 1: General Architecture – WebView-based CMP (Platform-agnostic)

### Overview
Gravito’s WebView-based CMP is a cross-platform solution designed for use in mobile apps. It allows apps to display and interact with the CMP using an embedded web browser (WebView), regardless of the native platform (React Native, Flutter, Native Android, or Native iOS).

### High-Level Flow

1. **CMP HTML Page**
   - Gravito provides an embeddable CMP HTML containing all configuration and JavaScript logic.
   - This page must be hosted by the developer (on a CDN or local server).

2. **WebView Integration**
   - The CMP HTML is loaded into the mobile app’s WebView component.
   - The URL must include `?platform={platformName}` query param (e.g., `reactnative`, `flutter`, `android`, `ios`).
   - This tells the CMP JavaScript how to handle communication for that specific platform.

3. **Communication Mechanism**
   - Communication between the CMP (JavaScript) and the native app occurs through:
     - `window.postMessage` from the CMP
     - Native event listener or handler (e.g., `onMessage`)
     - JavaScript injection (`evaluateJavascript`, `injectJavaScript`, etc.)
   - Based on the platform, different APIs are used to facilitate this message passing.

### Configuration
- In the webview based CMP config make sure you have set below property in config object:
```json
gravito.config.cmp.tcf.core.isWebView = true,
```

#### Showing the CMP UI even if the user has already given consent
- If you want to show the CMP UI even if the user has already given consent, you can set the `gravito.config.cmp.tcf.core.showUiWhenConsented` to `true` in the config object.
```json
gravito.config.cmp.tcf.core.showUiWhenConsented = true,
```

### Core Message Events

| Event Type   | Direction   | Purpose                                                                      |
|--------------|-------------|------------------------------------------------------------------------------|
| CMP-loaded   | CMP → App | CMP is ready and requests consent data                                       |
| cookieData   | App → CMP | App sends existing consent data (if any)                                     |
| save         | CMP → App | User saved consent; app must store this data                                 |
| config       | App → CMP | App configures display properties of CMP UI (optional)                       |
| load         | CMP → App | CMP sends version info (informational)                                       |
| close        | CMP → App | CMP UI closed (informational)                                                |

### App Responsibilities

- Host the CMP HTML provided by Gravito
- Load it in a WebView with the correct platform query param
- Listen to messages from CMP (`CMP-loaded`, `save`)
- Send stored consent data to CMP if available
- Store updated consent data received from CMP
- Optionally configure CMP UI behavior using a `config` message
- Store the tcf consents and related data in a persistent storage solution (e.g., SharedPreferences, UserDefaults, etc.) in the format mentioned in the [TC Data Format](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md#how-is-a-cmp-used-in-app).
- if use Google Additional Consent mode you should also store the AcString data in the same persistent storage solution against the key mentioned in the [Google Additional Consent Mode](https://support.google.com/admanager/answer/9681920?hl=en#store-ac-string:~:text=In-,%2D,-app).

Note: All the information about the CMP that needs to be stored in the app is available in the data received in the save event.

## Section 2: Platform-Specific Implementation

We have created platform-specific code examples. These examples demonstrate how to integrate the WebView-based CMP into your mobile applications. Links to the code examples are provided within each section.

### React Native

#### Sample App
You can find a sample React Native app that integrates the Gravito CMP using WebView [here](https://github.com/GravitoLtd/react-native-webview-sample)

#### Required Packages

```bash
npm install react-native-webview react-native-default-preference
```

#### Code Example

```tsx
import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';
import DefaultPreference from 'react-native-default-preference';

const CMPWebView = ({navigation}) => {
  const [cmpdata, setCmpdata] = useState(undefined);
  const [loading, setLoading] = useState(true);
  let webViewRef = null;

  useEffect(() => {
    DefaultPreference.get('cmpdata').then(value => setCmpdata(value));
  }, []);

  const goBack = () => navigation.pop();

  return (
    <>
      <WebView
        ref={ref => (webViewRef = ref)}
        source={{
          uri: 'https://yourhost.com/gravito-cmp.html?platform=reactnative',
        }}
        startInLoadingState={true}
        onLoadStart={() => setLoading(true)}
        onLoad={() => {
          setLoading(false);
          const configEvent = {
            type: 'config',
            backgroundColor: 'orange',
            logoUrl: 'https://cdn.gravito.net/logos/gravito_logo_white_background.png',
            displayPreferencesCloseBtn: true,
          };
          const configJS = `window.postMessage(${JSON.stringify(configEvent)}, "*");true;`;
          webViewRef.injectJavaScript(configJS);
        }}
        onMessage={event => {
          const {type} = JSON.parse(event.nativeEvent.data);
          switch (type) {
            case 'CMP-loaded':
              const payload = {
                type: 'cookieData',
                ...(cmpdata ? JSON.parse(cmpdata) : {}),
              };
              const postJS = `window.postMessage(${JSON.stringify(payload)}, "*");true;`;
              webViewRef.injectJavaScript(postJS);
              break;

            case 'save':
              DefaultPreference.set('cmpdata', event.nativeEvent.data);
              goBack();
              break;

            case 'load':
              console.log('CMP config/version info:', event.nativeEvent.data);
              break;

            case 'close':
              break;

            default:
              break;
          }
        }}
      />

      {loading && (
        <ActivityIndicator
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          size="large"
        />
      )}
    </>
  );
};

export default CMPWebView;
```



#### Consent Storage

```tsx
// To store
DefaultPreference.set('cmpdata', jsonData);

// To retrieve
DefaultPreference.get('cmpdata').then(value => { ... });
```
Note: The `cmpdata` should be stored in the format mentioned in the [TC Data Format](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md#how-is-a-cmp-used-in-app) 


#### Opening the CMP UI from Apps

```tsx
webView.injectJavaScript(
  'window.gravito.cmp.openPreferences();',
  true,
);
```

---

### Flutter

#### Sample App
You can find a sample Flutter app that integrates the Gravito CMP using WebView [here](https://github.com/GravitoLtd/flutter-webview-sample)

#### Required Packages

```yaml
dependencies:
  webview_flutter: ^4.0.7
  webview_flutter_wkwebview: ^3.10.0
  shared_preferences: ^2.0.15
```

#### Code Example

```dart
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:webview_flutter_wkwebview/webview_flutter_wkwebview.dart';

class CMPWebView extends StatefulWidget {
  const CMPWebView({super.key});

  @override
  State<CMPWebView> createState() => _CMPWebViewState();
}

class _CMPWebViewState extends State<CMPWebView> {
  late final WebViewController controller;
  bool loading = true;

  @override
  void initState() {
    super.initState();

    final WebKitWebViewControllerCreationParams params =
        WebKitWebViewControllerCreationParams(
      allowsInlineMediaPlayback: true,
      mediaTypesRequiringUserAction: const <PlaybackMediaTypes>{},
    );

    controller = WebKitWebViewController.fromParams(params)
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..addJavaScriptChannel(
        'FlutterAppWebView',
        onMessageReceived: _onJavaScriptMessageReceived,
      )
      ..setNavigationDelegate(NavigationDelegate(
        onPageFinished: (_) {
          setState(() => loading = false);
        },
      ))
      ..loadRequest(Uri.parse(
          'https://yourdomain.com/gravito-cmp.html?platform=flutter'));
  }

  Future<void> _onJavaScriptMessageReceived(JavaScriptMessage message) async {
    final prefs = await SharedPreferences.getInstance();
    final data = jsonDecode(message.message);
    final type = data['type'];

    switch (type) {
      case 'CMP-loaded':
        final stored = prefs.getString('cookieData');
        final cookieMsg = {
          "type": "cookieData",
          "tcstring": stored != null ? jsonDecode(stored)["tcstring"] : null,
          "nontcfdata":
              stored != null ? jsonDecode(stored)["nontcfdata"] : null,
        };
        controller.runJavaScript(
            'window.postMessage(${jsonEncode(cookieMsg)})');
        break;

      case 'save':
        await prefs.setString("cookieData", jsonEncode({
          "tcstring": data["tcstring"],
          "nontcfdata": data["nontcfdata"],
        }));
        break;

      case 'close':
        Navigator.of(context).pop();
        break;

      default:
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Consent Manager'),
      ),
      body: Stack(
        children: [
          WebViewWidget(controller: controller),
          if (loading)
            const Center(child: CircularProgressIndicator()),
        ],
      ),
    );
  }
}
```



> ⚠️ **Important**: You must register the JavaScript adapter with the exact name used in the CMP JavaScript. For Gravito CMP, the adapter name should be `"FlutterAppWebView"`.


#### Consent Storage

```dart
// Store
await prefs.setString('cookieData', jsonEncode(cookie));

// Retrieve
final stored = prefs.getString('cookieData');
```
Note: The `cookieData` should be stored in the format mentioned in the [TC Data Format](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md#how-is-a-cmp-used-in-app)

#### Opening Preferences UI from App

```dart
controller.runJavaScript('window.gravito.cmp.openPreferences();');
```

---

### iOS (Native)

#### Sample App  
You can find a sample IOS app that integrates the Gravito CMP using WebView [here](https://github.com/GravitoLtd/ios-webview-sample)

#### Required Configuration

- Ensure `NSAppTransportSecurity` is updated in `Info.plist` to allow loading the CMP page if it’s served from HTTP or non-standard HTTPS.

```xml
<key>NSAppTransportSecurity</key>
<dict>
  <key>NSAllowsArbitraryLoads</key>
  <true/>
</dict>
```

#### Code Example

```swift
import UIKit
import WebKit

class ViewController: UIViewController, WKScriptMessageHandler {

    var webView: WKWebView!

    override func viewDidLoad() {
        super.viewDidLoad()

        let preferences = WKPreferences()
        preferences.setValue(true, forKey: "developerExtrasEnabled")

        let configuration = WKWebViewConfiguration()
        configuration.preferences = preferences
        configuration.userContentController.add(self, name: "jsHandler")

        webView = WKWebView(frame: view.bounds, configuration: configuration)
        webView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        if #available(iOS 16.4, *) {
            webView.isInspectable = true
        }
        view.addSubview(webView)

        loadTheUrl()
    }

    func loadTheUrl() {
        let urlString = "https://yourhost.com/gravito-cmp.html?platform=ios"
        if let url = URL(string: urlString) {
            let request = URLRequest(url: url)
            webView.load(request)
        }
    }

    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        if message.name == "jsHandler",
           let json = message.body as? [String: Any],
           let event = json["event"] as? String {
            switch event {
            case "start":
                let tcstring = UserDefaults.standard.string(forKey: "tcstring") ?? ""
                let nontcfdata = UserDefaults.standard.string(forKey: "nontcfdata") ?? ""
                let acstring = UserDefaults.standard.string(forKey: "acstring") ?? ""

                let dict: [String: Any] = [
                    "type": "cookieData",
                    "tcstring": tcstring,
                    "nontcfdata": nontcfdata,
                    "acstring": acstring,
                ]
                if let jsonData = try? JSONSerialization.data(withJSONObject: dict, options: []),
                   let jsonString = String(data: jsonData, encoding: .utf8) {
                    let js = "window.postMessage(\(jsonString), "*");true;"
                    webView.evaluateJavaScript(js, completionHandler: nil)
                }

            case "save":
                if let tcstring = json["data"] as? String {
                    UserDefaults.standard.set(tcstring, forKey: "tcstring")
                }
                if let nontcfdata = json["nontcfdata"] as? String {
                    UserDefaults.standard.set(nontcfdata, forKey: "nontcfdata")
                }
                if let acstring = json["acstring"] as? String {
                    UserDefaults.standard.set(acstring, forKey: "acstring")
                }

            default:
                break
            }
        }
    }
}
```

> ⚠️ **Important**: You must register the JavaScript adapter with the exact name used in the CMP JavaScript. For Gravito CMP, the adapter name should be `"jsHandler"`.



#### Consent Storage

```swift
UserDefaults.standard.set(tcstring, forKey: "tcstring")
UserDefaults.standard.set(nontcfdata, forKey: "nontcfdata")
UserDefaults.standard.set(acstring, forKey: "acstring")

let tcstring = UserDefaults.standard.string(forKey: "tcstring")
let nontcfdata = UserDefaults.standard.string(forKey: "nontcfdata")
let acstring = UserDefaults.standard.string(forKey: "acstring")
```
Note: The `tcstring`, `nontcfdata`, and `acstring` should be stored in the format mentioned in the [TC Data Format](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md#how-is-a-cmp-used-in-app).

#### Opening Preferences UI from App

```swift
webView.evaluateJavaScript("window.gravito.cmp.openPreferences();", completionHandler: nil)
```
### Android Native (Java/Kotlin)

#### Overview

The Android implementation of Gravito CMP uses a WebView that communicates with the native app through a `JavaScriptInterface`. The app handles consent data storage using `SharedPreferences`.

#### Sample App
You can find a sample Android app that integrates the Gravito CMP using WebView [here](https://github.com/GravitoLtd/GravitoWebViewSampleAndroidForV6)

> ⚠️ **Important**: You must register the JavaScript adapter with the exact name used in the CMP JavaScript. For Gravito CMP, the adapter name should be `"AndroidAppWebView"`.

#### Required Setup

- Minimum Android SDK: 21+
- Add Internet permissions in `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET"/>
```

#### Required Components

- `WebView` setup in your Activity
- JavaScript interface class (`WebAppInterface`)
- Consent storage using `SharedPreferences`

---

### JavaScript Adapter: `WebAppInterface.java`

```java
package com.example.gravito_android_webview_sample;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.widget.Toast;
import org.json.JSONException;
import org.json.JSONObject;

public class WebAppInterface {
    private final Context context;
    private final SharedPreferences sharedPreferences;

    public WebAppInterface(Context context) {
        this.context = context;
        this.sharedPreferences = context.getSharedPreferences("MYPREF", Context.MODE_PRIVATE);
    }

    @JavascriptInterface
    public void showToast(String toast) {
        Toast.makeText(context, toast, Toast.LENGTH_SHORT).show();
    }

    @JavascriptInterface
    public void getValueFromWebView(String value) {
        try {
            JSONObject jsonObject = new JSONObject(value);
            String type = jsonObject.optString("type");

            switch (type) {
                case "save":
                    String tcString = jsonObject.optString("tcstring", "");
                    String acString = jsonObject.optString("acstring", "");
                    String nonTcfData = jsonObject.optString("nontcfdata", "");

                    SharedPreferences.Editor editor = sharedPreferences.edit();
                    editor.putString("TC_STRING", tcString);
                    editor.putString("AC_STRING", acString);
                    editor.putString("NON_TCF_DATA", nonTcfData);
                    editor.apply();
                    break;

                case "close":
                    Log.d("WebAppInterface", "Handling close event");
                    break;

                case "load":
                    Log.d("WebAppInterface", "Handling load event");
                    break;

                default:
                    Log.d("WebAppInterface", "Unknown event type: " + type);
                    break;
            }

        } catch (JSONException e) {
            Log.e("WebAppInterface", "JSON parse error: " + e.getMessage());
        }
    }

    @JavascriptInterface
    public String getValueFromStorage() {
        try {
            String tcString = sharedPreferences.getString("TC_STRING", null);
            String acString = sharedPreferences.getString("AC_STRING", null);
            String nonTcfData = sharedPreferences.getString("NON_TCF_DATA", null);

            JSONObject json = new JSONObject();
            json.put("tcstring", tcString);
            json.put("acstring", acString);
            json.put("nontcfdata", nonTcfData);

            return json.toString();
        } catch (JSONException e) {
            Log.e("WebAppInterface", "JSON creation error: " + e.getMessage());
            return "{}";
        }
    }

    @JavascriptInterface
    public void onButtonClick() {
        // Optional: handle clicks from CMP if required
    }
}
```

---

### MainActivity Setup

```java
package com.example.gravito_android_webview_sample;

import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    private WebView cmpWebView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        cmpWebView = new WebView(this);
        setContentView(cmpWebView);

        WebSettings webSettings = cmpWebView.getSettings();
        webSettings.setJavaScriptEnabled(true);

        // Register JavaScript interface with exact name used in CMP HTML
        cmpWebView.addJavascriptInterface(new WebAppInterface(this), "AndroidAppWebView");

        cmpWebView.loadUrl("https://yourdomain.com/gravito-cmp.html?platform=android");
    }

    @Override
    protected void onDestroy() {
        if (cmpWebView != null) {
            cmpWebView.destroy();
        }
        super.onDestroy();
    }
}
```

---

### Opening Preferences UI from Native App

```java
cmpWebView.evaluateJavascript("window.gravito.cmp.openPreferences();", null);
```

---

### Consent Storage

The following keys are used for storing consent data:

| Key             | Value Description                         |
|------------------|--------------------------------------------|
| `TC_STRING`      | TCF v2 consent string (`tcstring`)         |
| `AC_STRING`      | Google Additional Consent string (`acstring`) |
| `NON_TCF_DATA`   | Any non-TCF custom data                    |

Make sure these values are persisted in `SharedPreferences` for future app launches.

---
Note: The `tcstring`, `nontcfdata`, and `acstring` should be stored in the format mentioned in the [TC Data Format](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md#how-is-a-cmp-used-in-app).

### Summary

- Use `WebView` to load Gravito CMP with `?platform=android`.
- Register JavaScript adapter named `AndroidAppWebView` (case-sensitive).
- Use `WebAppInterface` class to handle consent events (`save`, `load`, `close`).
- Persist consent data using `SharedPreferences`.
- Use `evaluateJavascript` to send commands from app to WebView (e.g., open preferences screen).