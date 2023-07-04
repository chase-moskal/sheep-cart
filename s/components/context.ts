
import {CueGroup} from "@benev/frog"
import {GqlCollection, GqlTag} from "shopify-shepherd"

import {Router} from "../routing/router.js"

export class Context {
	cues = new CueGroup()

	route = this.cues.create(this.router.route)

	tags = this.cues.create<GqlTag[]>([])
	collections = this.cues.create<GqlCollection[]>([])

	constructor(
			public readonly router: Router,
		) {
		router.on_route_change(route => this.route.value = route)
	}
}

