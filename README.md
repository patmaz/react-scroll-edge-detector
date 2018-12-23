# React Scroll Edge Detector

```
import BottomEdgeDetector from 'scroll-edge-detector';

<BottomEdgeDetector
    onBottomReached={this.handleLoadMore}
    blockCb={this.loading}
    debounce={500}
    throttle={200}
>
    <SomeOtherComponent/>
</BottomEdgeDetector>
```