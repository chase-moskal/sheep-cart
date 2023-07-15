
import {register_elements} from "@benev/frog"
import {Shopify, concurrent} from "shopify-shepherd"

import {Pipe} from "./tools/pipe.js"
import {Router} from "./routing/router.js"
import {Pilot} from "./navigation/pilot.js"
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

const pilot = new Pilot({
	shopify,
	set_situation_op: op => context.situation.value = op,
})

///////
///////

router.on_route_change(route => context.route.value = route)
router.on_route_change(() => pilot.load(context.route.value))

const {collections, tags} = await concurrent({
	pilot: pilot.load(context.route.value),
	tags: Shopify.all(shopify.tags()),
	collections: Shopify.all(shopify.collections()),
})

context.tags.value = tags
context.collections.value = collections

