
import {snapstate} from "@chasemoskal/snapstate"
import {Router} from "../framework/routing/router.js"

export class Context {

	constructor(
		public readonly router: Router,
	) {}

	snap = snapstate({})

	get state() {
		return this.snap.readonly
	}

	get writable() {
		return this.snap.writable
	}
}

