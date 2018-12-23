# React Scroll Edge Detector

```
import BottomEdgeDetector from 'react-scroll-edge-detector';

<BottomEdgeDetector
    onBottomReached={this.handleLoadMore}
    blockCb={this.loading}
    debounce={500}
    throttle={200}
    offset={10}
>
    <SomeOtherComponent/>
</BottomEdgeDetector>
```