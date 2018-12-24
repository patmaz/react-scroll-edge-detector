import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

class BottomEdgeDetector extends React.Component {
  static propTypes = {
    onBottomReached: PropTypes.func.isRequired,
    blockCb: PropTypes.bool,
    debounce: PropTypes.number,
    throttle: PropTypes.number,
    styles: PropTypes.object,
    initialCheck: PropTypes.bool,
  };

  DEBOUNCE_TIME = 500;
  THROTTLE = 200;
  OFFSET = 10;

  componentDidMount() {
    window.addEventListener('scroll', this.throttledHandleScroll);
    this.props.initialCheck && this.makeInitialCheck();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.throttledHandleScroll);
  }

  makeInitialCheck = async () => {
    if (this.props.blockCb) {
      return;
    }
    const windowHeight = window.innerHeight;
    const wrapperHeight = this.wrapper.offsetHeight;
    if (windowHeight - wrapperHeight >= 0) {
      await this.props.onBottomReached();
      this.makeInitialCheck();
    }
  };

  debouncedCb = debounce(() => {
    this.props.onBottomReached && this.props.onBottomReached();
  }, this.props.debounce || this.DEBOUNCE_TIME);

  handleScroll = () => {
    if (this.props.blockCb) {
      return;
    }
    const rect = this.wrapper.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const wrapperHeight = this.wrapper.offsetHeight;

    if (
      windowHeight - wrapperHeight >=
      rect.top - (this.props.offset || this.OFFSET)
    ) {
      this.debouncedCb();
    }
  };

  throttledHandleScroll = throttle(
    this.handleScroll,
    this.props.throttle || this.THROTTLE,
  );

  render() {
    return (
      <div style={this.props.styles} ref={ref => (this.wrapper = ref)}>
        {this.props.children}
      </div>
    );
  }
}

export default BottomEdgeDetector;
