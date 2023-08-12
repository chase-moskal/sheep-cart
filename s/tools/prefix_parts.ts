
export function prefix_parts(pre: string, parts: string) {
	return parts
		.split(",")
		.map(x => x.trim())
		.filter(x => !!x)
		.map(x => `${x}:${pre}-${x}`)
		.join(",")
}

export function copy_and_prefix_parts(pre: string, parts: string) {
	return parts
		.split(",")
		.map(x => x.trim())
		.filter(x => !!x)
		.map(x => `${x}, ${x}:${pre}-${x}`)
		.join(",")
}

