import { useEffect, useReducer, useState } from 'react';

import Main from './layout/Main';
import Loader from './components/Loader';
import Error from './components/Error';
import StartScreen from './components/StartScreen';
import Question from './components/QuizQuestion';
import Footer from './layout/Footer';
import NextButton from './components/NextButton';
import FinishScreen from './components/FinishScreen';

const SECS_PER_QUESTION = 30;
const initialState = {
	// 'loading', 'error', 'ready', 'active', 'finished'
	status: 'loading',
	questions: [],
	index: 0,
	answer: null,
	correctAnswer: null,
	score: 0,
	questionsLength: '10',
	difficulty: 'easy',
	category: '9',
	secondsRemaining: null,
	finishedQuiz: {},
	allFinishedQuizzes: [],
};

function reducer(state, action) {
	switch (action.type) {
		case 'quizSettings':
			return {
				...state,
				[action.field]: action.payload,
			};
		case 'dataReceived':
			return {
				...state,
				questions: action.payload,
				status: 'ready',
			};
		case 'dataFailed':
			return {
				...state,
				status: 'error',
			};
		case 'startQuiz':
			return {
				...state,
				status: 'active',
				secondsRemaining: state.questions.length * SECS_PER_QUESTION,
			};
		case 'newAnswer':
			return {
				...state,
				answer: action.payload.answer,
				correctAnswer: action.payload.correct,
				score:
					action.payload.answer === action.payload.correct
						? state.score + 1
						: state.score,
			};
		case 'nextQuestion':
			return {
				...state,
				index: state.index + 1,
				answer: null,
			};
		case 'tick':
			return {
				...state,
				secondsRemaining: state.secondsRemaining - 1,
				state:
					state.secondsRemaining === 0 || state.index === state.index.length
						? 'finished'
						: state.status,
			};
		case 'finishQuiz':
			return {
				...state,
				status: 'finished',
				finishedQuiz: {
					title: state.questions[0].category,
					score: state.score,
					difficulty: state.difficulty,
					numberOfQuestions: state.questionsLength,
				},
			};
		case 'restartQuiz':
			return {
				...initialState,
				questions: state.questions,
				secondsRemaining: state.questions.length * SECS_PER_QUESTION,
				status: 'active',
			};
		case 'goToSettings':
			return {
				...initialState,
				questions: state.questions,
				status: 'ready',
			};

		default:
			throw new Error('Action unknown');
	}
}

function App() {
	const [
		{
			questions,
			status,
			answer,
			correctAnswer,
			score,
			index,
			questionsLength,
			difficulty,
			category,
			secondsRemaining,
			finishedQuiz,
		},
		dispatch,
	] = useReducer(reducer, initialState);
	const numberOfQuestions = questions.length;

	const [allFinishedQuizzes, setAllFinishedQuizzes] = useState([]);

	useEffect(() => {
		const isObjectEmpty = (objectName) => {
			return Object.keys(objectName).length === 0;
		};
		if (isObjectEmpty(finishedQuiz) === false) {
			setAllFinishedQuizzes((current) => [...current, finishedQuiz]);
		}
	}, [finishedQuiz]);

	localStorage.setItem('quizzes', JSON.stringify(allFinishedQuizzes));

	useEffect(
		function () {
			fetch(
				`https://opentdb.com/api.php?amount=${questionsLength}&category=${category}&difficulty=${difficulty}&type=multiple`
			)
				.then((res) => res.json())
				.then((data) =>
					dispatch({ type: 'dataReceived', payload: data.results })
				)
				.catch((err) => dispatch({ type: 'dataFailed', payload: err }));
		},
		[questionsLength, difficulty, category]
	);

	return (
		<div className='max-w-7xl mx-auto mt-10 md:mt-32 px-10'>
			<Main>
				{status === 'loading' && <Loader />}
				{status === 'error' && <Error />}
				{status === 'ready' && (
					<StartScreen
						numberOfQuestions={numberOfQuestions}
						index={index}
						dispatch={dispatch}
						questionsLength={questionsLength}
						difficulty={difficulty}
						category={category}
					/>
				)}

				{status === 'active' && (
					<>
						<Question
							index={index}
							answer={answer}
							correctAnswer={correctAnswer}
							dispatch={dispatch}
							question={questions[index]}
							score={score}
							questions={questions}
							category={category}
							secondsRemaining={secondsRemaining}
						/>
						<Footer>
							<NextButton
								numberOfQuestions={numberOfQuestions}
								dispatch={dispatch}
								index={index}
								correctAnswer={correctAnswer}
								answer={answer}
							/>
						</Footer>
					</>
				)}
				{status === 'finished' && (
					<FinishScreen
						questions={questions}
						score={score}
						dispatch={dispatch}
					/>
				)}
			</Main>
		</div>
	);
}

export default App;
