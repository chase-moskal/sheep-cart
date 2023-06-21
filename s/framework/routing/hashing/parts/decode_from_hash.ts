
export function decode_from_hash(s: string) {
	return decodeURIComponent(s.replace(/\+/g, "%20"))
}

