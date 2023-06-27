
import {CueGroup} from "@benev/frog"
import {Router} from "../routing/router.js"

export class Context {
	cues = new CueGroup()

	constructor(
			public readonly router: Router,
		) {
		router.on_route_change(route => this.route.value = route)
	}

	route = this.cues.create(this.router.route)
}

