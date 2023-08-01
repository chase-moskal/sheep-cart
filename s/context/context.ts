
import {CSSResultGroup} from "lit"
import {Flat, Op} from "@benev/frog"
import {GqlCollection, GqlTag, Shopify} from "shopify-shepherd"

import {Cart} from "../carting/cart.js"
import {Route} from "../routing/types.js"
import {Modal} from "../modaling/modal.js"
import {Router} from "../routing/router.js"
import {Situation} from "./types/situations.js"
import {State, init_state} from "./parts/init_state.js"
import {CartStore} from "../carting/parts/cart_store.js"
import {prepare_all_views} from "../elements/prepare_all_views.js"

export class Context {
	flat = new Flat()
	#state: State
	readonly state: State
	modal: Modal
	views = prepare_all_views(this)
	cart: Cart

	constructor(
			public shopify: Shopify,
			public router: Router,
			public theme: CSSResultGroup,
			cart_store: CartStore,
		) {
		this.#state = init_state(this.flat, router)
		this.state = Flat.readonly(this.#state)
		this.cart = new Cart(this.flat, this.shopify, cart_store)
		this.modal = new Modal(this.flat)
	}

	set_route = (route: Route) => this.#state.route = route
	set_tags = (tags: GqlTag[]) => this.#state.tags = tags
	set_collections = (collections: GqlCollection[]) => this.#state.collections = collections
	set_situation_op = (op: Op.For<Situation.Whatever>) => this.#state.situation_op = op
}

