
import {Flat, Op} from "@benev/frog"
import {GqlCollection, GqlTag} from "shopify-shepherd"

import {Route} from "../routing/types.js"
import {Router} from "../routing/router.js"
import {Situations} from "./types/situations.js"
import {State, init_state} from "./parts/init_state.js"
import {theme as defaultTheme} from "../elements/theme.css.js"
import {prepare_all_views} from "../elements/prepare_all_views.js"

export class Context {
	flat = new Flat()
	views = prepare_all_views(this)

	#state: State
	readonly state: State

	constructor(
			public router: Router,
			public theme = defaultTheme,
		) {
		this.#state = init_state(this.flat, router)
		this.state = Flat.readonly(this.#state)
	}

	set_route = (route: Route) => this.#state.route = route
	set_tags = (tags: GqlTag[]) => this.#state.tags = tags
	set_collections = (collections: GqlCollection[]) => this.#state.collections = collections
	set_situation_op = (op: Op.Any<Situations.Whatever>) => this.#state.situation_op = op
}

