
import {register_elements} from "@benev/frog"
import {Shopify, concurrent} from "shopify-shepherd"

import {Pipe} from "./tools/pipe.js"
import {Router} from "./routing/router.js"
import {Context} from "./context/context.js"
import {prepare_all_components} from "./components/prepare_all_components.js"

const domain = "dev-bakery.myshopify.com"
const storefront_access_token = "5f636be6b04aeb2a7b96fe9306386f25"

const shopify = Shopify.setup({
	domain,
	storefront_access_token,
})

const router = Router.setup()
const context = new Context(router)

new Pipe(context)
	.pipe(prepare_all_components)
	.pipe(register_elements)

///////
///////

async function load_products() {
	const route = context.route.value
	const page_size = 10
	context.situation.value = undefined

	switch (route.zone) {

		case "catalog": {
			const generator = shopify.products({page_size})
			context.situation.value = {
				type: "ProductListing",
				products: [],
				load_more,
			}
			async function load_more() {
				const page = await generator.next()
				context.situation.value = {
					type: "ProductListing",
					products: [
						...(context.situation.value?.type === "ProductListing"
							? context.situation.value.products
							: []),
						...(page.value ?? [])
					],
					load_more: page.done
						? undefined
						: load_more,
				}
			}
			await load_more()
		} break

		case "search": {
		} break

		case "collection": {
		} break

		case "product": {
		} break

		case "not_found": {
		} break
	}
}

router.on_route_change(route => context.route.value = route)
router.on_route_change(() => load_products())

const {collections, tags} = await concurrent({
	products: load_products(),
	tags: Shopify.all(shopify.tags()),
	collections: Shopify.all(shopify.collections()),
})

context.tags.value = tags
context.collections.value = collections

