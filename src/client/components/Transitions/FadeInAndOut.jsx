import React from 'react';
import PropTypes from 'prop-types';
import Fade from './Fade';

export default class FadeInAndOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: true };

    setTimeout(() => this.setState({ show: false }), this.props.interval);
  }

  render() {
    console.log(this.state.show);
    return (
      <Fade in={this.state.show} onExited={this.props.onExited} appear>
        {this.props.children}
      </Fade>
    );
  }
}

FadeInAndOut.defaultProps = {
  interval: 5000,
  onExited: undefined,
};

FadeInAndOut.propTypes = {
  children: PropTypes.element.isRequired,
  interval: PropTypes.number,
  onExited: PropTypes.func,
};
