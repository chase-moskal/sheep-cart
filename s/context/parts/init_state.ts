
import {Flat, Op} from "@benev/frog"
import {GqlCollection, GqlTag} from "shopify-shepherd"

import {Router} from "../../routing/router.js"
import {Situation} from "../types/situations.js"

export function init_state(flat: Flat, router: Router) {
	return flat.state({
		route: router.route,
		tags: [] as GqlTag[],
		collections: [] as GqlCollection[],
		situation_op: Op.loading() as Op.For<Situation.Whatever>,
	})
}

export type State = ReturnType<typeof init_state>

