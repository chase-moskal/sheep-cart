
import {html} from "lit"
import {QuickElement} from "@benev/frog"

import {style} from "./style.css.js"
import {Context} from "../context.js"

export type Tag = {name: string}

export const SheepTags = (context: Context) => (
	class extends QuickElement {

	static styles = style

	all_tags: Tag[] = [
		{name: "alpha"},
		{name: "bravo"},
		{name: "charlie"},
	]

	render() {
		const route = context.route.value
		const router = context.router

		const active_tag_names = (route && route.zone === "search")
			? route.tags
			: []

		function is_tag_active(tag: Tag) {
			return active_tag_names.includes(tag.name)
		}

		function update_tag(tag: Tag) {
			return (event: InputEvent) => {
				const target = event.target as HTMLInputElement
				const terms = router.search_terms
				const tag_set = new Set<string>(router.search_tags)

				if (target.checked)
					tag_set.add(tag.name)
				else
					tag_set.delete(tag.name)

				const nada = tag_set.size === 0 && terms.length === 0

				if (nada)
					router.go_catalog()
				else
					router.go_search(terms, [...tag_set])
			}
		}

		const tag_data = this.all_tags.map(tag => ({
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
					<span>${tag.name}</span>
				</label>
			`)}
		`
	}
})

