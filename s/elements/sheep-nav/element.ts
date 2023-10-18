
import {html} from "@benev/slate"

import {carbon} from "../frontend.js"
import {style as styles} from "./style.css.js"

export const SheepNav = carbon({styles}, use => {
	const {route} = use.context.state
	const {routes} = use.context.router

	const areas = {
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
})

