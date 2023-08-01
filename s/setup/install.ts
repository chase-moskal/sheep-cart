
import {CSSResultGroup} from "lit"
import {Shopify, ShopifySettings} from "shopify-shepherd"

import {Router} from "../routing/router.js"
import {Context} from "../context/context.js"
import {prepare_pilot} from "../piloting/pilot.js"
import {CartStore} from "../carting/parts/cart_store.js"
import {theme as default_theme} from "../elements/theme.css.js"
import {prepare_all_elements} from "../elements/prepare_all_elements.js"

export function install_sheep_cart({
		domain,
		storefront_access_token,
		theme = default_theme,
	}: ShopifySettings & {theme?: CSSResultGroup}) {

	const shopify = Shopify.setup({
		domain,
		storefront_access_token,
	})

	const home = "products"

	const router = Router.setup(home)
	const context = new Context(
		shopify,
		router,
		theme,
		new CartStore("sheep_cart", localStorage),
	)

	context.cart.load()
	window.addEventListener("storage", () => {
		console.log("STORAGE EVENT")
		context.cart.load()
	})

	const collections_promise = Shopify.all(shopify.collections())

	const pilot = prepare_pilot({
		home,
		shopify,
		collections_promise,
		set_situation_op: context.set_situation_op,
	})

	router.on_route_change(context.set_route)
	router.on_route_change(() => pilot(context.state.route))

	return {
		elements: prepare_all_elements(context),

		async load() {
			await Promise.all([

				void async function load_the_initial_route() {
					await pilot(context.state.route)
				}(),

				void async function load_product_tags() {
					context.set_tags(
						await Shopify.all(shopify.tags())
					)
				}(),

				void async function load_product_collections() {
					context.set_collections(
						await collections_promise
					)
				}(),

			])
		},
	}
}

