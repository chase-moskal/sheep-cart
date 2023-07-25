
import {Op} from "@benev/frog"
import {GqlCollection, Shopify} from "shopify-shepherd"

import {Situation} from "../../context/types/situations.js"

export type PilotParams = {
	shopify: Shopify
	set_situation_op: Op.Setter<Situation.Whatever>
	home: "all_products" | "collection_list"
	collections_promise: Promise<GqlCollection[]>
}

