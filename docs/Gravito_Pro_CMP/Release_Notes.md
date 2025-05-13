# PRO CMP  Release Notes

Gravito Pro CMP release notes.

# Gravito PRO CMP – Release Notes (v1.0.6)

Release date 25/03/2025

This is a maintenance release focused on internal improvements.

## Internal Fixes

- **Internal Bug Fixes**:  
  Addressed several internal bugs and code-level inconsistencies to improve stability and maintainability of the PRO CMP codebase.

> No changes or feature additions for customers in this release.

---
# Gravito PRO CMP – Release Notes (v1.0.5)


Release date 18/03/2025

This release focuses on improving the reliability of the Cookie Report fetching mechanism.

## Bug Fix / Enhancement

- **Improved Referrer Domain Evaluation for Cookie Report**:  
  The logic used to evaluate the referring domain for fetching the Cookie Report has been updated.  
  The previous approach was causing issues in certain edge cases, leading to inaccurate or failed report retrievals.  
  The new logic ensures better accuracy and compatibility across different integration scenarios and referrer setups.

---

# Gravito PRO CMP – Release Notes (v1.0.4)

rendering across key CMP components.
Release date 06/03/2025

This release includes enhancements to layout structure and flexibility in content 

## Enhancements

- **Improved Description Layout in Details Component**:  
  The description content in the Details component is now wrapped inside a dedicated `<div>` for better structure and styling. This change helps maintain consistent spacing and alignment across varying content lengths.

- **Legal Footer and Description Support HTML Rendering**:  
  - The **Declaration (Layer 1)** and **Details (Layer 2)** layers now support **HTML rendering** for the legal footer and description fields.
  - Customers can now directly use HTML content within the configuration to style or structure legal text as needed.
  - This brings greater flexibility and control over how legal and consent-related information is presented to users.

---

# Gravito PRO CMP – Release Notes (v1.0.3)
Release date 05/03/2025
This release simplifies user interaction within the CMP by removing redundant UI elements that could hinder the user experience.

## Improvements

- **Removed Confirmation Modals for Key Actions**:  
  The confirmation modals shown on **Rejection** and **Save** actions in both **Declaration (Layer 1)** and **Details (Layer 2)** have been removed.  
  These modals were identified as unnecessary and potentially disruptive to the consent flow. The removal streamlines user experience by reducing extra clicks and interruptions.

---


# Gravito PRO CMP – Release Notes (v1.0.2)
Release date 04/03/2025

This release includes  new features to enhance the functionality and usability of the Gravito PRO CMP.

## New Features

- **Accessibility Compliance**:  
  PRO CMP is now aligned with accessibility standards. This includes proper ARIA attributes, keyboard navigation support, and screen reader compatibility, making the CMP more inclusive for all users.

- **Focus Management in Modal**:  
  Implemented improved focus management for modals. When a modal is opened, keyboard focus is now trapped within the modal and returned to the trigger element upon close, ensuring a better and more predictable interaction flow.

---

# Gravito PRO CMP – Release Notes (v1.0.1)
Release date 03/03/2025

This release includes several bug fixes and new features to enhance the functionality and usability of the Gravito PRO CMP.

## Bug Fixes

- **Cookie Report Rendering Issue**:  
  Resolved a bug that caused incorrect or incomplete rendering of the cookie report in certain configurations. This fix ensures accurate and consistent generation of the cookie report across supported environments.

## New Features

- **Multi-language Support in Cookie Report**:  
  The cookie report can now be displayed in multiple languages. This enhancement allows region-specific or user-preferred language versions of the cookie report, improving user experience and regulatory compliance.

- **Preview Mode for Cookie Report**:  
  Introduced a new internal-use-only **Preview mode** for the cookie report. This feature is accessible through the Admin Portal and is designed to provide a preview of the cookie report before it goes live. It allows for testing and validation of the report's content layout, ensuring that it meets the desired standards before being made available to end-users.

---




# Gravito PRO CMP – Release Notes (v1.0.0)

Release date 20/02/2025

We are pleased to announce the first official release of **Gravito PRO CMP** – a modern, high-performance Consent Management Platform designed for flexibility, performance, and regulatory compliance.

## What's New

### PRO CMP – A New Flavor of Gravito CMP
This is the initial release of **Gravito PRO CMP**, a newly developed variant of our CMP platform. It is built using **Preact**, a lightweight alternative to React, offering improved performance and reduced bundle size.

### Support for Gravito Intelligent CMP
Gravito PRO CMP supports the **Gravito Intelligent CMP** – a flexible consent mechanism suitable for various use cases outside of the TCF framework.

> **Note:** The **TCF CMP component is not yet supported in version 1.0.0**, but will be included in upcoming releases.

### Lazy Loading for Better Performance
PRO CMP includes **lazy loading**, reducing the initial load size of CMP bundles. This leads to faster page loads and a smoother user experience.

### Enhanced Tab-Based Layout
The new **tab-based layout** improves usability and consent navigation. Users can now switch easily between different layers and settings, resulting in a more intuitive and efficient consent flow.

---

