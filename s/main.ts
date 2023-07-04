
import {Shopify, concurrent} from "shopify-shepherd"
import {registerElements} from "@chasemoskal/magical"

import {Router} from "./routing/router.js"
import {Context} from "./components/context.js"
import {prepare_all_components} from "./components/prepare_all_components.js"

const router = Router.setup()
const context = new Context(router)
registerElements(prepare_all_components(context))

const domain = "dev-bakery.myshopify.com"
const storefront_access_token = "5f636be6b04aeb2a7b96fe9306386f25"
const shopify = Shopify.setup({
	domain,
	storefront_access_token,
})

const {collections, tags} = await concurrent({
	tags: Shopify.all(shopify.tags()),
	collections: Shopify.all(shopify.collections()),
})

context.tags.value = tags
context.collections.value = collections

