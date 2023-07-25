
import {GqlCollection} from "shopify-shepherd"

export function bgstyle(collection: GqlCollection) {
	return collection.image
		? (`
			background-image:
				linear-gradient(var(--plate-color), var(--plate-color)),
				url('${collection.image.url_small}'
			);
		`)
		: ""
}

