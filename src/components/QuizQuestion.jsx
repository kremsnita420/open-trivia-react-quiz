import { decode } from 'html-entities';
import PropTypes from 'prop-types';
import QuizAnswers from './QuizAnswers';
import Progress from './Progress';
import { categories } from '../constants/data';
import Timer from './Timer';
export default function QuizQuestion({
	question,
	answer,
	correctAnswer,
	dispatch,
	index,
	score,
	questions,
	category,
	secondsRemaining,
}) {
	const categoryTitle = Object.values(categories).filter(
		(cat) => cat.code === Number(category)
	);

	return (
		<div className='text-center mb-6'>
			<h3 className='text-4xl lg:text-7xl pb-6 gradient_text'>
				<span className='mr-6'>✨</span>
				{categoryTitle[0].name}
				<span className='ml-6'>✨</span>
			</h3>

			<h4 className='text-2xl mb-12 md:mb-24'>
				<b className='block mb-6'>Question {index + 1}: </b>
				{decode(question?.question)}
			</h4>
			{answer === null && (
				<h4 className='text-2xl animate-wiggle mb-6 md:mb-12 tracking-wider text-green-500 font-extrabold'>
					&nbsp;
				</h4>
			)}
			{answer === correctAnswer && answer !== null && (
				<h4 className='text-2xl animate-wiggle mb-6 md:mb-12 tracking-wider text-green-500 font-extrabold'>
					CORRECT ❤️
				</h4>
			)}
			{answer !== correctAnswer && answer !== null && (
				<h4 className='text-2xl animate-wiggle mb-6 md:mb-12 tracking-wider text-red-500 font-extrabold'>
					WRONG 😭
				</h4>
			)}

			<Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
			<QuizAnswers
				answer={answer}
				dispatch={dispatch}
				correctAnswer={correctAnswer}
				question={question}
			/>

			<Progress
				score={score}
				questions={questions}
				index={index}
				answer={answer}
			/>
		</div>
	);
}
// 👇️ define prop types for the component
QuizQuestion.propTypes = {
	question: PropTypes.object,
	questions: PropTypes.array,
	dispatch: PropTypes.func,
	answer: PropTypes.string,
	correctAnswer: PropTypes.string,
	index: PropTypes.number,
	score: PropTypes.number,
	category: PropTypes.string,
	categories: PropTypes.array,
	secondsRemaining: PropTypes.number,
};
