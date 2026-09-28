# Gravito CMP Mobile WebView Integration Guide

## Purpose

This document provides implementation guidance for integrating Gravito CMP in mobile applications through a WebView. Native iOS, React Native, Flutter, and native Android reference implementations are included.

## CMP WebView Overview

The mobile app loads a hosted Gravito CMP HTML page inside a WebView. The CMP page must be configured for WebView mode and loaded with both `platform` and `region` query parameters.

```text
https://{yourhostedwebveiewhtmlpath}?platform={platform}&region={region}
```

Replace `{yourhostedwebveiewhtmlpath}` with the complete hosted CMP HTML path, `{platform}` with the platform bridge value (`ios`, `reactnative`, `flutter`, or `android`), and `{region}` with the region required by the application. Both query parameters are required.

Required CMP configuration depends on the underlying framework.

For `GPP + TCF`:

```js
gravito.config.cmp.tcf.core.isWebView = true;
```

For `GPP + US Privacy`:

```js
gravito.config.cmp.usprivacy.core.isWebView = true;
```

Optional for `GPP + TCF`, if the app needs to show the preferences UI even after consent already exists:

```js
gravito.config.cmp.tcf.core.showUiWhenConsented = true;
```

For `GPP + US Privacy`, whether the banner is required is controlled by the active GPP section configuration for the selected `region`. The CMP returns the `bannerRequired` flag with the `save` event. If a state or region does not require the UI, the CMP can skip showing the banner and still send a `save` event with the default `gppstring`; the app must store that `gppstring` and can then close or hide the WebView.

The CMP sends `cmpType` with each native event. The app must use `cmpType` to choose which stored values to send back and which fields to persist on save.

The fields exchanged with the app depend on the underlying CMP framework. For `GPP + TCF`, the app must persist and return the TCF fields plus `gppstring` and `googleConsents`. For `GPP + US Privacy`, the app must persist and return `gppstring` and any `googleConsents` sent by the CMP. For Standard CMP, the app must persist and return `gcstring` and any `googleConsents` sent by the CMP.

This integration does not embed a native CMP SDK. Gravito runs as a web CMP inside `WKWebView`. When consent is saved, the web CMP sends its pre-parsed IAB data through the native bridge, and the host app performs the native persistence normally associated with an in-app CMP integration:

```text
Gravito web CMP
    -> save bridge event
    -> native platform payload parser
    -> iOS UserDefaults or Android default SharedPreferences
    -> third-party native SDKs read IABTCF_* and IABGPP_*
```

The web CMP remains the source of consent. The native layer does not calculate or decode consent; it converts and stores the supplied `inAppTCData` and `gppData` values under the IAB-defined native key names.

## Implementation Structure

Use the following structure when planning a mobile WebView integration:

```text
1. Shared WebView setup
   - Host CMP HTML.
   - Enable WebView mode.
   - Load URL with platform and region.
   - Register platform bridge.

2. Framework data contract
   - Route by cmpType on every event.
   - cmpType=tcf: send and store TCF fields plus gppstring and googleConsents.
   - cmpType=usprivacy: send and store gppstring plus googleConsents when present.
   - cmpType=standard: send and store gcstring plus googleConsents when present.

3. Platform implementation
   - Native iOS: reference implementation included.
   - React Native: reference implementation included.
   - Flutter: reference implementation included.
   - Native Android: reference implementation included.
```

## Sample Git Repositories



