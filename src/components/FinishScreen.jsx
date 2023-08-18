import PropTypes from 'prop-types';

export default function FinishScreen({ dispatch, score, questions }) {
	const numQuestions = questions.length;
	const percentage = (score / numQuestions) * 100;
	let emoji;
	if (percentage === 100) emoji = '🥇';
	if (percentage >= 80 && percentage < 100) emoji = '🥈';
	if (percentage >= 45 && percentage < 80) emoji = '🥉';
	if (percentage < 45) emoji = '💩';
	return (
		<div className='text-center m-auto'>
			<h3 className='text-3xl md:text-4xl font-extrabold mb-3'>Results:</h3>
			<p className='text-xl md:text-2xl'>
				<span>{emoji}</span>You scored <strong>{score}</strong> out of{' '}
				{numQuestions} points ({Math.ceil(percentage)}%).
			</p>

			<button
				className='btn_primary mt-12'
				onClick={() => dispatch({ type: 'goToSettings' })}>
				Restart quiz
			</button>
		</div>
	);
}

FinishScreen.propTypes = {
	dispatch: PropTypes.func,
	score: PropTypes.number,
	questions: PropTypes.array,
};
