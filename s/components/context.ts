
import {CueGroup} from "../framework/cues/group.js"
import {Router} from "../framework/routing/router.js"

export class Context {
	cues = new CueGroup()

	constructor(
		public readonly router: Router,
	) {}

	count = this.cues.create(0)
}

