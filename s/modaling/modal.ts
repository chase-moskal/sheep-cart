
import {Flat} from "@benev/frog"
import {TemplateResult} from "lit"

export class Modal {
	state: {
		open: boolean
		content?: undefined | TemplateResult
	}

	constructor(flat: Flat) {
		this.state = flat.state({
			open: true,
		})
	}

	toggle_modal_open = (open = !this.state.open, content?: TemplateResult) => {
		this.state.open = open
		this.state.content = content
	}
}
