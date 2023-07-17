
export namespace Op {
	export type Mode = "loading" | "err" | "ready"

	export abstract class Base {
		abstract readonly mode: Mode
	}

	export class Loading extends Base {
		readonly mode = "loading"
	}

	export class Err extends Base {
		readonly mode = "err"
		constructor(public readonly reason: string) { super() }
	}

	export class Ready<X> extends Base {
		readonly mode = "ready"
		constructor(public readonly value: X) { super() }
	}

	export type Operation<X> = Loading | Err | Ready<X>

	export type Setter<X> = (op: Op.Operation<X>) => void

	export function select<X, A, B, C>(op: Operation<X>, choices: {
			loading: () => A
			error: (reason: string) => B
			ready: (value: X) => C
		}): A | B | C {

		if (op instanceof Loading)
			return choices.loading()

		else if (op instanceof Err)
			return choices.error(op.reason)

		else if (op instanceof Ready)
			return choices.ready(op.value)

		else {
			console.error("op", op)
			throw new Error("unknown op type")
		}
	}

	export async function run<X>(
			set_op: Setter<X>,
			fun: () => Promise<X>,
		) {

		set_op(new Loading())

		try {
			set_op(new Ready(await fun()))
		}
		catch (err) {
			const reason = (err instanceof Error) ?err.message :"error"
			set_op(new Err(reason))
		}
	}
}

