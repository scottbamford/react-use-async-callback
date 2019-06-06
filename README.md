# react-use-async-callback
React hook that provides a standard way to generate async callbacks by returning an array containing:
  1. a wrapped callback function
  2. an executing flag
  3. an error result created from any raised exceptions
  4. a success flag that can be used if success is not otherwise indicated (often ignored and not captured from the returned values).

Any unwanted parts of the return can be ignored.

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

const [load, isLoading, loadingErrors, loadingSuccess] = useAsyncCallback(async () : Promise<any> => {
	// Perform your async task here.
}, []);
```

In this example: 

* load is a wrapped version of the passed in callback that manages isLoading and loadingErrors for you.
* isLoading is a boolean stored in the react state set to true when the callback is executing and false when the callback execution has finished.
* loadingErrors is a string stored in the react state containing any raised exception during execution of the callback.  It is cleared (set to an empty string) if execution completes with no errors.
* loadingSuccess is a boolean that is true when the task completed successfully.


Often the success of a task is handled by the task itself, so the success flag can be omitted from the returned values:

```ts
const [save, isSaving, savingErrors] = useAsyncCallback(async () : Promise<any> => {
	// Perform your async task here.
}, []);
```

Or if you are also handling errors elsewhere:

```ts
const [save, isSaving] = useAsyncCallback(async () : Promise<any> => {
	// Perform your async task here.
}, []);
```

## API reference

```ts
/**
 * React hook that provides a standard way to generate async callbacks by returning an array containing:
 *  1. a wrapped callback function
 *  2. an executing flag
 *  3. an error result created from any raised exceptions
 *  4. an success flag that can be used if success is not otherwise indicated (often ignored and not captured from the returned values).
 * 
 * @param callback Async callback that will be wrapped with the extended functionality and returned.
 * @param deps Dependencies passed to React's useCallback()
 */
function useAsyncCallback<T extends (...args: any[]) => Promise<any>>(callback: T, deps: React.DependencyList): [T, boolean, string, boolean]
```

## License

Licensed under the MIT license.
