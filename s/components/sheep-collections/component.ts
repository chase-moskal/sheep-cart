
import {html} from "lit"
import {QuickElement} from "@benev/frog"

import {setup} from "../setup.js"
import {style} from "./style.css.js"
import {utransform} from "../../tools/utransform.js"

export const SheepCollections = setup(({router, state}) => class extends QuickElement {
	static styles = style

	#click = (id: string, label: string) => () => {
		router.routes.collection(
			utransform.id.shorten(id),
			utransform.label(label),
		).go()
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
})

