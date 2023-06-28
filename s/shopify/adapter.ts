
import { obtool } from "@chasemoskal/magical"
import Shopify from "shopify-buy/index.es.js"

export type AdapterOptions = {
	domain: string
	storefrontAccessToken: string
}

export const apiVersion = "2023-04"

export class ShopifyAdapter {
	#client: any

	constructor({domain, storefrontAccessToken}: AdapterOptions) {
		this.#client = Shopify.buildClient({
			domain,
			apiVersion,
			storefrontAccessToken,
		})
	}

	async fetch_store_info() {
		return this.#client.shop.fetchInfo()
	}

	async fetch_all() {
		const products = await this.#client.product.fetchAll()
		console.log(products)
		return products
	}
}

export type GraphRequest = {
	query: string
	variables?: {[key: string]: any}
}

export class ShopifyMachine {
	#settings: AdapterOptions

	constructor(settings: AdapterOptions) {
		this.#settings = settings
	}

	async #request({query, variables}: {
			query: string
			variables?: {[key: string]: any}
		}) {

		const {domain, storefrontAccessToken} = this.#settings

		const url = `https://${domain}/api/${apiVersion}/graphql`
		const method = "POST"

		const headers = {
			"Content-Type": "application/json",
			"X-Shopify-Storefront-Access-Token": storefrontAccessToken,
		}

		const request = variables
			? {query, variables}
			: {query}

		const response = await fetch(url, {
			method,
			headers,
			mode: "cors",
			body: JSON.stringify(request),
		})

		return response.json()
	}

	async fetch_store_info() {
		return this.#request({
			query: `
				{
					shop {
						name
					}
				}
			`,
		})
	}

	async fetch_products() {}
}

export type ProductFields = (
	| "availableForSale"
	| "createdAt"
	| "description"
	| "descriptionHtml"
	| "handle"
	| "id"
	| "isGiftCard"
	| "onlineStoreUrl"
	| "productType"
	| "publishedAt"
	| "requiresSellingPlan"
	| "tags"
	| "title"
	| "totalInventory"
	| "updatedAt"
	| "vendor"
)

const max_page_size = 250

export function make_product_request({
		fields,
		after,
		page_size = max_page_size,
	}: {
		fields: ProductFields[]
		after?: string
		page_size?: number
	}): GraphRequest {

	fields = [...new Set(fields)]

	return {
		query: `
			{
				products(first: $first, after: $after) {
					edges {
						cursor
						node {
							${fields.join(", ")}
							collections(first: ${max_page_size}) {
								edges {
									node {
										id
									}
								}
							}
							images(first: ${max_page_size}) {
								edges {
									cursor
									node {
										alt
										src_original: url
										src_small: url(
											transform: {
												maxHeight: 300,
												maxWidth: 300,
												preferredContentType: WEBP
											}
										)
										src_big: url(
											transform: {
												maxHeight: 900,
												maxWidth: 900,
												preferredContentType: WEBP
											}
										)
									}
								}
							}
						}
					}
					pageInfo {
						hasNextPage
						endCursor
					}
				}
			}
		`,
		variables: {
			after,
			first: page_size,
		},
	}
}

export class ProductsRequest {
	#settings: AdapterOptions
	#fields: Set<ProductFields>

	constructor({settings, fields}: {
			settings: AdapterOptions
			fields: ProductFields[]
			page_size: number
		}) {
		this.#settings = settings
		this.#fields = new Set(fields)
	}
}

