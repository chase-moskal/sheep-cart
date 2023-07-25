
import {html} from "lit"
import {QuickElement} from "@benev/frog"

import {style} from "./style.css.js"
import {Context} from "../../context/context.js"
import {update_tag} from "./parts/update_tag.js"
import {get_tag_data} from "./parts/get_tag_data.js"

export const SheepTags = (context: Context) => class extends QuickElement {
	static styles = style

	render() {
		return html`
			${get_tag_data(context).map(({tag, active}) => html`
				<label ?data-active="${active}">
					<input
						type="checkbox"
						.checked="${active}"
						@input="${update_tag(tag, context.router)}"
						/>
					<span>${tag}</span>
				</label>
			`)}
		`
	}
}

