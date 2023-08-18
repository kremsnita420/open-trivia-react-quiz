// 👇️ import PropTypes
import PropTypes from 'prop-types';

export default function Main({ children }) {
	return <main>{children}</main>;
}

// 👇️ define prop types for the component
Main.propTypes = {
	children: PropTypes.node,
};
