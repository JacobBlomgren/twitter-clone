import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from './Spinner';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    const { name, description } = this.props;
    this.state = { name, description };

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
  }

  onChangeName(e) {
    this.setState({ name: e.target.value });
  }

  onChangeDescription(e) {
    this.setState({ description: e.target.value });
  }

  render() {
    if (this.props.fetching) return <Spinner fullPage />;
    const { name, description } = this.state;
    return (
      <form className="Form" id="settings">
        <label htmlFor="name" className="Form__Input__Label">
          <span>Name</span>
          <input
            type="text"
            value={name}
            onChange={this.onChangeName}
            className="Form__Input"
            id="name"
          />
        </label>
        <label htmlFor="description" className="Form__Input__Label">
          <span>Description</span>
          <textarea
            value={description}
            onChange={this.onChangeDescription}
            className="Form__Input Form__Textarea"
            id="description"
            rows="4"
            spellCheck="true"
            wrap="hard"
          />
        </label>
      </form>
    );
  }
}

Settings.defaultPropTypes = {
  name: '',
  description: '',
  fetching: false,
};

Settings.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  fetching: PropTypes.bool,
};
