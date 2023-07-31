
import {html} from "lit"
import {Img} from "./types.js"

export function render_img(img: Img, onclick: ((event: MouseEvent, img: Img) => void) = () => {}) {
	return html`
		<img @click=${(event: MouseEvent) => onclick(event, img)}
		alt="${img.alt}"
		src="${img.src}"
		/>
	`
}

