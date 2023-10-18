
import {html} from "@benev/slate"

import {update_tag} from "./utils/update_tag.js"
import {get_tag_data} from "./utils/get_tag_data.js"
import {AppContext} from "../../../context/context.js"

export function render_search_tags(context: AppContext) {
	return html`
		${get_tag_data(context).map(({tag, active}) => html`
			<label part="${part(active)}" data-tag="${tag}" ?data-active="${active}">
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

function part(active: boolean) {
	return active
		? "tag x-active"
		: "tag"
}

