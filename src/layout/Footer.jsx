import PropTypes from 'prop-types';

export default function Footer({ children }) {
	return <footer className='flex items-end justify-center'>{children}</footer>;
}

// 👇️ define prop types for the component
Footer.propTypes = {
	children: PropTypes.node,
};
