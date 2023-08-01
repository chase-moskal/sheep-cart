
import {html} from "lit"
import {prep_render_op} from "@benev/frog"
import loaderSvg from "../icons/feather/loader.svg.js"
import alertSvg from "../icons/akar/alert.svg.js"

export const render_op = prep_render_op({
	loading: () => html`<span class=loading>${loaderSvg}</span>`,
	error: reason => html`
		<span class=error>
			${alertSvg}
			${reason}
		</span>
	`
})

