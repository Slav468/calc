import './ButtonGrid.css';

function ButtonGrid({ buttons, onButtonClick }) {
	const getButtonClass = (item) => {
		if (item === '=') return 'equals';
		if (item === 'C') return 'clear';
		if (item === '+' || item === '-' || item === '÷' || item === '×') {
			return 'operator';
		}
		return '';
	};

	return (
		<div className='buttons'>
			{buttons.map((item) => (
				<button
					key={item}
					onClick={() => onButtonClick(item)}
					className={`button-base ${getButtonClass(item)}`}
				>
					{item}
				</button>
			))}
		</div>
	);
}

export default ButtonGrid;
