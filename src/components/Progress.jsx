import PropTypes from 'prop-types';

export default function Progress({ score, questions, index, answer }) {
	return (
		<div className='w-full'>
			<progress
				className='w-full block rounded-full'
				max={questions.length}
				value={index + Number(answer !== null)}
			/>
			<h3 className=' translate-y-[-85%]'>
				Score:{'  '}
				<b>
					{score}/{questions.length}
				</b>
			</h3>
		</div>
	);
}

// 👇️ define prop types for the component
Progress.propTypes = {
	question: PropTypes.object,
	dispatch: PropTypes.func,
	answer: PropTypes.string,
	correctAnswer: PropTypes.string,
	index: PropTypes.number,
	score: PropTypes.number,
	questions: PropTypes.array,
};
