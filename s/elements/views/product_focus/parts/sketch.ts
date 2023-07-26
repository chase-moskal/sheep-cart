
import {html} from "lit"
import {GqlCollection, GqlProduct} from "shopify-shepherd"

export type Img = {src: string, alt: string}

export const placeholder_image: Img = {
	src: "https://i.imgur.com/hoPxt3T.webp",
	alt: "",
}

export function render_featured_image(product: GqlProduct) {
	let img = placeholder_image
	const has_image = product.featuredImage && product.images.edges.length

	if (has_image) {
		const id = product.featuredImage?.id
		const image = product.images.edges
			.map(e => e.node)
			.find(node => node.id === id)
		if (image)
			img = {src: image.url_large, alt: image.altText}
	}

	return html`
		<img alt="${img.alt}" src="${img.src}"/>
	`
}

export function render_tags_and_collections(
		product: GqlProduct,
		collections: GqlCollection[],
	) {

	const pills = {
		tags: [] as string[],
		collections: [] as string[],
	}

	for (const {node: {id}} of product.collections.edges) {
		const collection = collections.find(c => c.id === id)
		if (collection)
			pills.collections.push(collection.title)
	}

	for (const tag of product.tags)
		pills.tags.push(tag)

	return html`
		${pills.collections.map(collection => html`
			<li data-collection>${collection}</li>
		`)}
		${pills.tags.map(tag => html`
			<li data-tag>${tag}</li>
		`)}
	`
}

