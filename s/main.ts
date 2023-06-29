
import {registerElements} from "@chasemoskal/magical"

import {Router} from "./routing/router.js"
import {Context} from "./components/context.js"
import {ShopifyAdapter} from "./shopify/adapter.js"
import {prepare_all_components} from "./components/prepare_all_components.js"
import { ShopifyRemote } from "./shopify/shepherd/parts/shopify_remote.js"
import { ShopifyPal } from "./shopify/shepherd/sketch.js"

const router = new Router({
	prefix: "",
	set_hash: hash => location.hash = hash,
})

router.apply_hash(location.hash)
addEventListener("hashchange", router.hashchange)

{
	const domain = "dev-bakery.myshopify.com"
	const storefrontAccessToken = "5f636be6b04aeb2a7b96fe9306386f25"

	{
		const adapter = new ShopifyAdapter({
			domain,
			storefrontAccessToken,
		})
		console.log("sdk", await adapter.fetch_all())
	}

	{
		const shopify = new ShopifyPal({
			domain,
			storefront_access_token: storefrontAccessToken,
		})
		console.log("gql", await shopify.fetch_products(5))
	}
}

;(window as any).router = router

const context = new Context(router)

registerElements(prepare_all_components(context))

