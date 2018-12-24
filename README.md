# React Scroll Edge Detector

## Demo

[Codesandbox DEMO](https://codesandbox.io/s/wlmo3zrmw)

## Props

Prop | Default | Type | Description
--- | --- | --- | --- |
`onBottomReached` | - | function | the function triggered when the bottom of the component has reached the bottom of the page
`blockCb` | `undefined` | boolean | the condition when the `onBottomReached` is blocked
`debounce` | `500` | number | debounce parameter in ms
`throttle` | `200` | number | throttle parameter in ms
`offset` | `10` | number | offset in px
`styles` | `undefined` | object | extra styling
`initialCheck` | `undefined` | boolean | `onBottomReached` is called multiple times to fill in the whole height of the page (the `onBottomReached` must return a promise)

## Example

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