| Platform | Sample repository |
| --- | --- |
| Native iOS | [IOS webview sample](https://github.com/GravitoLtd/ios-webview-sample/tree/gpp-webview) |
| React Native | [React native webview sample](https://github.com/GravitoLtd/react-native-webview-sample/tree/gpp-support) |
| Flutter | [Flutterwebview sample](https://github.com/GravitoLtd/flutter-webview-sample/tree/gpp-support) |
| Native Android | [Native Android Sample](https://github.com/GravitoLtd/GravitoWebViewSampleAndroidForV6/tree/gpp-webview) |

## Message Contract

| Message | Direction | Purpose |
| --- | --- | --- |
| `start` | CMP -> app | CMP is loaded and asks the app for stored consent data. |
| `cookieData` | App -> CMP | App returns stored consent data to initialize the CMP. |
| `save` | CMP -> app | User saved consent. App must persist the payload. |
| `load` | CMP -> app | CMP sends version/status information. |
| `close` | CMP -> app | User closed the CMP UI. |

The CMP-to-app message name key is platform-specific:

| Platform | Message name key | Example |
| --- | --- | --- |
| Native iOS | `event` | `{ "event": "start" }` |
| React Native | `type` | `{ "type": "CMP-loaded" }` |
| Flutter | `type` | `{ "type": "CMP-loaded" }` |
| Native Android | `type` | `{ "type": "CMP-loaded" }` |

For native iOS, CMP-to-app messages are posted through:

```js
window.webkit.messageHandlers.jsHandler.postMessage(message);
```

The native iOS app must register a `WKScriptMessageHandler` named `jsHandler`.

Each CMP-to-app event includes:

| Field | Purpose |
| --- | --- |
| `event` or `type` | Message name, such as `start`, `cookieData`, or `save`. CMP-to-iOS messages use `event`; other platform CMP messages use `type`. |
| `cmpType` | CMP framework that owns the payload. Expected values: `tcf`, `usprivacy`, `standard`. |
| `bannerRequired` | Sent with `save`. When `false`, the app can close or hide the WebView after storing the returned data. |
| `inAppTCData` | Sent with TCF `save` events. Pre-parsed TCF data used to populate the standard `IABTCF_*` keys. Lowercase `inAppTCData` is the canonical field name emitted by Gravito. |
| `gppData` | Sent with GPP-enabled `save` events. GPP `PingReturn` data used to populate the standard `IABGPP_*` keys. |

### IAB Native Storage Payloads

`inAppTCData` is the result of the TCF `getInAppTCData` command, not the browser-oriented `TCData` object. It includes the TC string and pre-parsed values required for native storage. The iOS bridge maps this object to the corresponding `IABTCF_*` keys in `UserDefaults`.

`gppData` is the GPP `PingReturn` object. It includes `gppVersion`, `sectionList`, `gppString`, `applicableSections`, and `parsedSections`. The iOS bridge maps the header and section values to `IABGPP_*` keys and converts the parsed section fields to their IAB native representations.

Native storage supports Integer and String values. The bridge converts Boolean values to `0` or `1`, dates to Unix epoch milliseconds, scalar arrays and bitfields to underscore-separated strings, and range records to underscore-separated `id:type` pairs. Before saving a replacement snapshot, it removes the previous keys with the same IAB prefix so removed consent signals or sections cannot remain visible to native SDKs.

The bridge writes `IABTCF_CmpSdkID` when it receives valid `inAppTCData`. Because this integration uses a web CMP rather than a native CMP SDK, the native app cannot write that value earlier unless the web CMP supplies the CMP ID in an earlier bridge event.

The TCF mappings used by the reference implementation are:

| `inAppTCData` value | `UserDefaults` key |
| --- | --- |
| `cmpId` | `IABTCF_CmpSdkID` |
| `cmpVersion` | `IABTCF_CmpSdkVersion` |
| `tcfPolicyVersion` | `IABTCF_PolicyVersion` |
| `gdprApplies` | `IABTCF_gdprApplies` |
| `publisherCC` | `IABTCF_PublisherCC` |
| `purposeOneTreatment` | `IABTCF_PurposeOneTreatment` |
| `useNonStandardTexts` | `IABTCF_UseNonStandardTexts` |
| `tcString` | `IABTCF_TCString` |
| `specialFeatureOptins` | `IABTCF_SpecialFeaturesOptIns` |
| `purpose.consents` | `IABTCF_PurposeConsents` |
| `purpose.legitimateInterests` | `IABTCF_PurposeLegitimateInterests` |
| `vendor.consents` | `IABTCF_VendorConsents` |
| `vendor.legitimateInterests` | `IABTCF_VendorLegitimateInterests` |
| `vendor.disclosedVendors` | `IABTCF_DisclosedVendors` |
| `publisher.consents` | `IABTCF_PublisherConsent` |
| `publisher.legitimateInterests` | `IABTCF_PublisherLegitimateInterests` |
| `publisher.customPurpose.consents` | `IABTCF_PublisherCustomPurposesConsents` |
| `publisher.customPurpose.legitimateInterests` | `IABTCF_PublisherCustomPurposesLegitimateInterests` |
| `publisher.restrictions.{purposeID}` | `IABTCF_PublisherRestrictions{purposeID}` |

The GPP header and encoded-section mappings are:

| `gppData` value | `UserDefaults` key |
| --- | --- |
| `gppVersion` | `IABGPP_HDR_Version` |
| `sectionList` | `IABGPP_HDR_Sections` |
| `gppString` | `IABGPP_HDR_GppString` |
| Encoded section corresponding to each `sectionList` entry | `IABGPP_{sectionID}_String` |
| `applicableSections` | `IABGPP_GppSID` |
| Each supported `parsedSections` field | `IABGPP_{sectionPrefix}_{fieldName}` |

Authoritative specifications:

- [IAB Tech Lab CMP API v2 — In-App Details](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md#how-is-a-cmp-used-in-app)
- [IAB Global Privacy Platform CMP API — In-App Details](https://github.com/InteractiveAdvertisingBureau/Global-Privacy-Platform/blob/main/Core/CMP%20API%20Specification.md#in-app-details)

## Framework Data Contracts

### GPP + TCF

Use this when the CMP runs GPP with TCF as the underlying framework.

The app sends these fields back to the CMP in the `cookieData` message. Native iOS sends this payload through `window.postMessage` with `type: "cookieData"`.

```json
{
  "type": "cookieData",
  "cmpType": "tcf",
  "tcstring": "TCF_STRING",
  "nontcfdata": [],
  "acstring": "GOOGLE_AC_STRING",
  "gppstring": "GPP_STRING",
  "googleConsents": {}
}
```

The app persists these fields from the `save` message:

| Storage key | Payload field | Notes |
| --- | --- | --- |
| `tcstring` | `tcstring` | TCF TC string. |
| `acstring` | `acstring` | Google Additional Consent string, when enabled. |
| `nontcfdata` | `nontcfdata` | Non-TCF/custom vendor consent data. Store as a JSON-compatible object. |
| `gppstring` | `gppstring` | Required when GPP is enabled. |
| `currentstate` | `currentstate` | Optional diagnostic/current CMP state. |
| `googleConsents` | `googleConsents` | Google consent values, when present. Store as a JSON-compatible object. |
| IAB TCF native keys | `inAppTCData` | Required for native SDK interoperability. Convert and store as the corresponding `IABTCF_*` values. |
| IAB GPP native keys | `gppData` | Required when GPP is enabled. Convert the GPP `PingReturn` to `IABGPP_*` values. |

### GPP + US Privacy

Use this when the CMP runs GPP with only a US Privacy section as the underlying framework. In this case, the native app should send and store only the GPP string.

The app sends this back to the CMP in the `cookieData` message:

```json
{
  "type": "cookieData",
  "cmpType": "usprivacy",
  "gppstring": "GPP_STRING"
}
```

The app persists this field from the `save` message:

| Storage key | Payload field | Notes |
| --- | --- | --- |
| `gppstring` | `gppstring` | Required for GPP US Privacy state. |
| `googleConsents` | `googleConsents` | Google consent values, when present. Store as a JSON-compatible object. |
| IAB GPP native keys | `gppData` | Convert the GPP `PingReturn` to `IABGPP_*` values. |

For US Privacy states or regions where no banner UI is required:

1. The app loads the CMP WebView with `platform` and `region`.
2. The CMP sends `start`.
3. The app sends `cookieData` with `cmpType: "usprivacy"` and the stored `gppstring`, or an empty value on first launch.
4. The CMP does not show the UI.
5. The CMP sends `save` with `cmpType: "usprivacy"`, `gppstring`, and `bannerRequired: false`.
6. The app stores the returned default `gppstring`.
7. The app closes or hides the WebView.

### Standard CMP

Use this when `cmpType` is `standard`.

The app sends this back to the CMP in the `cookieData` message:

```json
{
  "type": "cookieData",
  "cmpType": "standard",
  "gcString": "GC_STRING"
}
```

The app persists this field from the `save` message:

| Storage key | Payload field | Notes |
| --- | --- | --- |
| `gcstring` | `gcstring` | Standard CMP consent string. |
| `googleConsents` | `googleConsents` | Google consent values, when present. Store as a JSON-compatible object. |

The current iOS sample sends `gcString` in `cookieData` for Standard CMP and stores `gcstring` from the `save` event.

The native iOS reference implementation branches by `cmpType` and includes payload handling for `tcf`, `usprivacy`, and `standard`.

## Native iOS Implementation

### 1. Add WebKit

Use `WKWebView` and register the `jsHandler` bridge.

```swift
import UIKit
import WebKit
```

### 2. Configure App Transport Security

If the CMP page is served over standard HTTPS, no special exception is usually needed. If the page is served from HTTP or a non-standard HTTPS setup during development, update `Info.plist` according to the app security policy.

Development-only example:

```xml
<key>NSAppTransportSecurity</key>
<dict>
  <key>NSAllowsArbitraryLoads</key>
  <true/>
</dict>
```

### 3. Add The Native iOS Reference Implementation

The following reference implementation demonstrates the required WebView setup, native bridge registration, event routing, and consent storage behavior for native iOS.

```swift
import UIKit
import WebKit

class ViewController: UIViewController, WKScriptMessageHandler {

    var webView: WKWebView!
    private let clearPreferencesButton = UIButton(type: .system)
    private let openPreferencesLayer1Button = UIButton(type: .system)
    private let openPreferencesLayer2Button = UIButton(type: .system)

    override func viewDidLoad() {
        super.viewDidLoad()

        // Enable WebView inspection during development.
        let preferences = WKPreferences()
        preferences.setValue(true, forKey: "developerExtrasEnabled")

        let configuration = WKWebViewConfiguration()
        configuration.preferences = preferences
        configuration.userContentController.add(self, name: "jsHandler")

        webView = WKWebView(frame: view.bounds, configuration: configuration)
        webView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        if #available(iOS 16.4, *) {
            webView.isInspectable=true
        } else {
            // WebView inspection is unavailable on earlier iOS versions.
        }
        view.addSubview(webView)
        setupClearPreferencesButton()
        setupOpenPreferencesButtons()

        loadTheUrl()
    }

    private func setupClearPreferencesButton() {
        clearPreferencesButton.setTitle("Clear Preferences", for: .normal)
        clearPreferencesButton.setTitleColor(.white, for: .normal)
        clearPreferencesButton.backgroundColor = .systemRed
        clearPreferencesButton.layer.cornerRadius = 8
        clearPreferencesButton.titleLabel?.font = .systemFont(ofSize: 14, weight: .semibold)
        clearPreferencesButton.contentEdgeInsets = UIEdgeInsets(top: 8, left: 12, bottom: 8, right: 12)
        clearPreferencesButton.translatesAutoresizingMaskIntoConstraints = false
        clearPreferencesButton.addTarget(self, action: #selector(clearSharedPreferences), for: .touchUpInside)

        view.addSubview(clearPreferencesButton)

        NSLayoutConstraint.activate([
            clearPreferencesButton.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor, constant: 12),
            clearPreferencesButton.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -12)
        ])
    }

    private func setupOpenPreferencesButtons() {
        configurePreferencesButton(
            openPreferencesLayer1Button,
            title: "Layer 1",
            action: #selector(openPreferencesLayer1)
        )
        configurePreferencesButton(
            openPreferencesLayer2Button,
            title: "Layer 2",
            action: #selector(openPreferencesLayer2)
        )

        view.addSubview(openPreferencesLayer1Button)
        view.addSubview(openPreferencesLayer2Button)

        NSLayoutConstraint.activate([
            openPreferencesLayer1Button.leadingAnchor.constraint(equalTo: clearPreferencesButton.trailingAnchor, constant: 12),
            openPreferencesLayer1Button.centerYAnchor.constraint(equalTo: clearPreferencesButton.centerYAnchor),
            openPreferencesLayer2Button.leadingAnchor.constraint(equalTo: openPreferencesLayer1Button.trailingAnchor, constant: 12),
            openPreferencesLayer2Button.centerYAnchor.constraint(equalTo: clearPreferencesButton.centerYAnchor)
        ])
    }

    private func configurePreferencesButton(_ button: UIButton, title: String, action: Selector) {
        button.setTitle(title, for: .normal)
        button.setTitleColor(.white, for: .normal)
        button.backgroundColor = .systemBlue
        button.layer.cornerRadius = 8
        button.titleLabel?.font = .systemFont(ofSize: 14, weight: .semibold)
        button.contentEdgeInsets = UIEdgeInsets(top: 8, left: 12, bottom: 8, right: 12)
        button.translatesAutoresizingMaskIntoConstraints = false
        button.addTarget(self, action: action, for: .touchUpInside)
    }

    @objc private func clearSharedPreferences() {
        if let bundleIdentifier = Bundle.main.bundleIdentifier {
            UserDefaults.standard.removePersistentDomain(forName: bundleIdentifier)
        } else {
            ["tcstring", "currentstate", "nontcfdata", "acstring", "gppString", "gppstring", "gppData", "InAppTcData", "googleConsents"].forEach {
                UserDefaults.standard.removeObject(forKey: $0)
            }
            UserDefaults.standard.dictionaryRepresentation().keys
                .filter { $0.hasPrefix("IABTCF_") || $0.hasPrefix("IABGPP_") }
                .forEach { UserDefaults.standard.removeObject(forKey: $0) }
        }

        UserDefaults.standard.synchronize()
        if webView.superview == nil {
            view.insertSubview(webView, belowSubview: clearPreferencesButton)
        }
        loadTheUrl()
    }

    @objc private func openPreferencesLayer1() {
        openPreferences(layer: 0)
    }

    @objc private func openPreferencesLayer2() {
        openPreferences(layer: 1)
    }

    private func openPreferences(layer: Int) {
        if webView.superview == nil {
            view.insertSubview(webView, belowSubview: clearPreferencesButton)
        }
        webView.evaluateJavaScript("window.gravito.cmp.openPreferences(\(layer));", completionHandler: nil)
    }

    func loadTheUrl() {
        let urlString = "https://{yourhostedwebveiewhtmlpath}?platform=ios&region={region}"
        if let url = URL(string: urlString) {
            let request = URLRequest(url: url)
            webView.load(request)
        }
    }

    private func showConsentReceivedAlert(cmpType: String, receivedString: String) {
        let message = "bannerRequired=false\ncmpType=\(cmpType)\nreceivedString=\(receivedString)"
        DispatchQueue.main.async {
            guard self.presentedViewController == nil else { return }
            let alert = UIAlertController(title: "Consent Received", message: message, preferredStyle: .alert)
            alert.addAction(UIAlertAction(title: "OK", style: .default))
            self.present(alert, animated: true)
        }
    }

    private func saveJSONObject(_ object: Any, forKey key: String) {
        guard JSONSerialization.isValidJSONObject(object),
              let data = try? JSONSerialization.data(withJSONObject: object) else { return }
        UserDefaults.standard.set(data, forKey: key)
    }

    /// Persists a GPP PingReturn using the IAB GPP in-app key convention.
    private func saveGPPData(_ gppData: [String: Any]) {
        let defaults = UserDefaults.standard

        // Replace the complete snapshot so removed sections cannot survive.
        defaults.dictionaryRepresentation().keys
            .filter { $0.hasPrefix("IABGPP_") }
            .forEach { defaults.removeObject(forKey: $0) }

        if let version = gppData["gppVersion"] as? String {
            defaults.set(version, forKey: "IABGPP_HDR_Version")
        }

        let sectionIDs = integerArray(from: gppData["sectionList"])
        defaults.set(sectionIDs.map(String.init).joined(separator: "_"),
                     forKey: "IABGPP_HDR_Sections")

        if let gppString = gppData["gppString"] as? String {
            defaults.set(gppString, forKey: "IABGPP_HDR_GppString")

            // The encoded string is header~section~section, in sectionList order.
            let encodedSections = gppString.split(
                separator: "~",
                omittingEmptySubsequences: false
            ).dropFirst()
            for (sectionID, encodedSection) in zip(sectionIDs, encodedSections) {
                defaults.set(String(encodedSection), forKey: "IABGPP_\(sectionID)_String")
            }

            // Preserve the existing web-to-native round trip.
            defaults.set(gppString, forKey: "gppstring")
        }

        let applicableSections = integerArray(from: gppData["applicableSections"])
        defaults.set(applicableSections.map(String.init).joined(separator: "_"),
                     forKey: "IABGPP_GppSID")

        if let parsedSections = gppData["parsedSections"] as? [String: Any] {
            for (apiPrefix, section) in parsedSections {
                guard let inAppPrefix = inAppSectionPrefix(for: apiPrefix) else { continue }
                let segments = (section as? [[String: Any]])
                    ?? ((section as? [String: Any]).map { [$0] } ?? [])

                for segment in segments {
                    for (fieldName, value) in segment {
                        if let storedValue = inAppValue(value, fieldName: fieldName) {
                            defaults.set(
                                storedValue,
                                forKey: "IABGPP_\(inAppPrefix)_\(fieldName)"
                            )
                        }
                    }
                }
            }
        }

        // Retain the source object for app debugging; SDKs use IABGPP_* keys.
        saveJSONObject(gppData, forKey: "gppData")
    }

    /// Persists getInAppTCData using the IAB TCF v2 in-app key convention.
    private func saveInAppTCData(_ tcData: [String: Any]) {
        let defaults = UserDefaults.standard

        // Replace the complete snapshot so removed consent fields cannot survive.
        defaults.dictionaryRepresentation().keys
            .filter { $0.hasPrefix("IABTCF_") }
            .forEach { defaults.removeObject(forKey: $0) }

        setTCFValue(tcData["cmpId"], forKey: "IABTCF_CmpSdkID")
        setTCFValue(tcData["cmpVersion"], forKey: "IABTCF_CmpSdkVersion")
        setTCFValue(tcData["tcfPolicyVersion"], forKey: "IABTCF_PolicyVersion")
        setTCFValue(tcData["gdprApplies"], forKey: "IABTCF_gdprApplies")
        setTCFValue(tcData["publisherCC"], forKey: "IABTCF_PublisherCC")
        setTCFValue(tcData["purposeOneTreatment"], forKey: "IABTCF_PurposeOneTreatment")
        setTCFValue(tcData["useNonStandardTexts"], forKey: "IABTCF_UseNonStandardTexts")
        setTCFValue(tcData["tcString"], forKey: "IABTCF_TCString")
        setTCFValue(
            tcData["specialFeatureOptins"] ?? tcData["specialFeatureOptIns"],
            forKey: "IABTCF_SpecialFeaturesOptIns"
        )

        if let purpose = tcData["purpose"] as? [String: Any] {
            setTCFValue(purpose["consents"], forKey: "IABTCF_PurposeConsents")
            setTCFValue(
                purpose["legitimateInterests"],
                forKey: "IABTCF_PurposeLegitimateInterests"
            )
        }

        if let vendor = tcData["vendor"] as? [String: Any] {
            setTCFValue(vendor["consents"], forKey: "IABTCF_VendorConsents")
            setTCFValue(
                vendor["legitimateInterests"],
                forKey: "IABTCF_VendorLegitimateInterests"
            )
            setTCFValue(
                vendor["disclosedVendors"]
                    ?? vendor["disclosed"]
                    ?? tcData["disclosedVendors"],
                forKey: "IABTCF_DisclosedVendors"
            )
        }

        if let publisher = tcData["publisher"] as? [String: Any] {
            setTCFValue(publisher["consents"], forKey: "IABTCF_PublisherConsent")
            setTCFValue(
                publisher["legitimateInterests"],
                forKey: "IABTCF_PublisherLegitimateInterests"
            )

            if let customPurpose = publisher["customPurpose"] as? [String: Any] {
                setTCFValue(
                    customPurpose["consents"],
                    forKey: "IABTCF_PublisherCustomPurposesConsents"
                )
                setTCFValue(
                    customPurpose["legitimateInterests"],
                    forKey: "IABTCF_PublisherCustomPurposesLegitimateInterests"
                )
            }

            if let restrictions = publisher["restrictions"] as? [String: Any] {
                for (purposeID, restriction) in restrictions {
                    setTCFValue(
                        restriction,
                        forKey: "IABTCF_PublisherRestrictions\(purposeID)"
                    )
                }
            }
        }

        // Retain the source object for app debugging; SDKs use IABTCF_* keys.
        saveJSONObject(tcData, forKey: "InAppTcData")
    }

    private func setTCFValue(_ value: Any?, forKey key: String) {
        guard let value else { return }

        if let number = value as? NSNumber {
            if CFGetTypeID(number) == CFBooleanGetTypeID() {
                UserDefaults.standard.set(number.boolValue ? 1 : 0, forKey: key)
            } else {
                UserDefaults.standard.set(number, forKey: key)
            }
        } else if let string = value as? String {
            UserDefaults.standard.set(string, forKey: key)
        }
    }

    private func integerArray(from value: Any?) -> [Int] {
        (value as? [Any])?.compactMap { ($0 as? NSNumber)?.intValue } ?? []
    }

    private func inAppSectionPrefix(for apiPrefix: String) -> String? {
        switch apiPrefix.lowercased() {
        case "tcfeuv2": return "TCFEU2"
        case "tcfcav1": return "TCFCA1"
        case "uspv1": return "USP1"
        case "usnat": return "USNAT"
        case "usca": return "USCA"
        case "usva": return "USVA"
        case "usco": return "USCO"
        case "usut": return "USUT"
        case "usct": return "USCT"
        case "usfl": return "USFL"
        case "usmt": return "USMT"
        case "usor": return "USOR"
        case "ustx": return "USTX"
        case "usde": return "USDE"
        case "usia": return "USIA"
        case "usne": return "USNE"
        case "usnh": return "USNH"
        case "usnj": return "USNJ"
        case "ustn": return "USTN"
        case "usmn": return "USMN"
        case "usmd": return "USMD"
        case "usin": return "USIN"
        case "usky": return "USKY"
        case "usri": return "USRI"
        default: return nil
        }
    }

    private func inAppValue(_ value: Any, fieldName: String) -> Any? {
        if let number = value as? NSNumber {
            if CFGetTypeID(number) == CFBooleanGetTypeID() {
                return number.boolValue ? 1 : 0
            }
            return number
        }

        if let string = value as? String {
            if fieldName == "Created" || fieldName == "LastUpdated",
               let date = ISO8601DateFormatter().date(from: string) {
                return Int(date.timeIntervalSince1970 * 1_000)
            }
            return string
        }

        if let values = value as? [Any] {
            let records = values.compactMap { item -> String? in
                guard let record = item as? [String: Any],
                      let id = record["id"] as? NSNumber,
                      let type = record["type"] as? NSNumber else { return nil }
                return "\(id.intValue):\(type.intValue)"
            }
            if records.count == values.count {
                return records.joined(separator: "_")
            }

            let scalars = values.compactMap { item -> String? in
                if let number = item as? NSNumber {
                    if CFGetTypeID(number) == CFBooleanGetTypeID() {
                        return number.boolValue ? "1" : "0"
                    }
                    return number.stringValue
                }
                return item as? String
            }
            if scalars.count == values.count {
                return scalars.joined(separator: "_")
            }
        }

        return nil
    }

  func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
    if message.name == "jsHandler",
       let json = message.body as? [String: Any],
       let event = json["event"] as? String {
        switch event {
        case "start":
            let cmpType = json["cmpType"] as? String ?? "unknown"
            let payload: [String: Any]

            switch cmpType {
            case "tcf":
                let tcString = UserDefaults.standard.string(forKey: "tcstring") ?? ""
                let nontcfdata = UserDefaults.standard.object(forKey: "nontcfdata") ?? []
                let acString = UserDefaults.standard.string(forKey: "acstring") ?? ""
                let gppString = UserDefaults.standard.string(forKey: "gppstring") ?? ""
                let googleConsents = UserDefaults.standard.object(forKey: "googleConsents") ?? [:]
                payload = [
                    "type": "cookieData",
                    "cmpType": cmpType,
                    "tcstring": tcString,
                    "nontcfdata": nontcfdata,
                    "acstring": acString,
                    "gppstring": gppString,
                    "googleConsents": googleConsents
                ]
            case "usprivacy":
                let gppString = UserDefaults.standard.string(forKey: "gppstring") ?? ""
                payload = [
                    "type": "cookieData",
                    "cmpType": cmpType,
                    "gppstring": gppString
                ]
            case "standard":
                let gcString = UserDefaults.standard.string(forKey: "gcstring") ?? ""
                payload = [
                    "type": "cookieData",
                    "cmpType": cmpType,
                    "gcString": gcString
                ]
            default:
                payload = [
                    "type": "cookieData",
                    "cmpType": cmpType
                ]
            }

            if let jsonData = try? JSONSerialization.data(withJSONObject: payload, options: []),
               let jsonString = String(data: jsonData, encoding: .utf8) {
                let js = "window.postMessage(\(jsonString), \"*\");true;"
                webView.evaluateJavaScript(js, completionHandler: nil)
            }

        case "save":
            // Persist fields according to the active CMP framework.
            let cmpType = json["cmpType"] as? String ?? "unknown"
            let bannerRequired = json["bannerRequired"] as? Bool ?? true
            if !bannerRequired {
                let receivedString =
                    (json["tcstring"] as? String) ??
                    (json["gppstring"] as? String) ??
                    (json["gcstring"] as? String) ??
                    "<empty>"
                showConsentReceivedAlert(cmpType: cmpType, receivedString: receivedString)
            }

            // GPP-enabled CMP types send a PingReturn object in gppData.
            if let gppData = json["gppData"] as? [String: Any] {
                saveGPPData(gppData)
            }

            // Lowercase inAppTCData is the canonical field emitted by Gravito.
            if cmpType == "tcf",
               let inAppTCData = json["inAppTCData"] as? [String: Any] {
                saveInAppTCData(inAppTCData)
            }

            switch cmpType {
                case "tcf":
                    if let tcString = json["tcstring"] as? String {
                        UserDefaults.standard.set(tcString, forKey: "tcstring")
                    }
                    if let nontcfdata = json["nontcfdata"], JSONSerialization.isValidJSONObject(nontcfdata) {
                        UserDefaults.standard.set(nontcfdata, forKey: "nontcfdata")
                    }
                    if let acString = json["acstring"] as? String {
                        UserDefaults.standard.set(acString, forKey: "acstring")
                    }
                    if let gppString = json["gppstring"] as? String {
                        UserDefaults.standard.set(gppString, forKey: "gppstring")
                    }
                    if let googleConsents = json["googleConsents"], JSONSerialization.isValidJSONObject(googleConsents) {
                        UserDefaults.standard.set(googleConsents, forKey: "googleConsents")
                    }
                    break
                case "usprivacy":
                    if let gppString = json["gppstring"] as? String {
                        UserDefaults.standard.set(gppString, forKey: "gppstring")
                    }
                     if let googleConsents = json["googleConsents"], JSONSerialization.isValidJSONObject(googleConsents) {
                        UserDefaults.standard.set(googleConsents, forKey: "googleConsents")
                    }
                    break
                case "standard":
                    if let gcString = json["gcstring"] as? String {
                        UserDefaults.standard.set(gcString, forKey: "gcstring")
                    }
                     if let googleConsents = json["googleConsents"], JSONSerialization.isValidJSONObject(googleConsents) {
                        UserDefaults.standard.set(googleConsents, forKey: "googleConsents")
                    }
                    break

            default:
                break
            }

        case "load":
           let cmpType = json["cmpType"] as? String ?? "unknown"
             print("Load event received for cmpType: \(cmpType)")
            // No additional handling is required for the load event in this implementation.
             break
        case "close":
            let cmpType = json["cmpType"] as? String ?? "unknown"
            print("Close event received for cmpType: \(cmpType)")
            // No additional handling is required for the close event in this implementation.
             break

        default:
            break
        }
    }
}
}
```

### 4. Configure The CMP URL

Use the hosted WebView URL pattern in production:

```text
https://{yourhostedwebveiewhtmlpath}?platform=ios&region={region}
```

During development, the host portion may point to a local server that is reachable from the simulator or device. Keep both `platform=ios` and the required `region` value, and configure platform transport security if the development server uses HTTP.

## iOS Developer Checklist

- Host the CMP HTML page and confirm it is reachable from the app.
- Enable WebView mode on the CMP framework in context: `gravito.config.cmp.tcf.core.isWebView = true` for `GPP + TCF`, or `gravito.config.cmp.usprivacy.core.isWebView = true` for `GPP + US Privacy`.
- Load `https://{yourhostedwebveiewhtmlpath}?platform=ios&region={region}`.
- Register the `WKScriptMessageHandler` bridge as `jsHandler`.
- Choose the framework data contract from `cmpType`: `tcf`, `usprivacy`, or `standard`.
- On `start`, send a `cookieData` message back to the CMP using the fields required by `cmpType`.
- On `save`, persist the payload fields required by `cmpType`.
- On TCF `save`, convert `inAppTCData` to the corresponding `IABTCF_*` values in `UserDefaults`.
- On GPP-enabled `save`, convert `gppData` to the corresponding `IABGPP_*` values in `UserDefaults`.
- Replace the complete IAB snapshot so removed consent signals and GPP sections do not leave stale keys.
- Verify that native third-party SDKs can read the standard IAB keys directly from `UserDefaults`.
- Verify first launch, returning user launch, save, reject all, close, and reopen preferences flows.

## Platform Implementations and Contract References

### React Native

React Native support uses `react-native-webview` for the CMP and `AsyncStorage` for the app-owned WebView round-trip payload. The CMP posts JSON strings through `window.ReactNativeWebView.postMessage(...)`; the app receives them through the WebView's `onMessage` callback and sends messages back by injecting `window.postMessage(...)`.

Install the required packages:

```bash
npm install react-native-webview @react-native-async-storage/async-storage
```

Platform query value:

```text
https://{yourhostedwebveiewhtmlpath}?platform=reactnative&region={region}
```

Native bridge:

```text
window.ReactNativeWebView.postMessage(...)
```

The React Native event names are `CMP-loaded`, `save`, `load`, and `close`. `CMP-loaded` is the React Native equivalent of the native iOS `start` event.

The supplied sample also recognizes `cmpType: "global"` for a Google-consent-only payload. Treat this as an optional deployment-specific extension; the core framework values documented by this guide remain `tcf`, `usprivacy`, and `standard`.

#### React Native Reference Implementation

The following component reflects the sample application flow. Replace the development URL and region before production use.

```jsx
import { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CMP_STORAGE_KEY = 'cmpdata';

export default function WebviewScreen({ navigation }) {
  const webViewRef = useRef(null);
  const [cmpData, setCmpData] = useState(null);
  const [storageLoaded, setStorageLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(CMP_STORAGE_KEY)
      .then(value => setCmpData(value ? JSON.parse(value) : null))
      .catch(error => console.warn('Unable to load CMP data', error))
      .finally(() => setStorageLoaded(true));
  }, []);

  function goBack() {
    navigation.pop();
  }

  function postToCmp(message) {
    const script = `window.postMessage(${JSON.stringify(message)}, "*");true;`;
    webViewRef.current?.injectJavaScript(script);
  }

  async function saveCmpSpecificData(cmpType, payload) {
    switch (cmpType) {
      case 'tcf':
        // The TCF save payload can contain:
        // {
        //   type: String,             // For example, "save".
        //   cmpType: "tcf",
        //   tcstring: String,         // Encoded TCF consent string.
        //   currentstate: Object,     // CMP state/configuration needed by vendors.
        //   nontcfdata: Object,       // Non-TCF consent-related data.
        //   configversion: String,    // CMP configuration version.
        //   tcstringversion: String,  // TCF string version.
        //   inAppTCData: Object,      // Pre-parsed consent data for native IAB storage.
        //   acstring: String,         // Google Additional Consent string, when enabled.
        //   isRejectAll: Boolean,     // Whether the user selected Reject All.
        //   googleConsents: Object,   // Google-formatted consent values.
        //   gppstring: String,        // GPP string when GPP is enabled.
        //   gppData: Object,          // GPP PingReturn data for native IAB storage.
        // }
        // AsyncStorage below is sufficient for the WebView round trip only.
        // For native advertising SDKs, persist inAppTCData and gppData using
        // the IAB native storage mappings described after this example.
        await AsyncStorage.setItem(CMP_STORAGE_KEY, JSON.stringify(payload));
        setCmpData(payload);
        break;
      case 'standard':
        // The Standard CMP save payload can contain:
        // {
        //   type: String,             // For example, "save".
        //   cmpType: "standard",
        //   gcstring: String,         // Encoded Gravito consent string.
        //   currentstate: Object,     // Current CMP state/configuration.
        //   configversion: String,    // CMP configuration version.
        //   googleConsents: Object,   // Google-formatted consent values.
        // }
        await AsyncStorage.setItem(CMP_STORAGE_KEY, JSON.stringify(payload));
        setCmpData(payload);
        break;
      case 'usprivacy':
        // The US Privacy save payload can contain:
        // {
        //   type: String,             // For example, "save".
        //   cmpType: "usprivacy",
        //   gppstring: String,        // Encoded GPP consent string.
        //   googleConsents: Object,   // Google-formatted consent values.
        //   bannerRequired: Boolean,  // Whether the CMP banner must be shown.
        //   gppData: Object,          // GPP PingReturn data for native IAB storage.
        // }
        await AsyncStorage.setItem(CMP_STORAGE_KEY, JSON.stringify(payload));
        setCmpData(payload);
        break;
      case 'global':
        // The optional Global save payload can contain:
        // {
        //   type: String,             // For example, "save".
        //   cmpType: "global",
        //   googleConsents: Object,   // Google-formatted consent values.
        //   bannerRequired: Boolean,  // Whether the CMP banner must be shown.
        // }
        await AsyncStorage.setItem(CMP_STORAGE_KEY, JSON.stringify(payload));
        setCmpData(payload);
        break;
      default:
        console.warn(`Unsupported CMP type: ${cmpType}`);
    }
  }

  function cookieDataFor(cmpType) {
    switch (cmpType) {
      case 'tcf':
        return {
          type: 'cookieData',
          cmpType,
          tcstring: cmpData?.tcstring ?? '',
          nontcfdata: cmpData?.nontcfdata ?? [],
          acstring: cmpData?.acstring ?? '',
          gppstring: cmpData?.gppstring ?? '',
          googleConsents: cmpData?.googleConsents ?? {},
        };
      case 'usprivacy':
        return {
          type: 'cookieData',
          cmpType,
          gppstring: cmpData?.gppstring ?? '',
        };
      case 'standard':
        return {
          type: 'cookieData',
          cmpType,
          gcString: cmpData?.gcstring ?? '',
        };
      case 'global':
        return {
          type: 'cookieData',
          cmpType,
          googleConsents: cmpData?.googleConsents ?? {},
        };
      default:
        return { type: 'cookieData', cmpType };
    }
  }

  async function handleMessage(event) {
    let message;
    try {
      message = JSON.parse(event.nativeEvent.data);
    } catch (error) {
      console.warn('Ignoring invalid CMP message', error);
      return;
    }

    const { type, cmpType } = message;

    switch (type) {
      case 'CMP-loaded':
        // The CMP expects the app to answer with type: "cookieData" and the
        // stored fields for the active cmpType. On first launch, send empty
        // values in the same framework-specific shape.
        // Do not answer until the initial AsyncStorage read has completed.
        if (storageLoaded) postToCmp(cookieDataFor(cmpType));
        break;
      case 'save':
        await saveCmpSpecificData(cmpType, message);
        if (message.bannerRequired === false) {
          const receivedString =
            message.tcstring ??
            message.gppstring ??
            message.gcstring ??
            '<empty>';

          Alert.alert(
            'Consent Received',
            `bannerRequired=false\ncmpType=${cmpType}\nreceivedString=${receivedString}`,
            [{ text: 'OK', onPress: goBack }],
            { cancelable: false },
          );
        }
        break;
      case 'load':
        // The load event includes version/status information such as the CMP
        // configuration version and, where applicable, the TCF string version.
        console.log('CMP load event', message);
        break;
      case 'close':
        // Dismiss the screen or modal when the CMP asks the host app to close.
        goBack();
        break;
      default:
        console.warn(`Unsupported CMP event: ${type}`);
    }
  }

  const config = {
    type: 'config',
    backgroundColor: 'orange',
    logoUrl: 'https://cdn.gravito.net/logos/gravito_logo_white_background.png',
    displayPreferencesCloseBtn: true,
  };

  // Mount only after storage initialization so CMP-loaded cannot race it.
  if (!storageLoaded) return null;

  return (
    <WebView
      ref={webViewRef}
      source={{
        // Replace the placeholders with the hosted CMP HTML path and region.
        uri: 'https://{yourhostedwebveiewhtmlpath}?platform=reactnative&region={region}',
      }}
      startInLoadingState
      scalesPageToFit
      webviewDebuggingEnabled={__DEV__}
      onError={event => console.warn('CMP WebView error', event.nativeEvent)}
      onLoad={() => postToCmp(config)}
      onMessage={handleMessage}
    />
  );
}
```

The sample stores the complete last `save` payload under `cmpdata`, then derives a framework-specific `cookieData` response from it. This keeps the demo simple while ensuring that only fields relevant to the active `cmpType` are returned to the CMP. Production applications may store individual fields separately, but must preserve the framework contracts defined earlier in this guide.

The initial `AsyncStorage` read is asynchronous. Do not answer `CMP-loaded` before that read finishes, or a returning user can briefly be treated as a first-time user. The reference component avoids this race by mounting the WebView only after storage loads. An application that mounts it earlier must retain an early `CMP-loaded` event and send `cookieData` as soon as loading completes; simply ignoring the event assumes that the CMP will retry.

#### Native IAB Storage Requirement

`AsyncStorage` is application storage; native advertising SDKs do not read IAB consent keys from it. If the React Native app integrates SDKs that expect `IABTCF_*` or `IABGPP_*` values, add a native module (or another supported native persistence layer) that converts and writes `inAppTCData` and `gppData` to iOS `UserDefaults` and Android default `SharedPreferences`, using the mappings and conversions in the IAB Native Storage Payloads section. Replace the previous IAB snapshot when saving so removed consent values do not remain stale.

#### React Native Developer Checklist

- Install and link `react-native-webview` and `@react-native-async-storage/async-storage` as required by the React Native version.
- Load `https://{yourhostedwebveiewhtmlpath}?platform=reactnative&region={region}`.
- Parse `event.nativeEvent.data` defensively in `onMessage`.
- On `CMP-loaded`, send `cookieData` selected by the message's `cmpType` after stored data has loaded.
- On `save`, persist the framework payload and handle `bannerRequired: false` by closing or hiding the WebView after persistence.
- Handle `load` for diagnostics and `close` by dismissing the CMP screen.
- Enable `webviewDebuggingEnabled` only for development builds.
- Use HTTPS in production; a loopback development URL must be reachable from the simulator or device and permitted by the platform's network-security configuration.
- Add native IAB storage when native SDK interoperability is required; `AsyncStorage` alone is not sufficient.
- Test first launch, returning-user initialization, accept, reject all, close, preferences reopening, malformed bridge messages, and storage failures.

### Flutter

Flutter support uses `webview_flutter` for the CMP WebView, `FlutterAppWebView` as the JavaScript channel, and `shared_preferences` for the app-owned WebView round-trip payload.

#### Required Packages

Add the WebView and local-storage packages to the Flutter application:

```bash
flutter pub add webview_flutter webview_flutter_wkwebview shared_preferences
```

Platform query value:

```text
https://{yourhostedwebveiewhtmlpath}?platform=flutter&region={region}
```

JavaScript channel:

```text
FlutterAppWebView
```

The Flutter event names are `CMP-loaded`, `save`, `load`, and `close`. `CMP-loaded` is the Flutter equivalent of the native iOS `start` event.

The supplied sample also recognizes `cmpType: "global"` for a deployment-specific Google-consent-only flow. The core framework values remain `tcf`, `usprivacy`, and `standard`.

#### Flutter Reference Implementation

The following widget reflects the sample application flow. Replace the hosted CMP URL and region before production use.

```dart
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:webview_flutter_wkwebview/webview_flutter_wkwebview.dart';

const cmpStorageKey = 'cookieData';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(home: CmpWebView());
  }
}

class CmpWebView extends StatefulWidget {
  const CmpWebView({super.key});

  @override
  State<CmpWebView> createState() => _CmpWebViewState();
}

class _CmpWebViewState extends State<CmpWebView> {
  late final WebViewController controller;
  bool loading = true;

  @override
  void initState() {
    super.initState();

    final PlatformWebViewControllerCreationParams params =
        WebViewPlatform.instance is WebKitWebViewPlatform
            ? WebKitWebViewControllerCreationParams()
            : const PlatformWebViewControllerCreationParams();

    controller = WebViewController.fromPlatformCreationParams(params)
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(const Color(0x00000000))
      ..setNavigationDelegate(
        NavigationDelegate(
          onPageStarted: (_) {
            if (mounted) setState(() => loading = true);
          },
          onPageFinished: (_) {
            if (mounted) setState(() => loading = false);
          },
          onWebResourceError: (error) {
            debugPrint('CMP WebView load error: ${error.description}');
          },
        ),
      )
      ..addJavaScriptChannel(
        'FlutterAppWebView',
        onMessageReceived: _handleCmpMessage,
      )
      ..loadRequest(
        Uri.parse(
          'https://{yourhostedwebveiewhtmlpath}'
          '?platform=flutter&region={region}',
        ),
      );

    // Enable the Web Inspector for development builds as appropriate.
    if (controller.platform is WebKitWebViewController) {
      (controller.platform as WebKitWebViewController).setInspectable(true);
    }
  }

  Future<Map<String, dynamic>?> _readStoredData() async {
    final prefs = await SharedPreferences.getInstance();
    final encoded = prefs.getString(cmpStorageKey);
    if (encoded == null || encoded.isEmpty) return null;

    try {
      final decoded = jsonDecode(encoded);
      return decoded is Map<String, dynamic> ? decoded : null;
    } catch (error) {
      debugPrint('Ignoring invalid stored CMP data: $error');
      return null;
    }
  }

  Map<String, dynamic> _cookieDataFor(
    String cmpType,
    Map<String, dynamic>? storedData,
  ) {
    switch (cmpType) {
      case 'tcf':
        return {
          'type': 'cookieData',
          'cmpType': cmpType,
          'tcstring': storedData?['tcstring'] ?? '',
          'nontcfdata': storedData?['nontcfdata'] ?? <dynamic>[],
          'acstring': storedData?['acstring'] ?? '',
          'gppstring': storedData?['gppstring'] ?? '',
          'googleConsents': storedData?['googleConsents'] ?? <String, dynamic>{},
        };
      case 'standard':
        return {
          'type': 'cookieData',
          'cmpType': cmpType,
          'gcString': storedData?['gcstring'] ?? '',
        };
      case 'usprivacy':
        return {
          'type': 'cookieData',
          'cmpType': cmpType,
          'gppstring': storedData?['gppstring'] ?? '',
        };
      case 'global':
        return {
          'type': 'cookieData',
          'cmpType': cmpType,
          'googleConsents': storedData?['googleConsents'] ?? <String, dynamic>{},
        };
      default:
        return {'type': 'cookieData', 'cmpType': cmpType};
    }
  }

  Future<void> _postToCmp(Map<String, dynamic> payload) async {
    await controller.runJavaScript(
      'window.postMessage(${jsonEncode(payload)}, "*");',
    );
  }

  Future<void> _saveCmpData(
    String cmpType,
    Map<String, dynamic> message,
  ) async {
    late final Map<String, dynamic> data;

    switch (cmpType) {
      case 'tcf':
        data = {
          'tcstring': message['tcstring'],
          'nontcfdata': message['nontcfdata'],
          'acstring': message['acstring'],
          'gppstring': message['gppstring'],
          'googleConsents': message['googleConsents'],
        };
        break;
      case 'standard':
        data = {
          'gcstring': message['gcstring'],
          'googleConsents': message['googleConsents'],
        };
        break;
      case 'usprivacy':
        data = {
          'gppstring': message['gppstring'],
          'googleConsents': message['googleConsents'],
        };
        break;
      case 'global':
        data = {'googleConsents': message['googleConsents']};
        break;
      default:
        debugPrint('Unsupported CMP type: $cmpType');
        return;
    }

    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(cmpStorageKey, jsonEncode(data));

    // Production apps must additionally map message['inAppTCData'] and
    // message['gppData'] to native IAB storage when native SDKs consume them.
  }

  Future<void> _handleCmpMessage(JavaScriptMessage javaScriptMessage) async {
    Map<String, dynamic> message;
    try {
      final decoded = jsonDecode(javaScriptMessage.message);
      if (decoded is! Map<String, dynamic>) return;
      message = decoded;
    } catch (error) {
      debugPrint('Ignoring invalid CMP message: $error');
      return;
    }

    final type = message['type']?.toString() ?? '';
    final cmpType = message['cmpType']?.toString() ?? '';

    switch (type) {
      case 'CMP-loaded':
        final storedData = await _readStoredData();
        await _postToCmp(_cookieDataFor(cmpType, storedData));
        break;
      case 'save':
        await _saveCmpData(cmpType, message);
        if (message['bannerRequired'] == false && mounted) {
          final receivedString = message['tcstring'] ??
              message['gppstring'] ??
              message['gcstring'] ??
              '';
          await showDialog<void>(
            context: context,
            barrierDismissible: false,
            builder: (dialogContext) => AlertDialog(
              title: const Text('Consent Received'),
              content: Text(
                'bannerRequired=false\n'
                'cmpType=$cmpType\n'
                'receivedString=$receivedString',
              ),
              actions: [
                TextButton(
                  onPressed: () => Navigator.of(dialogContext).pop(),
                  child: const Text('OK'),
                ),
              ],
            ),
          );
        }
        break;
      case 'load':
        debugPrint('CMP load event: $message');
        break;
      case 'close':
        debugPrint('CMP requested close');
        break;
      default:
        debugPrint('Unsupported CMP event: $type');
    }
  }

  Future<void> _clearConsent() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(cmpStorageKey);
    await controller.reload();
  }

  Future<void> _openPreferences() async {
    await controller.runJavaScript('gravito.cmp.openPreferences();');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Gravito CMP'),
        actions: [
          IconButton(
            icon: const Icon(Icons.edit),
            tooltip: 'Open preferences',
            onPressed: _openPreferences,
          ),
          IconButton(
            icon: const Icon(Icons.delete),
            tooltip: 'Clear consent',
            onPressed: _clearConsent,
          ),
        ],
      ),
      body: Stack(
        children: [
          WebViewWidget(controller: controller),
          if (loading) const Center(child: CircularProgressIndicator()),
        ],
      ),
    );
  }
}
```

The example stores a framework-specific consent object as JSON under `cookieData`. On `CMP-loaded`, it reads that object and sends a `cookieData` message shaped for the active `cmpType`. On `save`, it persists the relevant fields before responding to `bannerRequired: false`. The preferences button calls `gravito.cmp.openPreferences()`, while the clear button removes the demo payload and reloads the WebView.

`SharedPreferences` is sufficient for the Gravito WebView round trip, but native advertising SDKs do not read IAB consent values from this app-owned JSON entry. If the Flutter application integrates SDKs that expect `IABTCF_*` or `IABGPP_*` values, add a Flutter plugin or platform channel that writes `inAppTCData` and `gppData` to iOS `UserDefaults` and Android default `SharedPreferences` using the mappings in the IAB Native Storage Payloads section. Replace the previous IAB snapshot when saving so removed values do not remain stale.

The example enables WebKit inspection unconditionally to match the supplied development sample. Restrict `setInspectable(true)` to non-production builds in a production application. Use HTTPS for the hosted CMP page; an HTTP development URL requires platform network-security exceptions and must be reachable from the simulator or device.

#### Flutter Developer Checklist

- Add `webview_flutter`, `webview_flutter_wkwebview`, and `shared_preferences`.
- Load `https://{yourhostedwebveiewhtmlpath}?platform=flutter&region={region}`.
- Register the JavaScript channel with the exact name `FlutterAppWebView`.
- Parse channel messages defensively and route them by both `type` and `cmpType`.
- On `CMP-loaded`, read stored data and send the framework-specific `cookieData` payload.
- On `save`, await persistence before closing or hiding the CMP, including when `bannerRequired` is `false`.
- Handle `load` for diagnostics and `close` according to the app's navigation model.
- Restrict WebView inspection and HTTP transport exceptions to development builds.
- Add native IAB storage through a plugin or platform channel when native SDK interoperability is required.
- Test first launch, returning-user initialization, accept, reject all, no-banner regions, close, preferences reopening, malformed bridge messages, and storage failures.

### Native Android

Use `WebView` with JavaScript enabled and register the native bridge object with `addJavascriptInterface`.

Platform query value:

```text
https://{yourhostedwebveiewhtmlpath}?platform=android&region={region}
```

JavaScript interface:

```text
AndroidAppWebView or AndroidInterface
```

The Android bridge receives CMP messages through the `getValueFromWebView(value: String)` JavaScript interface method. The CMP sends Android message names using the `type` key, for example `type: "save"`.

#### 1. Configure The WebView

Register the bridge name expected by the hosted CMP page. The exact interface name must match the JavaScript bridge contract configured in the CMP HTML.

```kotlin
val webView: WebView = findViewById(R.id.webView)
webView.settings.javaScriptEnabled = true
webView.addJavascriptInterface(WebAppInterface(this), "AndroidAppWebView")
webView.loadUrl("https://{yourhostedwebveiewhtmlpath}?platform=android&region={region}")
```

If the CMP page expects `AndroidInterface`, register the same implementation with that name instead:

```kotlin
webView.addJavascriptInterface(WebAppInterface(this), "AndroidInterface")
```

#### 2. Add The Native Android Bridge

The implementation stores consent values in `SharedPreferences`, routes `save` payloads by `cmpType`, and returns stored consent values to the CMP for the requested framework.

No native CMP SDK is embedded. Gravito’s web CMP sends `inAppTCData` and `gppData` in the `save` event, and `WebAppInterface` converts those objects into the standard Android IAB keys. The app uses two storage locations for different consumers:

- The app-specific `MYPREF` store holds Gravito’s `tcstring`, `acstring`, `gppstring`, `nontcfdata`, and `gcstring` values for the WebView round trip.
- Android’s default `SharedPreferences` holds `IABTCF_*` and `IABGPP_*` values for third-party native SDK interoperability, as required by the IAB in-app specifications.

Before saving a new native snapshot, the bridge removes the previous keys with the matching IAB prefix. `IABTCF_CmpSdkID` is written when valid `inAppTCData` is received; without an earlier CMP ID bridge payload, the WebView host cannot write it before that event.

```kotlin
package com.example.gravito_android_webview_sample

import android.app.Activity
import android.content.Context
import android.content.SharedPreferences
import android.util.Log
import android.webkit.JavascriptInterface
import android.widget.Toast
import org.json.JSONArray
import org.json.JSONException
import org.json.JSONObject
import java.text.SimpleDateFormat
import java.util.Locale

class WebAppInterface(private val context: Context) {
    private val sharedPreferences: SharedPreferences =
        context.getSharedPreferences("MYPREF", Context.MODE_PRIVATE)

    companion object {
        private const val TAG = "WebAppInterface"
        private const val TC_STRING = "TC_STRING"
        private const val AC_STRING = "AC_STRING"
        private const val GPP_STRING = "GPP_STRING"
        private const val NON_TCF_DATA = "NON_TCF_DATA"
        private const val GC_STRING = "GC_STRING"
        private const val IAB_GPP_PREFIX = "IABGPP_"
        private const val IAB_GPP_VERSION = "IABGPP_HDR_Version"
        private const val IAB_GPP_SECTIONS = "IABGPP_HDR_Sections"
        private const val IAB_GPP_STRING = "IABGPP_HDR_GppString"
        private const val IAB_GPP_SID = "IABGPP_GppSID"
        private const val IAB_TCF_PREFIX = "IABTCF_"
    }

    /** Show a toast from the web page */
    @JavascriptInterface
    fun showToast(toast: String) {
        Toast.makeText(context, toast, Toast.LENGTH_SHORT).show()
    }

    @JavascriptInterface
    fun getValueFromWebView(value: String) {
        try {
            val jsonObject = JSONObject(value)
            val type = jsonObject.optString("type")

            when (type) {
                "save" -> {
                    val cmpType = jsonObject.optString("cmpType")
                    val bannerRequired = jsonObject.optBoolean("bannerRequired", true)
                    val googleConsents = jsonObject.opt("googleConsents")
                    Log.d(TAG, "Banner required: $bannerRequired")
                    Log.d(TAG, "Google consents available in save payload: $googleConsents")

                    // Persist standardized GPP data whenever gppData is present.
                    saveGppData(jsonObject)

                    when (cmpType.lowercase()) {
                        "tcf" -> saveTcfData(jsonObject)
                        "usprivacy" -> saveUsPrivacyData(jsonObject)
                        "standard" -> saveStandardCMPData(jsonObject)
                        else -> Log.d(TAG, "Unknown cmpType: $cmpType. Save skipped.")
                    }

                    closeWebView()
                }
                "close" -> {
                    Log.d(TAG, "Handling close")
                }
                "load" -> {
                    Log.d(TAG, "Handling load")
                }
                else -> {
                    Log.d(TAG, "Unknown type: $type")
                }
            }
        } catch (e: JSONException) {
            Log.e(TAG, "Failed to parse JSON: ${e.message}")
        }
    }

    /** Retrieve value from SharedPreferences */
    @JavascriptInterface
    fun getValueFromStorage(): String {
        return getStoredValueForCmpType("tcf")
    }

    /** Retrieve value from SharedPreferences for the requested CMP type */
    @JavascriptInterface
    fun getValueFromStorage(cmpType: String): String {
        return getStoredValueForCmpType(cmpType.ifBlank { "tcf" })
    }

    private fun getStoredValueForCmpType(cmpType: String): String {
        try {
            val jsonObject = when (cmpType.lowercase()) {
                "tcf" -> getTcfStorageData()
                "usprivacy" -> getUsPrivacyStorageData()
                "standard" -> getStandardCMPStorageData()
                else -> {
                    Log.d(TAG, "Unknown cmpType: $cmpType. Returning empty storage payload.")
                    JSONObject()
                }
            }

            return jsonObject.toString()
        } catch (e: JSONException) {
            Log.e(TAG, "Failed to create JSON: ${e.message}")
            return "{}"
        }
    }

    private fun saveTcfData(jsonObject: JSONObject) {
        saveInAppTcData(jsonObject)

        sharedPreferences.edit()
            .putString(TC_STRING, jsonObject.optString("tcstring", ""))
            .putString(AC_STRING, jsonObject.optString("acstring", ""))
            .putString(GPP_STRING, jsonObject.optString("gppstring", ""))
            .putString(NON_TCF_DATA, jsonObject.optString("nontcfdata", ""))
            .apply()
    }

    private fun saveInAppTcData(jsonObject: JSONObject) {
        val tcData = jsonObject.optJSONObject("inAppTCData")
            ?: jsonObject.optJSONObject("InAppTcData")
            ?: return
        val preferences = getDefaultSharedPreferences()
        val editor = preferences.edit()

        // Prevent vendors from reading values left by an older TC string.
        preferences.all.keys
            .filter { it.startsWith(IAB_TCF_PREFIX) }
            .forEach(editor::remove)

        putTcfInt(editor, "IABTCF_CmpSdkID", tcData, "cmpId")
        putTcfInt(editor, "IABTCF_CmpSdkVersion", tcData, "cmpVersion")
        putTcfInt(editor, "IABTCF_PolicyVersion", tcData, "tcfPolicyVersion")
        putTcfInt(editor, "IABTCF_gdprApplies", tcData, "gdprApplies")
        putTcfInt(editor, "IABTCF_PurposeOneTreatment", tcData, "purposeOneTreatment")
        putTcfInt(editor, "IABTCF_UseNonStandardTexts", tcData, "useNonStandardTexts")
        putTcfString(editor, "IABTCF_PublisherCC", tcData, "publisherCC")
        putTcfString(editor, "IABTCF_TCString", tcData, "tcString")

        val purpose = tcData.optJSONObject("purpose")
        putTcfString(editor, "IABTCF_PurposeConsents", purpose, "consents")
        putTcfString(
            editor,
            "IABTCF_PurposeLegitimateInterests",
            purpose,
            "legitimateInterests"
        )

        val vendor = tcData.optJSONObject("vendor")
        putTcfString(editor, "IABTCF_VendorConsents", vendor, "consents")
        putTcfString(
            editor,
            "IABTCF_VendorLegitimateInterests",
            vendor,
            "legitimateInterests"
        )
        putTcfString(editor, "IABTCF_DisclosedVendors", vendor, "disclosedVendors")
        putTcfString(
            editor,
            "IABTCF_SpecialFeaturesOptIns",
            tcData,
            "specialFeatureOptins"
        )

        val publisher = tcData.optJSONObject("publisher")
        putTcfString(editor, "IABTCF_PublisherConsent", publisher, "consents")
        putTcfString(
            editor,
            "IABTCF_PublisherLegitimateInterests",
            publisher,
            "legitimateInterests"
        )

        val customPurpose = publisher?.optJSONObject("customPurpose")
        putTcfString(
            editor,
            "IABTCF_PublisherCustomPurposesConsents",
            customPurpose,
            "consents"
        )
        putTcfString(
            editor,
            "IABTCF_PublisherCustomPurposesLegitimateInterests",
            customPurpose,
            "legitimateInterests"
        )

        val restrictions = publisher?.optJSONObject("restrictions")
        if (restrictions != null) {
            for (purposeId in restrictions.keys()) {
                putTcfString(
                    editor,
                    "IABTCF_PublisherRestrictions$purposeId",
                    restrictions,
                    purposeId
                )
            }
        }

        editor.apply()
    }

    private fun putTcfInt(
        editor: SharedPreferences.Editor,
        preferenceKey: String,
        source: JSONObject,
        sourceKey: String
    ) {
        if (!source.has(sourceKey) || source.isNull(sourceKey)) return

        when (val value = source.opt(sourceKey)) {
            is Boolean -> editor.putInt(preferenceKey, if (value) 1 else 0)
            is Number -> editor.putInt(preferenceKey, value.toInt())
            is String -> value.toIntOrNull()?.let { editor.putInt(preferenceKey, it) }
        }
    }

    private fun putTcfString(
        editor: SharedPreferences.Editor,
        preferenceKey: String,
        source: JSONObject?,
        sourceKey: String
    ) {
        if (source == null || !source.has(sourceKey) || source.isNull(sourceKey)) return
        editor.putString(preferenceKey, source.optString(sourceKey))
    }

    private fun saveUsPrivacyData(jsonObject: JSONObject) {
        sharedPreferences.edit()
            .putString(GPP_STRING, jsonObject.optString("gppstring", ""))
            .apply()
    }

    private fun saveStandardCMPData(jsonObject: JSONObject) {
        sharedPreferences.edit()
            .putString(GC_STRING, jsonObject.optString("gcstring", ""))
            .apply()
    }

    private fun saveGppData(jsonObject: JSONObject) {
        val gppData = jsonObject.optJSONObject("gppData") ?: return
        val preferences = getDefaultSharedPreferences()
        val editor = preferences.edit()

        // Remove values from sections no longer present in the current GPP data.
        preferences.all.keys
            .filter { it.startsWith(IAB_GPP_PREFIX) }
            .forEach(editor::remove)

        editor.putString(IAB_GPP_VERSION, gppData.optString("gppVersion", ""))

        val sectionIds = gppData.optJSONArray("sectionList") ?: JSONArray()
        editor.putString(IAB_GPP_SECTIONS, joinJsonArray(sectionIds))
        editor.putString(
            IAB_GPP_SID,
            joinJsonArray(gppData.optJSONArray("applicableSections") ?: JSONArray())
        )

        val gppString = gppData.optString("gppString", "")
        editor.putString(IAB_GPP_STRING, gppString)
        saveEncodedSections(editor, sectionIds, gppString)
        saveParsedSections(editor, gppData)

        editor.apply()
    }

    @Suppress("DEPRECATION")
    private fun getDefaultSharedPreferences(): SharedPreferences =
        android.preference.PreferenceManager.getDefaultSharedPreferences(
            context.applicationContext
        )

    private fun saveEncodedSections(
        editor: SharedPreferences.Editor,
        sectionIds: JSONArray,
        gppString: String
    ) {
        val encodedSections = gppString.split('~').drop(1)
        for (index in 0 until minOf(sectionIds.length(), encodedSections.size)) {
            editor.putString(
                "${IAB_GPP_PREFIX}${sectionIds.optInt(index)}_String",
                encodedSections[index]
            )
        }
    }

    private fun saveParsedSections(
        editor: SharedPreferences.Editor,
        gppData: JSONObject
    ) {
        val parsedSections = gppData.optJSONObject("parsedSections") ?: return
        val sectionPrefixes = getSectionStoragePrefixes(gppData)

        for (apiPrefix in parsedSections.keys()) {
            val subsections = parsedSections.optJSONArray(apiPrefix) ?: continue
            val storagePrefix = sectionPrefixes[apiPrefix]
                ?: apiPrefix.replace(Regex("v(?=\\d)", RegexOption.IGNORE_CASE), "")
                    .uppercase(Locale.US)

            for (index in 0 until subsections.length()) {
                val subsection = subsections.optJSONObject(index) ?: continue
                for (fieldName in subsection.keys()) {
                    putGppValue(
                        editor,
                        "${IAB_GPP_PREFIX}${storagePrefix}_$fieldName",
                        fieldName,
                        subsection.opt(fieldName)
                    )
                }
            }
        }
    }

    private fun getSectionStoragePrefixes(gppData: JSONObject): Map<String, String> {
        val prefixes = mutableMapOf<String, String>()
        val supportedApis = gppData.optJSONArray("supportedAPIs") ?: return prefixes

        for (index in 0 until supportedApis.length()) {
            val apiPrefix = supportedApis.optString(index).substringAfter(':', "")
            if (apiPrefix.isNotEmpty()) {
                prefixes[apiPrefix] = apiPrefix
                    .replace(Regex("v(?=\\d)", RegexOption.IGNORE_CASE), "")
                    .uppercase(Locale.US)
            }
        }
        return prefixes
    }

    private fun putGppValue(
        editor: SharedPreferences.Editor,
        key: String,
        fieldName: String,
        value: Any?
    ) {
        when (value) {
            null, JSONObject.NULL -> Unit
            is Boolean -> editor.putInt(key, if (value) 1 else 0)
            is Byte, is Short, is Int -> editor.putInt(key, (value as Number).toInt())
            is Long -> {
                if (value in Int.MIN_VALUE.toLong()..Int.MAX_VALUE.toLong()) {
                    editor.putInt(key, value.toInt())
                } else {
                    editor.putLong(key, value)
                }
            }
            is Number -> editor.putInt(key, value.toInt())
            is String -> {
                val timestamp = parseGppDate(fieldName, value)
                if (timestamp != null) editor.putLong(key, timestamp)
                else editor.putString(key, value)
            }
            is JSONArray -> editor.putString(key, serializeGppArray(value))
            else -> Log.d(TAG, "Unsupported GPP value for $key: ${value.javaClass.simpleName}")
        }
    }

    private fun parseGppDate(fieldName: String, value: String): Long? {
        if (fieldName != "Created" && fieldName != "LastUpdated") return null

        return try {
            SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSX", Locale.US)
                .parse(value)?.time
        } catch (_: java.text.ParseException) {
            null
        }
    }

    private fun serializeGppArray(values: JSONArray): String {
        val serializedValues = mutableListOf<String>()
        for (index in 0 until values.length()) {
            val value = values.opt(index)
            serializedValues += when (value) {
                is JSONObject -> serializeRange(value)
                is Boolean -> if (value) "1" else "0"
                JSONObject.NULL, null -> continue
                else -> value.toString()
            }
        }
        return serializedValues.joinToString("_")
    }

    private fun serializeRange(value: JSONObject): String {
        val idKey = value.keys().asSequence().firstOrNull { it.equals("id", true) }
        val typeKey = value.keys().asSequence().firstOrNull { it.equals("type", true) }
        return if (idKey != null && typeKey != null) {
            "${value.opt(idKey)}:${value.opt(typeKey)}"
        } else {
            value.toString()
        }
    }

    private fun joinJsonArray(values: JSONArray): String {
        val result = mutableListOf<String>()
        for (index in 0 until values.length()) {
            if (!values.isNull(index)) result += values.opt(index).toString()
        }
        return result.joinToString("_")
    }

    private fun getTcfStorageData(): JSONObject {
        val jsonObject = JSONObject()
        jsonObject.put("tcstring", sharedPreferences.getString(TC_STRING, null))
        jsonObject.put("acstring", sharedPreferences.getString(AC_STRING, null))
        jsonObject.put("gppstring", sharedPreferences.getString(GPP_STRING, null))
        return jsonObject
    }

    private fun getUsPrivacyStorageData(): JSONObject {
        val jsonObject = JSONObject()
        jsonObject.put("gppstring", sharedPreferences.getString(GPP_STRING, null))
        return jsonObject
    }

    private fun getStandardCMPStorageData(): JSONObject {
        val jsonObject = JSONObject()
        jsonObject.put("gcstring", sharedPreferences.getString(GC_STRING, null))
        return jsonObject
    }

    private fun closeWebView() {
        val activity = context as? Activity
        if (activity == null) {
            Log.d(TAG, "Unable to close WebView. Context is not an Activity.")
            return
        }

        activity.runOnUiThread {
            activity.finish()
        }
    }

    /** Handle button click from WebView */
    @JavascriptInterface
    fun onButtonClick() {
        // Add your button click logic here.
    }
}
```

#### 3. Android Developer Checklist

- Host the CMP HTML page and confirm it is reachable from the app.
- Enable WebView mode on the CMP framework in context: `gravito.config.cmp.tcf.core.isWebView = true` for `GPP + TCF`, or `gravito.config.cmp.usprivacy.core.isWebView = true` for `GPP + US Privacy`.
- Load `https://{yourhostedwebveiewhtmlpath}?platform=android&region={region}`.
- Register the JavaScript interface name expected by the CMP page, such as `AndroidAppWebView` or `AndroidInterface`.
- Choose the framework data contract from `cmpType`: `tcf`, `usprivacy`, or `standard`.
- On `save`, persist the payload fields required by `cmpType`.
- On TCF `save`, convert `inAppTCData` to `IABTCF_*` values in Android's default `SharedPreferences`.
- On GPP-enabled `save`, convert `gppData` to the header, encoded-section, applicable-section, and parsed-section `IABGPP_*` values in default `SharedPreferences`.
- Keep the app-specific Gravito round-trip values separate from the standardized default preference store used by native SDKs.
- Replace the complete matching IAB snapshot so removed consent signals and GPP sections do not leave stale keys.
- On `getValueFromStorage`, return stored consent fields for the requested `cmpType`.
- Verify that third-party native SDKs can read the standard IAB keys from default `SharedPreferences`.
- Verify first launch, returning user launch, save, reject all, close, and reopen preferences flows.

## Implementation Notes

- Bridge names are case-sensitive.
- Native iOS receives CMP messages with `event`, for example `event: "start"` and `event: "save"`.
- Native iOS sends `cookieData` back into the WebView with `type: "cookieData"`.
- React Native, Flutter, and native Android use `type` as the message name key in their bridge payloads.
- The CMP sends `cmpType` with each event so the app can route storage by framework.
- Gravito emits the canonical lowercase `inAppTCData` field on TCF save events and `gppData` on GPP-enabled save events.
- Native iOS stores the supplied pre-parsed values in standard `IABTCF_*` and `IABGPP_*` `UserDefaults` keys so third-party native SDKs can consume them without decoding the consent strings.
- Native Android stores the supplied pre-parsed values in standard `IABTCF_*` and `IABGPP_*` keys in default `SharedPreferences`; Gravito's WebView round-trip strings remain in the app-specific preference store.
- For `cmpType=tcf`, store and return `tcstring`, `nontcfdata`, `acstring`, `gppstring`, and `googleConsents` when present.
- For `cmpType=usprivacy`, store and return `gppstring`, and store `googleConsents` when present.
- For `cmpType=standard`, store and return `gcstring`, and store `googleConsents` when present.
- Production apps may wrap storage in an app-specific consent repository or secure storage layer if required by the host app architecture.
