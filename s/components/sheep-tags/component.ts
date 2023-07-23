
import {html} from "lit"
import {QuickElement} from "@benev/frog"

import {style} from "./style.css.js"
import {Context} from "../../context/context.js"

export const SheepTags = ({router, state}: Context) => class extends QuickElement {
	static styles = style

	render() {
		const {route, tags} = state
		const active_tag_names = (route && route.zone === "search")
			? route.tags
			: []

		function is_tag_active(tag: string) {
			return active_tag_names.includes(tag)
		}

		function update_tag(tag: string) {
			return (event: InputEvent) => {
				const target = event.target as HTMLInputElement
				const terms = router.search_terms
				const tag_set = new Set<string>(router.search_tags)

				if (target.checked)
					tag_set.add(tag)
				else
					tag_set.delete(tag)

				const nada = tag_set.size === 0 && terms.length === 0

				if (nada)
					router.routes.catalog().go()
				else
					router.routes.search(terms, [...tag_set]).go()
			}
		}

		const tag_data = tags.map(tag => ({
			tag,
			active: is_tag_active(tag),
		}))

		return html`
			${tag_data.map(({tag, active}) => html`
				<label ?data-active="${active}">
					<input
						type="checkbox"
						.checked="${active}"
						@input="${update_tag(tag)}"
						/>
					<span>${tag}</span>
				</label>
			`)}
		`
	}
}

