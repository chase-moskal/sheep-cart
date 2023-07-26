
import {html} from "lit"
import {GqlProduct} from "shopify-shepherd"

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

