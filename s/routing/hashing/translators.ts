
import {Routes} from "../types.js"
import {translator} from "./parts/translator.js"

export const translators = {

	catalog: translator<Routes["catalog"]>({
		hashify: () => "/",
		routify: () => ({zone: "catalog"}),
	}),

	search: translator<Routes["search"]>({
		hashify: ({terms, tags}) => {
			const e = (t: string[]) => t.map(encodeURIComponent).join(":")
			const query = tags.length > 0
				? e(terms) + "::" + e(tags)
				: e(terms)
			return `/search/${query}`
		},
		routify: hashparts => {
			const [raw] = hashparts
			const splitty = (s: string) => s.split(":").filter(t => t.length)
			if (raw.includes("::")) {
				const [rawterms, rawtags] = raw.split("::")
				const tags = splitty(rawtags)
				const terms = splitty(rawterms)
				return {zone: "search", terms, tags}
			}
			else
				return {zone: "search", terms: splitty(raw), tags: []}
		},
	}),

	collection: translator<Routes["collection"]>({
		hashify: ({label, id}) => `/collection/${label}/${id}`,
		routify: ([label, id]) => ({zone: "collection", label, id}),
	}),

	product: translator<Routes["product"]>({
		hashify: ({label, id}) => `/product/${label}/${id}`,
		routify: ([label, id]) => ({zone: "product", label, id}),
	}),

	not_found: translator<Routes["not_found"]>({
		hashify: () => "/",
		routify: () => ({zone: "not_found"}),
	}),
}

