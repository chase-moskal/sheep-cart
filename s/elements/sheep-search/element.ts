
import {html, svg} from "lit"
import {QuickElement} from "@benev/frog"
import {debounce} from "@chasemoskal/magical"

import {style} from "./style.css.js"
import {Context} from "../../context/context.js"
import {search_icon} from "../../icons/feather/search_icon.js"
import {render_search_tags} from "./tags/render_search_tags.js"
import {ascertain_search_details} from "./parts/ascertain_search_details.js"
import {populate_input_with_route_search_terms} from "./parts/populate_input_with_route_search_terms.js"
import {populate_input_with_route_search_terms_when_user_is_not_focused_on_input} from "./parts/populate_input_with_route_search_terms_when_user_is_not_focused_on_input.js"

export const SheepSearch = (context: Context) => class extends QuickElement {
	static styles = style

	constructor() {
		super()

		populate_input_with_route_search_terms(
			this.wait,
			context.router,
			() => this.#input,
		)

		this.setup(() => context.router.on_route_change(route =>
			populate_input_with_route_search_terms_when_user_is_not_focused_on_input(
				route,
				this.#user_is_focused_on_input,
				this.#input,
			)
		))
	}

	get #input() {
		return this.root.querySelector<HTMLInputElement>("input")!
	}

	get #user_is_focused_on_input() {
		return document.activeElement === this || this.contains(document.activeElement)
	}

	#search: () => Promise<void> = debounce(250, () => {
		const {router} = context
		const details = ascertain_search_details(router, this.#input.value)

		if (details.there_is_nothing_to_search_for)
			router.routes.home().go()
		else
			router.routes.search(details.terms, router.search_tags).go()
	})

	render() {
		return html`
			<div class=searchbox>
				<input type="text" @input="${this.#search}"/>
				${search_icon(svg)}
			</div>
			<div class=searchtags>
				${render_search_tags(context)}
			</div>
		`
	}
}

