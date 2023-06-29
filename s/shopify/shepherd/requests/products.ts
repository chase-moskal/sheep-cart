
import {graphql} from "../parts/graphql.js"
import {ImageFormat, image} from "./units/image.js"
import {GraphRequest} from "../utils/graph_request.js"

const max_page_size = 250

export function make_request_for_products({
		after,
		image_format = "WEBP",
		page_size = max_page_size,
	}: {
		after?: string
		page_size?: number
		image_format?: ImageFormat
	}): GraphRequest {

	return {
		query: graphql`
			query FetchProducts($first: Int!, $after: Int) {
				products(first: $first, after: $after) {
					edges {
						cursor
						node {

							availableForSale
							createdAt
							description
							descriptionHtml
							handle
							id
							isGiftCard
							onlineStoreUrl
							productType
							publishedAt
							requiresSellingPlan
							tags
							title
							totalInventory
							updatedAt
							vendor

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
										${image(image_format)}
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

