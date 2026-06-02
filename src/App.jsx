import { useState } from 'react';
import './App.css';
import Display from './components/Display/Display.jsx';
import IncrementButtons from './components/IncrementButtons/IncrementButtons.jsx';
import ButtonGrid from './components/ButtonGrid/ButtonGrid.jsx';

const BUTTONS = [
	'1',
	'2',
	'3',
	'+',
	'4',
	'5',
	'6',
	'-',
	'7',
	'8',
	'9',
	'×',
	'0',
	'.',
	'÷',
	'=',
	'C',
];

const OPERATOR_MAP = { '÷': '/', '×': '*' };
const OPERATOR_PATTERN = /[+\-÷×]$/;
const TOKENS_PATTERN = /(?:\d+\.\d+|\d+|[+\-*/])/g;

function Calculator() {
	const [result, setResult] = useState('0');

	const lastNumber = () => result.split(/[+\-*/]/).pop();

	const formatResult = (value) =>
		typeof value === 'number' && !Number.isInteger(value)
			? String(Number(value.toFixed(3)))
			: String(value);

	function evaluateExpression(expression) {
		const tokens = expression.match(TOKENS_PATTERN);
		if (!tokens) {
			throw new Error('Некорректное выражение');
		}

		const stagedTokens = [];
		for (let i = 0; i < tokens.length; i += 1) {
			const token = tokens[i];
			if (token === '*' || token === '/') {
				const left = parseFloat(stagedTokens.pop());
				const right = parseFloat(tokens[++i]);
				if (Number.isNaN(left) || Number.isNaN(right)) {
					throw new Error('Некорректное число');
				}
				const value = token === '*' ? left * right : left / right;
				if (!Number.isFinite(value)) {
					throw new Error('Деление на ноль');
				}
				stagedTokens.push(String(value));
			} else {
				stagedTokens.push(token);
			}
		}

		let resultValue = parseFloat(stagedTokens[0]);
		for (let i = 1; i < stagedTokens.length; i += 2) {
			const operator = stagedTokens[i];
			const number = parseFloat(stagedTokens[i + 1]);
			if (operator === '+') {
				resultValue += number;
			} else if (operator === '-') {
				resultValue -= number;
			} else {
				throw new Error('Некорректный оператор');
			}
		}

		return resultValue;
	}

	function increment() {
		setResult(String(Number(result) + 1));
	}

	function decrement() {
		setResult(String(Number(result) - 1));
	}

	function handleOperator(value) {
		if (result === '0' || OPERATOR_PATTERN.test(result)) {
			return;
		}

		setResult(result + (OPERATOR_MAP[value] ?? value));
	}

	function handleDecimal() {
		const current = lastNumber();
		if (!current.includes('.')) {
			setResult(result + '.');
		}
	}

	function handleDigit(value) {
		const current = lastNumber();
		if (result === '0') {
			setResult(value);
			return;
		}

		if (current === '0' && /[0-9]/.test(value)) {
			setResult(result.slice(0, -1) + value);
			return;
		}

		const decimalPart = current.split('.')[1];
		if (decimalPart && decimalPart.length >= 3 && /[0-9]/.test(value)) {
			return;
		}

		setResult(result + value);
	}

	function handleEquals() {
		const expression = result.replace(
			/[÷×]/g,
			(operator) => OPERATOR_MAP[operator],
		);
		try {
			setResult(formatResult(evaluateExpression(expression)));
		} catch {
			setResult('Ошибка');
		}
	}

	function handleClick(value) {
		switch (value) {
			case '+':
			case '-':
			case '÷':
			case '×':
				handleOperator(value);
				break;
			case '=':
				handleEquals();
				break;
			case 'C':
				setResult('0');
				break;
			case '.':
				handleDecimal();
				break;
			default:
				handleDigit(value);
		}
	}

	return (
		<div className='calculator-container'>
			<h1 className='calculator-title'>Calculator</h1>
			<div className='calculator'>
				<Display value={result} />
				<IncrementButtons
					onIncrement={increment}
					onDecrement={decrement}
				/>
				<ButtonGrid
					buttons={BUTTONS}
					onButtonClick={handleClick}
				/>
				<p>
					<strong>Technologies used:</strong> React, JSX, CSS Modules,
					JavaScript (useState, onClick, props, conditional, map(), events
					handling)
				</p>
			</div>
		</div>
	);
}

export default Calculator;
