# Day 34 Performance Profile

## Before

I used React DevTools Profiler while adding a dish.

The slowest component was:

* Routes: 5.6 ms

## Change

I used `React.memo` on the `Dish` component to prevent unnecessary re-renders.

```jsx
export default memo(Dish);
```

## After

I recorded the interaction again. The `Dish` component did not appear in the Ranked results.

## Result

The `Dish` component can now skip re-rendering when its props have not changed.

