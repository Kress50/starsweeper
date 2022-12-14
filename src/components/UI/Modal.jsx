import React from "react";
import { createPortal } from "react-dom";

function Backdrop(props) {
	return <div onClick={props.onClose}></div>;
}

function ModalOverlay(props) {
	return (
		<div>
			<div className={classes.content}>{props.children}</div>
		</div>
	);
}

const portalElement = document.getElementById("overlays");

export default function Modal(props) {
	return (
		<React.Fragment>
			{createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
			{createPortal(
				<ModalOverlay>{props.children}</ModalOverlay>,
				portalElement
			)}
		</React.Fragment>
	);
}
