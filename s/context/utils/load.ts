
enum Mode {
	Loading,
	Ready,
	Error,
}

export abstract class Load {
	static Mode = Mode
	constructor(public readonly mode: Mode) {}

	static Loading = class LoadLoading extends Load {
		constructor() {
			super(Mode.Loading)
		}
	}

	static Error = class LoadError extends Load {
		constructor(public readonly reason: string) {
			super(Mode.Error)
		}
	}

	static Ready = class LoadReady<X> extends Load {
		constructor(public readonly value: X) {
			super(Mode.Ready)
		}
	}
}

