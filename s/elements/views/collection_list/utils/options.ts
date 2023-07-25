
import {GqlCollection} from "shopify-shepherd"

export type Options = {
	collections: GqlCollection[]
	make_link: (collection: GqlCollection) => string
}

