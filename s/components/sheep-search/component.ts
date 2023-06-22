
import {html, svg} from "lit"

import {style} from "./style.css.js"
import {Context} from "../context.js"
import {QuickElement} from "../../framework/quick-element.js"
import {search_icon} from "../../icons/feather/search_icon.js"

export const SheepSearch = ({router}: Context) => (
	class extends QuickElement<boolean> {
		static styles = style

		constructor() {
			super()
			this.state = true
			this.updated.then(() => {
				if (router.route.zone === "search")
					this.#input.value = router.route.query
			})
		}

		get #input() {
			return this.root.querySelector<HTMLInputElement>("input")!
		}

		get #user_is_focused_on_input() {
			return document.activeElement === this.#input
		}

		#unsub_from_route_change: (() => void) | undefined

		connectedCallback() {
			super.connectedCallback()

			this.#unsub_from_route_change = router.on_route_change.sub(route => {
				const is_search = route.zone === "search"
				const not_focused = !this.#user_is_focused_on_input

				if (is_search && not_focused)
					this.#input.value = route.query
			})
		}

		disconnectedCallback() {
			super.disconnectedCallback()
			if (this.#unsub_from_route_change)
				this.#unsub_from_route_change()
		}

		#search = () => {
			const {value} = this.#input

			if (value.length > 0)
				router.go_search(value, ["alpha", "beta"])
			else
				router.go_catalog()
		}

		render() {
			return html`
				<input type="text" @input="${this.#search}"/>
				${search_icon(svg)}
			`
		}
	}
)

