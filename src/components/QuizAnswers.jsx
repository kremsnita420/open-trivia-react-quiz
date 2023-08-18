import PropTypes from 'prop-types';

import { decode } from 'html-entities';
export default function QuizAnswers({
	question,
	dispatch,
	answer,
	correctAnswer,
}) {
	// const correctAnswer = question.correct_answer;
	const hasAnswered = answer !== null;
	const answers = [
		...question.incorrect_answers,
		question.correct_answer,
	].sort();
	// declare the function
	// const shuffle = (array) => {
	// 	for (let i = array.length - 1; i > 0; i--) {
	// 		const j = Math.floor(Math.random() * (i + 1));
	// 		[array[i], array[j]] = [array[j], array[i]];
	// 	}
	// 	return array;
	// };
	// const shuffled = shuffle(answers);
	// eslint-disable-next-line no-unused-vars

	return (
		<div className='flex flex-col md:flex-row gap-4 items-start justify-start mb-12 md:mb-16 flex-wrap'>
			{answers.map((option, index) => (
				<button
					key={index}
					onClick={() =>
						dispatch({
							type: 'newAnswer',
							payload: {
								answer: option,
								correct: question.correct_answer,
							},
						})
					}
					disabled={hasAnswered}
					className={`mb-2 w-3/4 rounded-full border-4 hover:translate-x-2 transition-transform bg-gray-300 text-black disabled:cursor-not-allowed mx-auto p-2 ${
						answer === option
							? ' border-red-900 translate-x-2'
							: 'border-transparent'
					} ${
						hasAnswered
							? correctAnswer === option
								? 'bg-green-600'
								: 'bg-red-200'
							: ''
					}`}>
					{decode(option)}
				</button>
			))}
		</div>
	);
}

// 👇️ define prop types for the component
QuizAnswers.propTypes = {
	question: PropTypes.object,
	dispatch: PropTypes.func,
	answer: PropTypes.string,
	correctAnswer: PropTypes.string,
};
