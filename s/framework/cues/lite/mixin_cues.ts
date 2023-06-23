
import {CueGroup} from "../group.js"
import {LiteElementClass} from "../../utils/lite_element.js"

export function mixin_cues(group: CueGroup) {
	return function<C extends LiteElementClass>(Base: C): C {
		return class extends Base {
			#untracks: (() => void)[] = []

			connectedCallback() {
				super.connectedCallback()

				this.#untracks.push(group.track(
					() => this.render(),
					() => this.requestUpdate(),
				))
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

