
import {html} from "lit"
import {GqlCollection, GqlImage, GqlProduct, GqlVariant} from "shopify-shepherd"

export type Img = {src: string, alt: string}

export const placeholder_img: Img = {
	src: "https://i.imgur.com/hoPxt3T.webp",
	alt: "",
}

export function get_featured_image(product: GqlProduct) {
	let image: GqlImage | undefined

	const product_has_any_image_at_all = (
		product.featuredImage &&
		product.images.edges.length
	)

	if (product_has_any_image_at_all) {
		image = product.images.edges
			.map(e => e.node)
			.find(node => node.id === product.featuredImage?.id)
	}

	return image
}

export function get_featured_img(product: GqlProduct) {
	const image = get_featured_image(product)
	return image
		? {src: image.url_large, alt: image.altText}
		: placeholder_img
}

export function render_featured_image(product: GqlProduct) {
	const img = get_featured_img(product)
	return render_img(img)
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

export function render_side_images(
		product: GqlProduct,
		choices: Choice[],
	) {

	const imgs: Img[] = []
	const primary_image = get_primary_image(product, choices)

	const available_images = product.images.edges
		.map(e => e.node)
		.filter(image => image.id !== primary_image?.id)

	for (const image of available_images) {
		imgs.push({
			src: image.url_large,
			alt: image.altText,
		})
	}

	return imgs.map(render_img)
}

export type Choice = {
	name: string
	value: string
}

export function get_choice(name: string, product: GqlProduct, choices: Choice[]) {
	const [{node: first_variant}] = product.variants.edges
	const initial_choices = first_variant.selectedOptions

	const found = choices.find(choice => choice.name === name)
		?? initial_choices.find(choice => choice.name === name)

	if (!found)
		throw new Error(`choice not found (${name})`)

	return found.value
}

export function get_selected_variant(product: GqlProduct, choices: Choice[]) {
	const [{node: first_variant}] = product.variants.edges
	return (product.variants.edges

		.find(({node: variant}) =>
			variant.selectedOptions

				.every(({name, value}) =>
					value === get_choice(name, product, choices)))

	)?.node ?? first_variant
}

export function get_primary_image(
		product: GqlProduct,
		choices: Choice[],
	) {

	const variant = get_selected_variant(product, choices)

	let image: GqlImage | undefined

	if (variant.image) {
		const edge = product.images.edges
			.find(({node: image}) => image.id === variant.image?.id)
		if (edge)
			image = edge.node
	}

	if (!image)
		image = get_featured_image(product)

	return image
}

export function number_of_images(product: GqlProduct) {
	return product.images.edges.length
}

export function get_primary_img(
		product: GqlProduct,
		choices: Choice[],
	): Img {
	const image = get_primary_image(product, choices)
	return image
		? {src: image.url_large, alt: image.altText}
		: placeholder_img
}

export function render_img(img: Img) {
	return html`
		<img src="${img.src}" alt="${img.alt}"/>
	`
}

export function render_image_for_variant(
		product: GqlProduct,
		variant: GqlVariant,
	) {

	let img: Img | undefined

	if (variant.image) {
		const edge = product.images.edges
			.find(({node: image}) => image.id === variant.image?.id)
		if (edge) {
			const {url_large, altText} = edge.node
			img = {src: url_large, alt: altText}
		}
	}

	if (!img)
		img = get_featured_img(product)

	return render_img(img)
}

export function render_options(
		product: GqlProduct,
		choices: Choice[],
		set_choice: (name: string, value: string) => void,
	) {

	function is_selected(name: string, value: string) {
		return value === get_choice(name, product, choices)
	}

	function handle_input(name: string) {
		return (event: InputEvent) => {
			const target = event.target as HTMLSelectElement
			set_choice(name, target.value)
		}
	}

	return product.options.map(({name, values}) => html`
		<label>
			<span>${name}</span>
			<select @input=${handle_input(name)}>
				${values.map(value => html`
					<option ?selected=${is_selected(name, value)}>
						${value}
					</option>
				`)}
			</select>
		</label>
	`)
}

