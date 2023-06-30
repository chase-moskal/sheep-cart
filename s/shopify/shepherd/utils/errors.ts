
export class ShepherdError extends Error {
	name = this.constructor.name
}

export class ShepherdResponseError extends ShepherdError {
	constructor({message, path}: {message: string, path: string[]}) {
		super(`${message} ⮞ ${path.join(" 🡪 ")}`)
	}
}

