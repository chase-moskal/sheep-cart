
import {html} from "lit"
import {Img} from "./types.js"

export function render_img(img: Img) {
	return html`
		<img alt="${img.alt}" src="${img.src}"/>
	`
}

