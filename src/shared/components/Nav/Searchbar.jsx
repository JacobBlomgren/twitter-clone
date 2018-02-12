import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Search from 'react-icons/lib/fa/search';

// Since this component will probably be used in both NavMobile and NavDesktop
// the search input element will occur multiple times, and therefore its ID
// needs to be unique so we add append a unique integer to the end.
let idCount = 0;

export default class searchbar extends Component {
  constructor(props) {
    super(props);
    idCount += 1;
    this.state = { value: '', focus: false, searchID: idCount };
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
    this.setState({ value: e.target.value });
  }

  render() {
    const { value, focus, searchID } = this.state;
    return (
      <form className={`Searchbar ${focus ? 'Searchbar--Focused' : ''}`}>
        <label htmlFor={`search${searchID}`} className="Searchbar__Label">
          <span className="sr-only">Search</span>
          <input
            id={`search${searchID}`}
            type="text"
            className="Searchbar__Input"
            value={value}
            onChange={this.onChange}
            placeholder="Search"
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          />
        </label>
        <button className="Searchbar__Button">
          <Search className="Searchbar__Icon" />
        </button>
      </form>
    );
  }
}

searchbar.propTypes = {};
