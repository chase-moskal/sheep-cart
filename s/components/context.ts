
import {CueGroup} from "../framework/cues/group.js"
import {Router} from "../framework/routing/router.js"

export class Context {
	cues = new CueGroup()

	constructor(
			public readonly router: Router,
		) {
		router.on_route_change(route => this.route.value = route)
	}

	route = this.cues.create(this.router.route)
}

