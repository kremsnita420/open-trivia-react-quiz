import PropTypes from 'prop-types';

export default function FinishScreen({ dispatch, score, questions }) {
	const numQuestions = questions.length;
	const percentage = (score / numQuestions) * 100;
	let emoji;
	if (percentage === 100) emoji = '🥇';
	if (percentage >= 80 && percentage < 100) emoji = '🥈';
	if (percentage >= 45 && percentage < 80) emoji = '🥉';
	if (percentage < 45) emoji = '💩';

	const storedQuizzes = JSON.parse(localStorage.getItem('quizzes'));
	return (
		<>
			<div className='text-center m-auto mb-6 md:mb-12'>
				<h3 className='text-3xl md:text-4xl font-extrabold mb-3'>Results:</h3>
				<p className='text-xl md:text-2xl'>
					<span>{emoji}</span>You scored <strong>{score}</strong> out of{' '}
					{numQuestions} points ({Math.ceil(percentage)}%).
				</p>

				<button
					className='btn_primary mt-12 mx-2'
					onClick={() => dispatch({ type: 'restartQuiz' })}>
					Restart quiz
				</button>
				<button
					className='btn_primary mt-12 mx-2'
					onClick={() => dispatch({ type: 'goToSettings' })}>
					Initial screen
				</button>
			</div>
			<div className='text-center m-auto'>
				<h3 className='text-3xl md:text-4xl font-extrabold mb-3'>
					Previous Scores:
				</h3>
				<div className='flex flex-wrap'>
					{storedQuizzes.map((quiz, index) => (
						<p
							className='text-left mb-2 border-b-2 border-white w-full'
							key={index}>
							<span className='mr-4'>
								<b className='text-gray-500'>Title: </b>
								{quiz.title}
							</span>
							<span className='mr-4'>
								<b className='text-gray-500'>Score: </b>
								{quiz.score}
							</span>
							<span className='mr-4 capitalize'>
								<b className='text-gray-500'>Difficulty: </b>
								{quiz.difficulty}
							</span>
							<span className='mr-4'>
								<b className='text-gray-500'>Questions: </b>
								{quiz.numberOfQuestions}
							</span>

							<span>
								<b className='text-gray-500'>Percentage: </b>
								{Math.ceil((quiz.score / quiz.numberOfQuestions) * 100)} %
							</span>
						</p>
					))}
				</div>
			</div>
		</>
	);
}

FinishScreen.propTypes = {
	dispatch: PropTypes.func,
	score: PropTypes.number,
	questions: PropTypes.array,
	allFinishedQuizzes: PropTypes.array,
};
