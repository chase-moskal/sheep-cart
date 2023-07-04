
import {registerElements} from "@chasemoskal/magical"

import {Router} from "./routing/router.js"
import {Context} from "./components/context.js"
import {prepare_all_components} from "./components/prepare_all_components.js"

import {Shopify} from "shopify-shepherd"

const router = Router.setup()
const context = new Context(router)

const domain = "dev-bakery.myshopify.com"
const storefront_access_token = "5f636be6b04aeb2a7b96fe9306386f25"
const shopify = Shopify.setup({
	domain,
	storefront_access_token,
})

context.collections.value = await Shopify.all(shopify.collections())

registerElements(prepare_all_components(context))

