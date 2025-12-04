# Release Notes

Stay up to date with our latest releases!

Gravito’s release notes are generally divided as different category as development happens constantly under all categories. You can jump to specific release notes here

- [Gravito CMP](https://docs.gravito.net/Gravito_V6_CMP/Release_Notes/) <mark>Latest</mark>
- [Gravito SDK](https://docs.gravito.net/Gravito_SDK/Release_Notes/)
- Gravito Intelligent CMP (Older version, to be deprecated) (Please contact Gravito Support)
- Gravito TCF 2.2 CMP (Older version, to be deprecated) (Please contact Gravito Support)


Here you can find more about the general product updates

## Product Release notes :

## Release notes: Sprint 82 - 02/12/2025 <mark>New</mark>

- Gravito CMP configurator preview now opens in a separate browser tab keeping the configurator visible all the time. You can now modify you configuration & styling and see the preview update side-by-side in real-time. See [Detailed CMP preview guide](../Gravito_V6_CMP//Components/preview.md)

## Release notes: Sprint 82 - 19/09/2025

- New analytics containing overview of account & domain status has been added to dashboard.
- Charts in **CMP Statistics** of dashboard are now refined to show deeper insights.
- Upgraded **Consent statistics** in Reports section to view domain wise and browser wise consent data.
- Added new GCM V2 consent related options in Gravito CMP V6 configurator.

## Release notes: Sprint 81 - 10/06/2025

- Latest version of Gravito CMP and its **modular Configurator**. This is the latest version of Gravito and is a powerful, new tool from Gravito designed for ultimate customizability and flexibility. It provides a single, consistent setup-to-deployment process for all CMP frameworks, making consent management smoother than ever! 
  - Existing versions of CMP will continue to function.
- Possibility of Custom Tabs on the CMP.

## Release notes: Sprint 80 - 06/05/2025 

- Added support for Microsoft's universal Tracking (UET) and GCM V2 Basic/Advanced setup in the Gravito Intelligent and TCF CMP configurator.
- UI improvements in PRO CMP configurator for better user experience.

## Release notes: Sprint 79 - 15/04/2025

- Added GCM-V2 default setup for Gravito CMP, TCF CMP & Pro Gravito CMP in their respective configurators.
- Improved Reporting UI for better user experience and accurate data representation.

## Release notes: Sprint 78 - 22/01/2025

In the latest version , based on feedback collected from our customers we have modified some of the names and order of options in the configurator to keep things more understandable.

_Gravito CMP Configurator:_

- The step names in configurator are changed as follows to better describe its purpose
  - Core => Consent Categories
  - Text => Banner Content
  - style => Appearance
- A new validation layer has been added which checks config for mandatory values and validity of privacy URL. It also displays report of errors found along with their location.
- The sequence "Consent Categories" & "Setting" section has been changed along with their internal order keeping in mind the practicality of its occurrence.
- Some user irrelevant configurations have been removed or placed under advance section to reduce complexity & confusion.

_TCF CMP Configurator:_

- The step names in configurator are changes as follows to better describe its purpose
  - Core => TCF Settings
  - Text => Banner Content
  - style => Appearance
- A new validation layer has been added which checks config for mandatory values and validity of privacy URL. It also displays report of errors found along with their location.
- The sequence "TCF Settings" & "Setting" section has been changed along with their internal order keeping in mind the practicality of its occurrence
- Some user irrelevant configurations have been removed or placed under advance section to reduce complexity & confusion.

_Manage Cookie Scan:_

- Added new manage cookie scan feature to check and correct cookies found during scan. Also a user can add or remove domains where cookie scan has to be performed.
- user can also add new cookies manually in the database. These cookies will be displayed under the consents based on their category.

## Release notes: Sprint 77 - 13/08/2024

- Generate and manage Data Access tokens (in Manage Account section)
- Optimization and refactoring in Gravito & TCF CMP Configurator
- Removed the customer admin checkbox option (user will be always accepted as customer admin)
- Support for Dutch translations in TCF configurator.
- Cookie disclaimers can now be added to each of the Non-TCF Vendor via TCF Configurator.
- Configurations related to Pixel Requests section on cookie report layer can now be configured using TCF configurator.
- Both TCF and Gravito configurator are now setup to create V5 configs that use SDK version 3.

## Release notes: Sprint 76 - 12/06/2024

- Dashboard charts are now split into 2 sections ie. "Visitor Statistics" & "CMP Statistics".
- Browser and Domain table merged to show domain specific browser statistics in reporting.
- newly added Firstparty & device statistics for dashboard and compare trends
- Renaming and beaytification of dashboard content.
- Domain group creation and management feature has been added.
- Domain group selector/filter for dashboard & reporting.
- "Guide Me" documentation upgradation.
- Bug fixes & Optimization changes.

## Release Notes : Sprint 75 (10/04/2024)

- Domain Grouping: To see stats of a group of domains. For. eg. Publisher groups.

  - Available Under Domain -> Manage Domain groups
  - Allows you to manage different domain groups with overlap of domains
  - Available for selection under Dashboard and Compare trends.

- 📅 Date-wise filter

  - Dashboard
  - Compare trends
  - Reporting section “Consent Data”

- Added note stating that reporting data is from past 60 days
- Unnecessary app bar options and filters are removed in CMP(TCF & Gravito) configurator section.
- Removed ledger tab in reporting section. (As Obsolete data)
- Changed names of tabs in reporting section

  - Have renamed to First Party and Third party context data
  - ℹ Added tool tip for sub-tabs containing some helper text.

- Other smaller bug fixes and minor improvements

## Release Notes: Sprint 74 (26/03/2024)

- Support for German and Polish Language in Gravito Intelligent CMP
- Bug fixes and minor enhancements
