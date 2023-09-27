
import {html} from "lit"
import {GoldElement} from "@benev/slate"

import {style} from "./style.css.js"
import {Context} from "../../context/context.js"

export const SheepNav = (context: Context) => class extends GoldElement {
	static styles = style

	get #areas() {
		const {route} = context.state
		const {routes} = context.router
		return {

			collections: {
				url: routes.collections().url,
				marked: (
					route.zone === "collections" ||
					(route.zone === "home" && route.area === "collections")
				)
			},

			products: {
				url: routes.products().url,
				marked: (
					route.zone === "products" ||
					(route.zone === "home" && route.area === "products")
				)
			},
		}
	}

	render() {
		const areas = this.#areas
		return html`

			<a
				href="${areas.collections.url}"
				?data-marked="${areas.collections.marked}">
				<slot name=collections>
					collections
				</slot>
			</a>

			<a
				href="${areas.products.url}"
				?data-marked="${areas.products.marked}">
				<slot name=products>
					all products
				</slot>
			</a>
		`
	}
}

