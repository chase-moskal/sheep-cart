
import {CSSResultGroup} from "@benev/slate"
import {Context, Flat, Op} from "@benev/slate"
import {GqlCollection, GqlTag, Shopify} from "shopify-shepherd"

import {Cart} from "../carting/cart.js"
import {Route} from "../routing/types.js"
import {Modal} from "../modaling/modal.js"
import {Router} from "../routing/router.js"
import {Situation} from "./types/situations.js"
import {State, init_state} from "./parts/init_state.js"
import {CartStore} from "../carting/parts/cart_store.js"

const deferred = undefined as any

export class AppContext extends Context {
	shopify: Shopify = deferred
	router: Router = deferred

	#state: State = deferred
	state: State = deferred

	cart: Cart = deferred
	modal = new Modal()

	setup(
			shopify: Shopify,
			router: Router,
			cart_store: CartStore,
		) {
		this.shopify = shopify
		this.router = router
		this.#state = init_state(this.flat, router)
		this.state = Flat.readonly(this.#state)
		this.cart = new Cart(this.flat, this.shopify, cart_store)
	}

	set_route = (route: Route) => this.#state.route = route
	set_tags = (tags: GqlTag[]) => this.#state.tags = tags
	set_collections = (collections: GqlCollection[]) => this.#state.collections = collections
	set_situation_op = (op: Op.For<Situation.Whatever>) => this.#state.situation_op = op

	toggle_cart_open = (open = !this.#state.cart_open) => {
		this.#state.cart_open = open
	}
}

export const context = new AppContext()
