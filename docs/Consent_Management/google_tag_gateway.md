# Google Tag Gateway (GTG) Compatibility

## Overview

Gravito Consent Management Platform supports Google Consent Mode and is compatible with GTG implementations when configured correctly.

---

## How GTG Changes Tag Loading

In a traditional Google tag implementation, the loading sequence usually looks like:
```
User visits website
    │
    ▼
Gravito CMP loads
    │
    ▼
Consent Mode default command is set
    │
    ▼
Google tags load
    │
    ▼
User interacts with banner
    │
    ▼
Consent Mode update command is sent
```

The Google tag receives the consent state before processing measurement.

---

With Google Tag Gateway, tags may be served through the customer's infrastructure:
```
User visits website
    │
    ▼
Customer CDN / GTG gateway
    │
    ├── Gravito CMP (loads first → fires consent default)
    │
    └── Google tags (load after consent default is in place)
    │
    ▼
Google tags initialize already in cookieless mode — consent state applied correctly
```

Because the Google tag can appear as a first-party script, traditional script blocking approaches may not prevent the tag from loading before the CMP.

---

## Why Consent Timing Matters

Google Consent Mode requires Google tags to know the consent state before processing data.

A correct implementation should ensure:

1. Consent Mode default command is available before Google tags execute.
2. Consent Mode update command is sent whenever the user changes consent.

Example:

Initial page load:

```javascript
    gtag('consent', 'default', {
        ad_storage: 'denied',
        analytics_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        functionality_storage: 'denied',
        personalization_storage: 'denied',
        security_storage: 'granted'   // always granted
    });
```

After user grants consent:

```javascript
    gtag('consent', 'update', {
        ad_storage: 'granted',
        analytics_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted'
        functionality_storage: 'granted',
        personalization_storage: 'granted',
        security_storage: 'granted'   // always granted
    });
```

# Detecting Late Consent

A consent signal is considered late when Google tags initialize before receiving a Consent Mode default signal.

## Possible symptoms:

Consent Mode debugger reports late consent.
Google tags execute before CMP initialization.
Measurement behavior differs from expected consent configuration.

Gravito recommends verifying the loading order whenever late consent is reported.

## Checking Google Tag Gateway Status

Gravito does not require automatic GTG detection.

Customers can verify GTG status from Google Tag Manager:

1. Open Google Tag Manager.
2. Go to Admin.
3. Open Google Tag Gateway settings.
4. Check whether GTG is enabled for the relevant domain.

## Resolving Late Consent Issues

If GTG is enabled and consent is detected as late, customers should ensure that consent defaults are available before Google tags load.

Recommended approaches:

### Option 1: Configure Consent Defaults Before Tag Execution

Ensure the Consent Mode default command executes before GTG-served Google tags.

Example:
```
Consent Mode default
    │
    ▼
Google Tag Gateway
    │
    ▼
Google tags
```

### Option 2: Use Advanced Consent Mode

Advanced Consent Mode allows Google tags to load while respecting the consent state.

The recommended flow:
```
Gravito fires consent default (all denied)
    │
    ▼
Google tags load → start in cookieless mode (no cookies, no user IDs)
    │
    ▼
User interacts with banner
    │
    ▼
Gravito fires consent update → tags switch to full or remain denied
```

This allows Google tags to adjust measurement behavior based on the user's consent choice.

### Option 3: Manage Consent Defaults in Google Tag Manager

Customers can configure consent defaults using Google Tag Manager settings.

This ensures a consent state exists before GTG-served tags execute.

## Gravito Integration Notes

Gravito CMP:

- Supports Google Consent Mode.
- Sends Consent Mode default and update signals based on user consent.
- Supports Consent Mode v2 signals:
    - ad_storage
    - analytics_storage
    - ad_user_data
    - ad_personalization
    - functionality_storage
    - personalization_storage
    - security_storage:

For best results:

- Load Gravito CMP before Google tags where possible.
- Ensure Consent Mode defaults are configured before measurement tags execute.
- Verify GTG configuration if late consent issues appear.

## Additional Resources
- [Google Consent Mode documentation](https://developers.google.com/tag-platform/security/guides/consent)
- [Google Tag Gateway documentation](https://developers.google.com/tag-platform/tag-manager/gateway)
- [Google Tag Manager consent settings documentation](https://support.google.com/tagmanager/answer/10718549)