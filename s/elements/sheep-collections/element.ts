
import {html} from "lit"
import {QuickElement} from "@benev/frog"

import {style} from "./style.css.js"
import {Context} from "../../context/context.js"
import {utransform} from "../../tools/utransform.js"

export const SheepCollections = ({router, state}: Context) => class extends QuickElement {
	static styles = style

	#click = (id: string, label: string) => () => {
		router.routes.collection({
			id: utransform.id.shorten(id),
			handle: utransform.label(label),
		}).go()
	}

	render() {
		return html`
			${state.collections.map(collection => html`
				<button @click=${this.#click(collection.id, collection.title)}>
					${collection.title}
				</button>
			`)}
		`
	}
}

