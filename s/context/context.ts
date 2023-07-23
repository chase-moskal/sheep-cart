
import {Flat, Op} from "@benev/frog"
import {GqlCollection, GqlTag} from "shopify-shepherd"

import {flat} from "./flat.js"
import {Route} from "../routing/types.js"
import {Router} from "../routing/router.js"
import {Situation} from "./types/situation.js"
import {State, init_state} from "./parts/init_state.js"
import {prepare_all_views} from "../components/prepare_all_views.js"

export class Context {
	#state: State
	readonly state: State

	views = prepare_all_views()

	constructor(public router: Router) {
		this.#state = init_state(flat, router)
		this.state = Flat.readonly(this.#state)
	}

	set_route = (route: Route) => this.#state.route = route
	set_tags = (tags: GqlTag[]) => this.#state.tags = tags
	set_collections = (collections: GqlCollection[]) => this.#state.collections = collections
	set_situation_op = (op: Op.Any<Situation>) => this.#state.situation_op = op
}

