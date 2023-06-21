
export function encode_for_hash(s: string) {
	return encodeURIComponent(s)
		.replace(/%20/g, "+")
}

