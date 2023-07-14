
import {html, svg} from "lit"
import {QuickElement} from "@benev/frog"
import {debounce} from "@chasemoskal/magical"

import {style} from "./style.css.js"
import {Context} from "../../context/context.js"
import {search_icon} from "../../icons/feather/search_icon.js"

export const SheepSearch = ({router}: Context) => (class extends QuickElement {
	static styles = style

	constructor() {
		super()
		this.wait.then(() => {
			if (router.route.zone === "search")
				this.#input.value = router.route.terms.join(" ")
		})
	}

	get #input() {
		return this.root.querySelector<HTMLInputElement>("input")!
	}

	get #user_is_focused_on_input() {
		return document.activeElement === this || this.contains(document.activeElement)
	}

	#unsub_from_route_change: (() => void) | undefined

	connectedCallback() {
		super.connectedCallback()

		this.#unsub_from_route_change = router.on_route_change(route => {
			const is_search = route.zone === "search"
			const not_focused = !this.#user_is_focused_on_input

			if (not_focused) {
				if (is_search)
					this.#input.value = route.terms.join(" ")
				else
					this.#input.value = ""
			}
		})
	}

	disconnectedCallback() {
		super.disconnectedCallback()
		if (this.#unsub_from_route_change)
			this.#unsub_from_route_change()
	}

	#search = debounce(250, () => {
		const {value} = this.#input
		const terms = value.split(/\s+/).filter(t => t.length)
		const tags = router.search_tags
		const nada = terms.length === 0 && tags.length === 0

		if (nada)
			router.go_catalog()
		else
			router.go_search(terms, router.search_tags)
	})

	render() {
		return html`
			<input type="text" @input="${this.#search}"/>
			${search_icon(svg)}
		`
	}
})

