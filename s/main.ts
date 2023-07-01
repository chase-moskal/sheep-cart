
import {registerElements} from "@chasemoskal/magical"

import {Router} from "./routing/router.js"
import {Context} from "./components/context.js"
import {ShopifyShepherd} from "./shopify/shepherd/shepherd.js"
import {prepare_all_components} from "./components/prepare_all_components.js"
import {query_country_info} from "./shopify/shepherd/utils/query_country_info.js"

const router = new Router({
	prefix: "",
	set_hash: hash => location.hash = hash,
})

router.apply_hash(location.hash)
addEventListener("hashchange", router.hashchange)

{
	const domain = "dev-bakery.myshopify.com"
	const storefrontAccessToken = "5f636be6b04aeb2a7b96fe9306386f25"

	// {
	// 	const adapter = new ShopifyAdapter({
	// 		domain,
	// 		storefrontAccessToken,
	// 	})
	// 	console.log("sdk", await adapter.fetch_all())
	// }

	{
		const shopify = ShopifyShepherd.make({
			domain,
			storefront_access_token: storefrontAccessToken,
		})

		const shop_info = await shopify.fetch_shop_info()
		console.log("shop_info", shop_info)

		const countries = await query_country_info(shop_info.shipsToCountries)
		console.log("countries", countries)

		const products = await shopify.fetch_all_products()
		console.log("all_products", products)
	}
}

;(window as any).router = router

const context = new Context(router)

registerElements(prepare_all_components(context))

