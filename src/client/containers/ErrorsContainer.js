import R from 'ramda';
import { connect } from 'react-redux';

import Errors from '../components/Errors';

export default connect(R.prop('errors'))(Errors);
