import { connect } from 'react-redux';

import Errors from '../components/Errors';

const mapStateToProps = ({ errors }) => ({ errors });

export default connect(mapStateToProps)(Errors);
