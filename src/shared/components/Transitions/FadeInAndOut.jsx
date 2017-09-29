import React from 'react';
import PropTypes from 'prop-types';
import Fade from './Fade';

/**
 * Fades in a component and then fades it out again after a specified interval,
 * with the option of executing a function when the component has faded out.
 */
export default class FadeInAndOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: true };

    setTimeout(
      () => this.setState({ show: false }),
      this.props.interval || 5000,
    );
  }

  render() {
    return (
      <Fade in={this.state.show} onExited={this.props.onExited} appear>
        {this.props.children}
      </Fade>
    );
  }
}

FadeInAndOut.defaultProps = {
  interval: 0,
  onExited: undefined,
};

FadeInAndOut.propTypes = {
  children: PropTypes.element.isRequired,
  interval: PropTypes.number,
  onExited: PropTypes.func,
};
