
import {html} from "lit"
import {QuickElement} from "@benev/frog"

import {style} from "./style.css.js"
import {Context} from "../../context/context.js"
import {utransform} from "../../tools/utransform.js"

export const SheepCollections = ({router, collections}: Context) => (class extends QuickElement {
	static styles = style

	#click = (id: string, label: string) => () => {
		router.go_collection(
			utransform.id.shorten(id),
			utransform.label(label),
		)
	}

	render() {
		return html`
			${collections.value.map(collection => html`
				<button @click=${this.#click(collection.id, collection.title)}>
					${collection.title}
				</button>
			`)}
		`
	}
})

