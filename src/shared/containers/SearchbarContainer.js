import { connect } from 'react-redux';
import Searchbar from '../components/Nav/Searchbar';
import { search } from '../actions/search';

function mapStateToProps(state) {
  return {
    searching: state.network.search.fetching,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    search: callback => query => dispatch(search(callback, query)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
