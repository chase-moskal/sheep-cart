
import {Cue, CueGroup} from "@benev/frog"
import {GqlCollection, GqlTag} from "shopify-shepherd"

import {Op} from "./utils/op.js"
import {Route} from "../routing/types.js"
import {Router} from "../routing/router.js"
import {Situation} from "./types/situation.js"

export class Context {
	cues = new CueGroup()

	route: Cue<Route>

	tags = this.cues.create<GqlTag[]>([])

	collections = this.cues.create<GqlCollection[]>([])

	situation = this.cues.create<Op.Any<Situation>>(Op.make.loading())

	constructor(public router: Router) {
		this.route = this.cues.create(router.route)
	}
}

