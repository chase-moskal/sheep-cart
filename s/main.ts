
import {Pipe, register_to_dom} from "@benev/frog"
import {Shopify, concurrent} from "shopify-shepherd"

import {Pilot} from "./piloting/pilot.js"
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
	.to(prepare_all_components)
	.to(register_to_dom)

const pilot = new Pilot({
	shopify,
	set_situation_op: context.set_situation_op,
})

///////
///////

router.on_route_change(context.set_route)
router.on_route_change(() => pilot.load(context.state.route))

const {collections, tags} = await concurrent({
	pilot: pilot.load(context.state.route),
	tags: Shopify.all(shopify.tags()),
	collections: Shopify.all(shopify.collections()),
})

context.set_tags(tags)
context.set_collections(collections)

