/** Cross-component UI events, so any button can open the palette or the contact form. */
export const openCommandPalette = () => window.dispatchEvent(new Event("open-command-palette"));
export const openContactModal = () => window.dispatchEvent(new Event("open-contact-modal"));
