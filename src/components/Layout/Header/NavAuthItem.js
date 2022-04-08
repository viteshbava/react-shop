import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const NavAuthItem = ({ authRequired, children }) => {
  const { user: isLoggedIn } = useSelector((state) => state.auth);
  if (authRequired && !isLoggedIn) return null;
  if (!authRequired && isLoggedIn) return null;
  return children;
};

NavAuthItem.propTypes = {
  authRequired: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default NavAuthItem;
