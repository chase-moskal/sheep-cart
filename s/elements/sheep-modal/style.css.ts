
import {css} from "@chasemoskal/magical"

export const style = css`
	:host {
		position: absolute;
		z-index: 2;
		width: 100%;
	}

	dialog {
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: #222222f8;
		border: none;
		top: 0;
	}

	img {
		position: fixed;
		max-width: 90vw;
		max-height: 90vh;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border: 0.5em solid #ffffff5e;
		cursor: pointer;
		user-select: none;
	}
`
