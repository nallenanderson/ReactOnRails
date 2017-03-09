import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';

class Card extends Component {

	render() {
		const { card, connectDragSource, connectDropTarget } = this.props;
		// const { card, isDragging, connectDragSource, connectDropTarget } = this.props;
		// const opacity = isDragging ? 0 : 1;
    // console.log(opacity)
		return connectDragSource(connectDropTarget(
			<button className="btn">
				<span className="list-number">{this.props.index + 1}</span>
				{card.text}
			</button>
		));
	}
}

const cardSource = {

	beginDrag(props) {
		return {
			index: props.index,
			listId: props.listId,
			card: props.card
		};
	},

	endDrag(props, monitor) {
		const item = monitor.getItem();
		const dropResult = monitor.getDropResult();

		if ( dropResult && dropResult.listId !== item.listId ) {
			props.removeCard(item.index);
		}
	}
};

const cardTarget = {

	hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index;
		const hoverIndex = props.index;
		const sourceListId = monitor.getItem().listId;

		if (dragIndex === hoverIndex) {
			return;
		}

		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

		const clientOffset = monitor.getClientOffset();

		const hoverClientY = clientOffset.y - hoverBoundingRect.top;

		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return;
		}

		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return;
		}

		if ( props.listId === sourceListId ) {
			props.moveCard(dragIndex, hoverIndex);

			monitor.getItem().index = hoverIndex;
		}
	}
};

export default flow(
	DropTarget("CARD", cardTarget, connect => ({
		connectDropTarget: connect.dropTarget()
	})),
	DragSource("CARD", cardSource, (connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}))
)(Card);
