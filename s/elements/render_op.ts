
import {html} from "lit"
import {prep_render_op} from "@benev/frog"

export const render_op = prep_render_op({
	loading: () => html`..loading..`,
	error: reason => html`error! ${reason}`,
})

