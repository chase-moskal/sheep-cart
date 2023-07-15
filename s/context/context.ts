
import {Cue, CueGroup} from "@benev/frog"
import {GqlCollection, GqlProduct, GqlTag} from "shopify-shepherd"

import {Op} from "./utils/op.js"
import {Route} from "../routing/types.js"
import {Router} from "../routing/router.js"
import {Situation} from "./types/situation.js"

export class Context {
	cues = new CueGroup()

	route: Cue<Route>

	tags = this.cues.create<GqlTag[]>([])

	collections = this.cues.create<GqlCollection[]>([])

	situation = this.cues.create<Op.Operation<Situation>>(new Op.Loading())

	constructor(public router: Router) {
		this.route = this.cues.create(router.route)
	}
}

