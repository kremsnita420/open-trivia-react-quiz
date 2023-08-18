import PropTypes from 'prop-types';
import { useEffect } from 'react';

function Timer({ dispatch, secondsRemaining }) {
	const mins = Math.floor(secondsRemaining / 60);
	const seconds = secondsRemaining % 60;

	useEffect(
		function () {
			const id = setInterval(function () {
				if (secondsRemaining === 0) {
					dispatch({ type: 'finish' });
				} else {
					dispatch({ type: 'tick' });
				}
			}, 1000);

			return () => clearInterval(id);
		},
		[dispatch, secondsRemaining]
	);

	return (
		<div className='mb-6'>
			{mins < 10 && '0'}
			{mins}:{seconds < 10 && '0'}
			{seconds}
		</div>
	);
}

export default Timer;

// 👇️ define prop types for the component
Timer.propTypes = {
	dispatch: PropTypes.func,
	secondsRemaining: PropTypes.number,
};
