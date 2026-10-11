import { style } from '@vanilla-extract/css'

/**
 * Stable class on every element styled as a Button — `<button>`, `<a href>`, or anything given
 * `buttonClassName()`. The theme's global link styles exclude it, so a link that looks like a button
 * keeps the button's colours instead of the prose link colour and underline.
 */
export const buttonMarker = style({})
