
import {css} from "lit"

export const theme = css`

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

.standard-content {
	& * + * {
		margin-top: 0.7em;
	}

	:is(ul, ol) {
		padding-left: 1.2em;
	}
}

.error {
	display: flex;
	color: #d94c4c;
	align-items: center;
	& svg {
		margin-right: 0.5em;
		width: 1.8em;
	}
}

.loading {
	& svg {
		animation: rotate-animation 10s infinite linear;
	}
}

@keyframes rotate-animation {
	0% {
		transform: rotate(0deg);
  }
  50% {
		transform: rotate(180deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
`

