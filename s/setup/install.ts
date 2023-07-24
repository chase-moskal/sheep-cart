
import {Shopify, ShopifySettings} from "shopify-shepherd"

import {Pilot} from "../piloting/pilot.js"
import {Router} from "../routing/router.js"
import {Context} from "../context/context.js"
import {prepare_all_components} from "../elements/prepare_all_components.js"

export function install_sheep_cart({
		domain,
		storefront_access_token,
	}: ShopifySettings) {

	const shopify = Shopify.setup({
		domain,
		storefront_access_token,
	})

	const router = Router.setup()
	const context = new Context(router)

	const pilot = new Pilot({
		shopify,
		set_situation_op: context.set_situation_op,
	})

	router.on_route_change(context.set_route)
	router.on_route_change(() => pilot.load(context.state.route))

	return {
		elements: prepare_all_components(context),

		async load() {
			await Promise.all([

				void async function load_the_initial_route() {
					await pilot.load(context.state.route)
				}(),

				void async function load_product_tags() {
					context.set_tags(
						await Shopify.all(shopify.tags())
					)
				}(),

				void async function load_product_collections() {
					context.set_collections(
						await Shopify.all(shopify.collections())
					)
				}(),

			])
		},
	}
}

