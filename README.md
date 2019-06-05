# react-use-async-callback
React hook that provides a standard way generate async calls by returning a wrapped callback, and a executing and flag and error result.

## Installation

Install react-use-async-callback locally within your project folder, like so:

```shell
npm install react-use-async-callback
```

Or with yarn:

```shell
yarn add react-use-async-callback
```

## Usage

An example:

```ts
import { useAsyncCallback } from 'react-use-async-callback';

const [load, isLoading, loadingErrors] = useAsyncCallback(async () : Promise<any> => {
	// Perform your async task here.
}, []);
```

In this example: 

* load is a wrapped version of the passed in callback that manages isLoading and loadingErrors for you.
* isLoading is a boolean stored in the react state set to true when the callback is executing and false when the callback execution has finished.
* loadingErrors is a string stored in the react state containing any raised exception during execution of the callback.  It is cleared (set to an empty string) if execution completes with no errors.

## API reference

```ts
/**
 * React hook that provides a standard way generate async calls by returning a wrapped callback, and a executing and flag and error result.
 * 
 * @param callback Async callback that will be wrapped with the extended functionality and returned.
 * @param deps Dependencies passed to React's useCallback()
 */
useAsyncCallback<T extends (...args: any[]) => Promise<any>>(callback: T, deps: React.DependencyList): [T, boolean, string] 
```

## License

Licensed under the MIT license.
