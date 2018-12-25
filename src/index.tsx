import * as React from 'react';
import { debounce, throttle } from 'lodash';

interface IProps {
  onBottomReached: () => void | Promise<any>;
  blockCb?: boolean;
  debounce?: number;
  throttle?: number;
  styles?: React.CSSProperties;
  offset?: number;
  initialCheck?: boolean;
}

const DEBOUNCE_TIME = 500;
const THROTTLE = 200;
const OFFSET = 10;

class BottomEdgeDetector extends React.Component<IProps> {
  wrapper: HTMLDivElement;

  componentDidMount() {
    window.addEventListener('scroll', this.throttledHandleScroll);
    this.props.initialCheck && this.makeInitialCheck();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.throttledHandleScroll);
  }

  makeInitialCheck = async () => {
    const { blockCb, onBottomReached } = this.props;
    if (blockCb) {
      return;
    }
    const windowHeight = window.innerHeight;
    const wrapperHeight = this.wrapper.offsetHeight;
    if (windowHeight - wrapperHeight >= 0) {
      await onBottomReached();
      this.makeInitialCheck();
    }
  };

  debouncedCb = debounce(() => {
    const { onBottomReached } = this.props;
    onBottomReached && onBottomReached();
  }, this.props.debounce || DEBOUNCE_TIME);

  handleScroll = () => {
    const { blockCb, offset } = this.props;
    if (blockCb) {
      return;
    }
    const rect = this.wrapper.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const wrapperHeight = this.wrapper.offsetHeight;

    if (windowHeight - wrapperHeight >= rect.top - (offset || OFFSET)) {
      this.debouncedCb();
    }
  };

  throttledHandleScroll = throttle(
    this.handleScroll,
    this.props.throttle || THROTTLE,
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
