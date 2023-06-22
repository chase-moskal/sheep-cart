
import {Snapstate} from "@chasemoskal/snapstate"
import {LiteElementClass} from "../utils/lite_element.js"

export function mixinSnap(...snaps: Snapstate<any>[]) {
	return function<C extends LiteElementClass>(Base: C): C {
		return class extends Base {
			#untracks: (() => void)[] = []

			connectedCallback() {
				super.connectedCallback()
				for (const snap of snaps)
					this.#untracks.push(
						snap.track(
							() => { this.render() },
							() => { this.requestUpdate() },
						)
					)
			}

			disconnectedCallback() {
				super.disconnectedCallback()

				for (const untrack of this.#untracks)
					untrack()

				this.#untracks = []
			}
		}
	}
}

