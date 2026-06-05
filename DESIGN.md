---
name: Cyan Edition
colors:
  surface: '#10131c'
  surface-dim: '#10131c'
  surface-bright: '#353943'
  surface-container-lowest: '#0a0e16'
  surface-container-low: '#181c24'
  surface-container: '#1c2028'
  surface-container-high: '#262a33'
  surface-container-highest: '#31353e'
  on-surface: '#e0e2ee'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#e0e2ee'
  inverse-on-surface: '#2d303a'
  outline: '#849495'
  outline-variant: '#3a494b'
  surface-tint: '#00dbe7'
  primary: '#e1fdff'
  on-primary: '#00363a'
  primary-container: '#00f2ff'
  on-primary-container: '#006a71'
  inverse-primary: '#00696f'
  secondary: '#bac3ff'
  on-secondary: '#00208f'
  secondary-container: '#003ffd'
  on-secondary-container: '#ccd2ff'
  tertiary: '#fff6e4'
  on-tertiary: '#3b2f00'
  tertiary-container: '#fed83a'
  on-tertiary-container: '#725e00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#74f5ff'
  primary-fixed-dim: '#00dbe7'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#dee0ff'
  secondary-fixed-dim: '#bac3ff'
  on-secondary-fixed: '#00115a'
  on-secondary-fixed-variant: '#0030c7'
  tertiary-fixed: '#ffe173'
  tertiary-fixed-dim: '#e8c423'
  on-tertiary-fixed: '#221b00'
  on-tertiary-fixed-variant: '#554500'
  background: '#10131c'
  on-background: '#e0e2ee'
  surface-variant: '#31353e'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 72px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Sora
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Sora
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

The visual identity of the design system is anchored in the concept of "Digital Velocity." It captures the high-octane energy of global football through a futuristic, high-tech lens. The aesthetic is built to feel like a premium digital broadcast from the year 2026—crisp, luminous, and immersive.

This design system employs a **Neon-Modern** style. It leverages the depth of a near-black void to make high-vibrancy accents feel like light emissions rather than mere colors. The experience should evoke the feeling of a night-time stadium under advanced LED illumination: professional and elite, yet pulsing with technological excitement.

## Colors

The palette is dominated by the contrast between absolute depth and electric luminescence. 

- **Primary (Electric Cyan):** Used for critical actions, active states, and branding elements. It should be treated as a light source.
- **Secondary (Vivid Blue):** Provides structural support to the primary cyan, used for secondary actions and data visualization.
- **Neutral (Dark Navy):** The foundation. All surfaces utilize this deep, matte navy to ensure the neon elements remain legible and impactful without causing eye strain.

Surface colors should be derived from the Neutral hex with varying levels of opacity to create a sense of layered glass.

## Typography

Typography in this design system is built for impact and clarity. 

**Sora** is the display powerhouse. Its wide, geometric stance feels architectural and futuristic. Use it for scores, player names, and major headings. For maximum "tech" feel, use the ExtraBold weight with tight tracking on larger sizes.

**Plus Jakarta Sans** handles all functional and long-form content. Its soft, modern curves provide a necessary human balance to the sharp geometric headlines. Use the uppercase Label style for technical metadata and navigation items to maintain a structured, organized interface.

## Layout & Spacing

The layout philosophy follows a **Fluid-Hybrid** model. While content is organized on a strict 12-column grid for desktop, the spacing between sections is generous to allow the neon "glows" to breathe and prevent the UI from feeling cluttered.

- **Desktop:** 12-column grid, 64px side margins, 24px gutters.
- **Tablet:** 8-column grid, 32px side margins, 20px gutters.
- **Mobile:** 4-column grid, 16px side margins, 16px gutters.

The 8px base unit governs all internal component padding. Vertical rhythm is critical; use `lg` and `xl` spacing to separate major content blocks, creating a cinematic sense of scale.

## Elevation & Depth

Depth is not communicated through traditional drop shadows, but through **Luminous Layering** and **Glassmorphism**.

1.  **Base Layer:** The Dark Navy background (#050810).
2.  **Surface Layer:** Semi-transparent Navy (80% opacity) with a 20px backdrop blur and a 1px inner border (Primary Cyan at 15% opacity).
3.  **Floating Layer:** Elements like modals or hover states feature a Primary Cyan "Outer Glow"—a soft, diffused shadow (`0px 0px 20px rgba(0, 242, 255, 0.3)`).

This hierarchy creates a "heads-up display" (HUD) effect, where information appears to float in a digital space rather than sit on a flat surface.

## Shapes

The shape language combines technical precision with approachable curves. 

Standard components (Cards, Inputs) use the **Rounded** (0.5rem) setting to maintain a sophisticated, modern look. However, interactive elements like Buttons and Chips should utilize a **Pill-shape** (fully rounded) to contrast against the rigid grid and signify touch-readiness. 

Decorative elements, such as progress bars or data charts, should utilize "Cut corners" or 45-degree chamfers sparingly to reinforce the high-tech, aerodynamic theme of the sports event.

## Components

### Buttons
Primary buttons are solid Electric Cyan with black text. On hover, they emit a vibrant cyan glow. Secondary buttons use a "Ghost" style: a 2px Vivid Blue border with a subtle gradient fill that activates on hover.

### Cards
Cards are the primary container for match data and player stats. They must use the glassmorphic style: dark navy background with 10% transparency and a heavy backdrop blur. Include a subtle top-left to bottom-right gradient stroke to define the edges in the dark environment.

### Input Fields
Inputs are dark, underlined or fully bordered with a low-opacity cyan. When focused, the border transitions to 100% Electric Cyan with a subtle "inner glow" effect to signify the active state.

### Chips & Badges
Used for match status (e.g., "LIVE"). Live status badges must feature a "Pulse" animation—a soft cyan glow that expands and fades to indicate real-time activity.

### Navigation
The navigation bar is fixed and utilizes the highest level of backdrop blur (40px) to ensure legibility as the user scrolls through high-vibrancy content. Active links are indicated by a glowing cyan dot or a short underline bar.