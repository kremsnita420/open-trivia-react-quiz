import PropTypes from 'prop-types';
import { categories } from '../constants/data';

export default function QuizSettings({
	dispatch,
	questionsLength,
	difficulty,
	category,
}) {
	const handleChange = (e) => {
		e.preventDefault();

		dispatch({
			type: 'quizSettings',
			field: e.target.name,
			payload: e.target.value,
		});
	};
	return (
		<form className='mb-20 md:mb-32 w-full md:w-1/2 mx-auto text-black'>
			<label
				className='text-white text-left w-full block mb-1'
				htmlFor='category'>
				Select category
			</label>
			<select
				className='w-full p-2 block mb-4 cursor-pointer'
				value={category}
				onChange={(e) => handleChange(e)}
				name='category'
				id='category'>
				{categories.map((cat, index) => (
					<option key={index} value={cat.code}>
						{cat.name}
					</option>
				))}
			</select>
			<label
				className='text-white text-left w-full block mb-1'
				htmlFor='questionsLength'>
				Number of questions
			</label>
			<select
				className='w-full p-2 block mb-4 cursor-pointer'
				value={questionsLength}
				onChange={(e) => handleChange(e)}
				name='questionsLength'
				id='questionsLength'>
				<option value='10'>10</option>
				<option value='15'>15</option>
				<option value='20'>20</option>
			</select>
			<label
				className='text-white text-left w-full block mb-1'
				htmlFor='difficulty'>
				Select difficulty
			</label>
			<select
				className='w-full p-2 block mb-4 cursor-pointer'
				value={difficulty}
				onChange={(e) => handleChange(e)}
				name='difficulty'
				id='difficulty'>
				<option value='Easy'>Easy</option>
				<option value='Medium'>Medium</option>
				<option value='Hard'>Hard</option>
			</select>
		</form>
	);
}

QuizSettings.propTypes = {
	dispatch: PropTypes.func,
	questionsLength: PropTypes.string,
	difficulty: PropTypes.string,
	category: PropTypes.string,
};
