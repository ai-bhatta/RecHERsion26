# Design System Specification: A Signature Experience

## 1. Overview & Creative North Star

### Creative North Star: "The Neon Botanical"
This design system rejects the sterile, blocky aesthetics of traditional coding platforms. Instead, it embraces **Neon Botanical**—a concept where futuristic precision meets organic fluidity. It is a world of deep shadows, illuminated by high-energy bioluminescence. 

We break the "template" look through **Intentional Asymmetry**. Layouts should feel like a living organism; use overlapping elements (e.g., a frosted glass card partially obscuring an abstract floral graphic) and high-contrast typography scales to create an editorial feel. The grid is not a cage, but a guide for kinetic energy.

---

## 2. Colors

### Palette Strategy
The foundation is built on absolute depth (`surface: #131313`). Vibrancy is introduced through layers of purple and pink, used not just as accents, but as light sources.

*   **Primary (`#ddb7ff`):** Our core light source. Used for high-priority actions.
*   **Secondary (`#d2bbff`):** A cooler, deeper violet for supporting elements.
*   **Tertiary (`#ffafd3`):** The "Soft Pink" accent. Use this to highlight delicate details or interactive success states.
*   **Surface Tiers:** Use `surface_container_lowest` to `highest` to create a "nested" depth.

### The "No-Line" Rule
**Prohibit 1px solid borders for sectioning.** Boundaries must be defined solely through background color shifts or tonal transitions. To separate a section, shift from `surface` to `surface_container_low`. 

### The "Glass & Gradient" Rule
Standard flat containers are forbidden for primary content. Use **Glassmorphism**:
*   **Fill:** `surface_variant` at 40-60% opacity.
*   **Blur:** 12px - 20px backdrop-blur.
*   **Signature Texture:** Main CTAs must use a linear gradient transitioning from `primary` to `primary_container` at a 135° angle to provide visual "soul."

---

## 3. Typography

The typography strategy pairs technical precision with aggressive modernism.

*   **Display & Headlines (Space Grotesk):** This font’s quirky, geometric terminals feel both "coded" and avant-garde. Use `display-lg` (3.5rem) with tight letter-spacing (-0.02em) for hero sections.
*   **Body & Labels (Inter):** Chosen for its clinical readability. `body-lg` (1rem) is the workhorse for contest instructions.
*   **The Hierarchy Goal:** Use extreme scale differences. A `display-lg` headline sitting next to a `label-sm` metadata tag creates an editorial, high-end tension that feels intentional and premium.

---

## 4. Elevation & Depth

### The Layering Principle
Depth is achieved by "stacking" tonal tiers. Place a `surface_container_highest` card atop a `surface_dim` background to create a soft, natural lift without a single line of CSS border.

### Ambient Shadows
When a floating effect is required (e.g., a modal or floating action button), shadows must be extra-diffused:
*   **Color:** `on_secondary` at 8% opacity.
*   **Blur:** 30px - 40px.
*   **Spread:** -5px.
This mimics the glow of neon light rather than a physical shadow.

### The "Ghost Border" Fallback
If a container requires a boundary for accessibility, use a **Ghost Border**:
*   **Stroke:** 1px `outline_variant` at 15% opacity.
*   **Glow:** On hover, increase this to 100% opacity using the `primary` token to simulate a "power-on" state.

---

## 5. Components

### Buttons
*   **Primary:** Gradient fill (`primary` to `primary_container`), `on_primary` text, `full` roundedness. No border.
*   **Secondary:** Ghost Border style. Transparent background, `primary` text, 1px `outline` at 20% opacity.
*   **Tertiary:** Text only in `tertiary` color, all caps, `label-md` scale with increased letter spacing.

### Cards
*   **Glassmorphism:** Must use `surface_container_low` at 50% opacity with backdrop-blur.
*   **Visual Anchor:** A 2px top-accent line using the `tertiary` (pink) token adds a high-end "finished" look.
*   **No Dividers:** Separate card content using `1.5rem` vertical spacing rather than lines.

### Inputs
*   **State:** Default state is `surface_container_highest` with no border.
*   **Active:** Transitions to a 1px `primary` border with a subtle `primary` outer glow (4px blur).
*   **Label:** Always use `label-md` in `on_surface_variant`.

### Signature Component: The "Grid Overlay"
As seen in the creative direction, use a background pseudo-element with a repeating 40px grid pattern in `outline_variant` (10% opacity). Fade the grid out using a radial mask so it only appears in the corners or behind headers.

---

## 6. Do's and Don'ts

### Do
*   **Do** use organic, fluid shapes behind glass cards to create depth.
*   **Do** use `primary_fixed_dim` for disabled states to keep the palette cohesive.
*   **Do** lean into asymmetry; align headers to the left while keeping CTAs to the far right.

### Don't
*   **Don't** use pure `#FFFFFF` for body text; use `on_surface` (#e2e2e2) to reduce eye strain against the black background.
*   **Don't** use standard "Drop Shadows" (Black/Grey). Only use tinted shadows that match the surface light.
*   **Don't** use sharp corners. Refer to the **Roundedness Scale** (default `xl`: 0.75rem) to maintain the "feminine but powerful" softness.