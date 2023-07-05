
import {Cue, CueGroup} from "@benev/frog"
import {GqlCollection, GqlProduct, GqlTag} from "shopify-shepherd"

import {Route} from "../routing/types.js"
import {Router} from "../routing/router.js"

export type ProductListingSituation = {
	type: "ProductListing"
	products: GqlProduct[]
	load_more: undefined | (() => void)
}

export type ProductFocusSituation = {
	type: "ProductFocus"
	product: GqlProduct
}

export type Situation = undefined | ProductListingSituation | ProductFocusSituation

export class Context {
	cues = new CueGroup()

	route: Cue<Route>

	tags = this.cues.create<GqlTag[]>([])

	collections = this.cues.create<GqlCollection[]>([])

	situation = this.cues.create<Situation>(undefined)

	constructor(public router: Router) {
		this.route = this.cues.create(router.route)
	}
}

