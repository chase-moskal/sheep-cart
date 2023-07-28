
import {GqlImage, GqlProduct} from "shopify-shepherd"
import {Img, placeholder_img, render_img} from "../../product_focus/parts/sketch.js"

export function render_featured_image(product: GqlProduct) {
	let image: GqlImage | undefined

	if (product.featuredImage)
		image = product.images.edges
			.map(e => e.node)
			.find(i => i.id === product.featuredImage!.id)

	const img: Img = image
		? {src: image.url_tiny, alt: image.altText}
		: placeholder_img

	return render_img(img)
}

