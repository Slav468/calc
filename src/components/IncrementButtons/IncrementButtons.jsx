import './IncrementButtons.css';

function IncrementButtons({ onIncrement, onDecrement }) {
	return (
		<div className='increment-buttons'>
			<button
				className='increment'
				onClick={onIncrement}
			>
				+1
			</button>
			<button
				className='decrement'
				onClick={onDecrement}
			>
				-1
			</button>
		</div>
	);
}

export default IncrementButtons;
