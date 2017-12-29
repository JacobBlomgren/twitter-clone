import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from './Spinner';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeName(e) {
    this.setState({ name: e.target.value });
  }

  onChangeDescription(e) {
    this.setState({ description: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.updateSettings(this.state.name, this.state.description);
  }

  render() {
    if (this.props.fetching) return <Spinner fullPage />;
    const name = this.state.name || this.props.name;
    const description = this.state.description || this.props.description;
    return (
      <form className="Form" id="settings" onSubmit={this.onSubmit}>
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
        <input
          type="submit"
          value="Update"
          className="btn btn-primary Form__Button"
        />
      </form>
    );
  }
}

Settings.defaultProps = {
  name: '',
  description: '',
  fetching: false,
};

Settings.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  fetching: PropTypes.bool,
  updateSettings: PropTypes.func.isRequired,
};
