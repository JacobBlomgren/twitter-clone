import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import SearchIcon from 'react-icons/lib/fa/search';

// Since this component will probably be used in both NavMobile and NavDesktop
// the search input element will occur multiple times, and therefore its ID
// needs to be unique so we add append a unique integer to the end.
let idCount = 0;

export default class searchbar extends Component {
  constructor(props) {
    super(props);
    idCount += 1;
    this.state = { query: '', focus: false, searchID: idCount };
    this.search = props.search(redirectQuery =>
      this.setState({
        redirect: true,
        redirectQuery,
      }),
    );
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onFocus() {
    this.setState({ focus: true });
  }

  onBlur() {
    this.setState({ focus: false });
  }

  onChange(e) {
    this.setState({ query: e.target.value });
  }

  render() {
    console.log('asd');
    const { searching } = this.props;
    const { query, focus, searchID, redirect, redirectQuery } = this.state;
    // search?user=${redirectQuery}
    if (redirect) return <Redirect to={`settings`} />;
    return (
      <form
        className={`Searchbar ${focus ? 'Searchbar--Focused' : ''}`}
        onSubmit={() => !searching && this.search(query)}
      >
        <label htmlFor={`search${searchID}`} className="Searchbar__Label">
          <span className="sr-only">Search</span>
          <input
            id={`search${searchID}`}
            type="text"
            className="Searchbar__Input"
            value={query}
            onChange={this.onChange}
            placeholder="Search"
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          />
        </label>
        <button className="Searchbar__Button">
          <SearchIcon
            className={`Searchbar__Icon ${
              searching ? 'Searchbar__Icon--Disabled' : ''
            }`}
          />
        </button>
      </form>
    );
  }
}

searchbar.propTypes = {
  searching: PropTypes.bool.isRequired,
  search: PropTypes.func.isRequired,
};
