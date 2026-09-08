---
name: Institutional Blueprints
colors:
  surface: '#fbf9fb'
  surface-dim: '#dbd9dc'
  surface-bright: '#fbf9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f5'
  surface-container: '#efedf0'
  surface-container-high: '#e9e7ea'
  surface-container-highest: '#e4e2e4'
  on-surface: '#1b1b1e'
  on-surface-variant: '#44474d'
  inverse-surface: '#303032'
  inverse-on-surface: '#f2f0f3'
  outline: '#75777e'
  outline-variant: '#c5c6ce'
  surface-tint: '#4e5f7c'
  primary: '#00030a'
  on-primary: '#ffffff'
  primary-container: '#0a1d37'
  on-primary-container: '#7586a5'
  inverse-primary: '#b6c7e9'
  secondary: '#b52424'
  on-secondary: '#ffffff'
  secondary-container: '#ff5a52'
  on-secondary-container: '#600006'
  tertiary: '#070200'
  on-tertiary: '#ffffff'
  tertiary-container: '#301700'
  on-tertiary-container: '#a67d59'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#b6c7e9'
  on-primary-fixed: '#081c36'
  on-primary-fixed-variant: '#364763'
  secondary-fixed: '#ffdad6'
  secondary-fixed-dim: '#ffb4ac'
  on-secondary-fixed: '#410003'
  on-secondary-fixed-variant: '#92030f'
  tertiary-fixed: '#ffdcc0'
  tertiary-fixed-dim: '#edbd95'
  on-tertiary-fixed: '#2e1600'
  on-tertiary-fixed-variant: '#604021'
  background: '#fbf9fb'
  on-background: '#1b1b1e'
  surface-variant: '#e4e2e4'
  institutional-navy: '#3E0C0F'
  heritage-red: '#B22222'
  slate-text: '#2D3748'
  border-light: '#E2E8F0'
typography:
  display-lg:
    fontFamily: IBM Plex Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: IBM Plex Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: IBM Plex Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: IBM Plex Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: IBM Plex Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: IBM Plex Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: IBM Plex Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  caption:
    fontFamily: IBM Plex Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter-desktop: 32px
  margin-desktop: 80px
  gutter-mobile: 16px
  margin-mobile: 20px
  container-max-width: 1200px
---

## Brand & Style

This design system is anchored in the principles of **Corporate Modernism**, evoking unwavering stability, technical precision, and institutional trust. By inverting the traditional legacy roles, the aesthetic shifts toward a more "Security-First" posture, where deep blue tones establish a foundation of reliability, while red accents provide a sharp, executive-level focus on critical information and action.

The target audience consists of executives, legal entities, and organizational leaders who require clear, authoritative, and confidential services. The interface prioritizes an "Information-First" approach, utilizing generous whitespace and a rigid grid system to reflect a 25-year history of professional ethics and meticulous auditing.

## Colors

The palette is led by **Institutional Navy**, which now serves as the primary driver for brand identity and high-level interaction. **Heritage Red** is redefined as the secondary accent color, used purposefully to draw attention to specific milestones, alerts, or refined call-to-actions.

- **Primary (Institutional Navy):** The core of the system. Used for primary buttons, active navigation states, and foundational headers to establish "Institutional Weight."
- **Secondary (Heritage Red):** Utilized as a strategic highlight for secondary actions, accent borders, and brand-specific indicators.
- **Neutral Scale:** A range of cool grays provides a clean backdrop, ensuring complex financial data remains the focus without visual fatigue.

## Typography

The typography system utilizes **IBM Plex Sans**, a typeface that marries humanistic professional ethics with technical auditing precision. 

- **Hierarchy:** Dramatic scale differences between headlines and body text emphasize the information hierarchy required for complex service descriptions.
- **Weights:** Semi-Bold weights are reserved for labels and subheaders to ensure clarity in dense information environments.
- **Readability:** Body text uses a 1.5x line height to facilitate the reading of long-form consultancy content and mission statements.

## Layout & Spacing

The design system employs a **Fixed Grid** model for desktop to maintain the structured feel of an official report, transitioning to a fluid model for mobile devices.

- **Grid:** A 12-column grid is used for desktop (max-width 1200px).
- **Rhythm:** An 8px linear scale (2x spacing units) governs all padding and margins, ensuring vertical rhythm across sections like "Services" and "Our History."
- **Sectioning:** Large vertical blocks (80px - 120px) separate major content areas to prevent visual crowding and reflect an air of "Executive Space."

## Elevation & Depth

To maintain a formal and authoritative presence, the design system utilizes **Tonal Layers** and **Low-contrast Outlines** rather than aggressive shadows.

- **Surfaces:** Primary content sits on a pure white surface. Secondary information, such as sidebars or "Time Line" backgrounds, uses a subtle Light Gray (#f7fafc) to create depth.
- **Dividers:** Horizontal hair-lines (1px) in `border-light` separate list items and form sections, reinforcing the "Audit Report" aesthetic.
- **Interactive Depth:** Subtle, highly-diffused shadows (5-8% opacity) are reserved exclusively for cards or elevated state elements to provide minimal tactile feedback without breaking the professional plane.

## Shapes

The shape language is **Soft**. This slight rounding (0.25rem) provides a contemporary touch to an otherwise rigid corporate structure, making the interface feel accessible without losing its professional edge.

- **Inputs & Buttons:** Follow the base 4px (0.25rem) radius for a precise, "machined" look.
- **Image Containers:** Use sharp or base-rounded corners to maintain a "Documentary" or photographic feel.
- **Geometric Rigor:** Decorative elements use strictly geometric forms to align with the firm's focus on logic and precision.

## Components

- **Buttons:** Primary buttons use a solid `institutional-navy` background with white text. Secondary buttons use `heritage-red` outlines or text to signify distinctive secondary actions.
- **Input Fields:** Characterized by 1px `border-light` outlines. Active/Focus states transition the border to `institutional-navy`. Labels are placed above the field in `label-md` style.
- **Cards (Services):** Utilize a flat layout with a subtle `border-light` and a top-accent border of 4px in `institutional-navy` to ground the service offerings.
- **Time Line:** A custom horizontal component utilizing `institutional-navy` for the primary path, with `heritage-red` markers to highlight the 25-year trajectory and key milestones of the firm.
- **Contact Form:** Structured in a clear, single-column layout for mobile and two-column for desktop, emphasizing clarity and ease of communication for prospective high-level clients.