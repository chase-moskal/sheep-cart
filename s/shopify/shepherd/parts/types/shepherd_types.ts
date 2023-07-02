
export type Image = {
	altText: string
	id: string
	src_tiny: string
	src_small: string
	src_medium: string
	src_large: string
	src_original: string
}

export type Seo = {
	title: string
	description: string
}

export type Product = {
	collections: {id: string}[]
	images: Image[]
	seo: Seo

	availableForSale: boolean
	createdAt: string
	description: string
	descriptionHtml: string
	handle: string
	id: string
	isGiftCard: boolean
	onlineStoreUrl?: string
	productType: string
	publishedAt: string
	requiresSellingPlan: boolean
	tags: string[]
	title: string
	totalInventory: number
	updatedAt: string
	vendor: string
}

export type Collection = {
	image: Image
	seo: Seo

	description: string
	descriptionHtml: string
	handle: string
	id: string
	title: string
	updatedAt: string
	onlineStoreUrl: string
}

