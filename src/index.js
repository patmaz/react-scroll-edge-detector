import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

class BottomEdgeDetector extends React.Component {
  static propTypes = {
    onBottomReached: PropTypes.func.isRequired,
    blockCb: PropTypes.bool,
    debounce: PropTypes.number,
    throttle: PropTypes.throttle,
  };

  DEBOUNCE_TIME = this.props.debounce || 500;

  componentDidMount() {
    window.addEventListener('scroll', this.throttledHandleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.throttledHandleScroll);
  }

  debouncedCb = debounce(() => {
    this.props.onBottomReached && this.props.onBottomReached();
  }, this.DEBOUNCE_TIME);

  handleScroll = () => {
    if (this.props.blockCb) {
      return;
    }
    const rect = this.wrapper.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const wrapperHeight = this.wrapper.offsetHeight;

    if (windowHeight-wrapperHeight >= rect.top-10) {
      this.debouncedCb()
    }
  };

  throttledHandleScroll = throttle(this.handleScroll, this.props.throttle || 200);

  render() {
    return(
      <div style={{ paddingBottom: '2rem' }} ref={ref => this.wrapper = ref}>
        {this.props.children}
      </div>
    )
  }
}

export default BottomEdgeDetector;