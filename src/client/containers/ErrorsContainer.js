import { connect } from 'react-redux';

import Errors from '../components/Errors';
import { removeError } from '../actions/error';

const mapStateToProps = ({ errors }) => ({ errors });

function mapDispatchToProps(dispatch) {
  return {
    removeError: id => dispatch(removeError(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Errors);
