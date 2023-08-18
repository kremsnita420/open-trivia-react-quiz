import PropTypes from 'prop-types';

export default function NextButton({
	dispatch,
	index,
	numberOfQuestions,
	answer,
}) {
	if (answer === null) return;

	if (index < numberOfQuestions - 1)
		return (
			<button
				className='btn_primary'
				onClick={() => dispatch({ type: 'nextQuestion' })}>
				Next
			</button>
		);

	if (index === numberOfQuestions - 1)
		return (
			<button
				className='btn_primary'
				onClick={() => dispatch({ type: 'finishQuiz' })}>
				Finish
			</button>
		);
}

// 👇️ define prop types for the component
NextButton.propTypes = {
	dispatch: PropTypes.func,
	numberOfQuestions: PropTypes.number,
	index: PropTypes.number,
	answer: PropTypes.string,
};
