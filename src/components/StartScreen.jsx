import PropTypes from 'prop-types';
import QuizSettings from './QuizSettings';

export default function StartScreen({
	dispatch,
	questionsLength,
	difficulty,
	category,
}) {
	return (
		<div className='text-center'>
			<h1 className='md:text-7xl leading-[1.1] text-center mb-12 md:mb-24 text-6xl gradient_text'>
				Welcome <br />
				to the
				<br /> Quiz-o-mania
			</h1>

			<QuizSettings
				questionsLength={questionsLength}
				difficulty={difficulty}
				category={category}
				dispatch={dispatch}
			/>

			<button
				onClick={() => dispatch({ type: 'startQuiz' })}
				className='btn_primary text-xl md:text-2xl'>
				Let&apos;s start 🏁
			</button>
		</div>
	);
}

StartScreen.propTypes = {
	numberOfQuestions: PropTypes.number,
	dispatch: PropTypes.func,
	questionsLength: PropTypes.string,
	difficulty: PropTypes.string,
	category: PropTypes.string,
};
