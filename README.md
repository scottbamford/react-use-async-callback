# react-use-async-callback
React hook that provides a standard way to generate async callbacks by returning an array containing:
  1. a wrapped callback function
  2. a status object including:
      i. An executing flag
      ii. an error result created from any raised exceptions
      iii. an success flag that can be used if success is not otherwise indicated (often ignored and not captured from the returned values).

Any unwanted parts of the return can be ignored via descronstruction.

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

const [load, { isExecuting: isLoading, errors: loadingErrors, successfullyExecuted: loadingSuccess }] = useAsyncCallback(async () : Promise<any> => {
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
const [save, { isExecuting: isSaving, errors: savingErrors }] = useAsyncCallback(async () : Promise<any> => {
	// Perform your async task here.
}, []);
```

Or if you are also handling errors elsewhere:

```ts
const [save, { isExecuting: isSaving }] = useAsyncCallback(async () : Promise<any> => {
	// Perform your async task here.
}, []);
```

## API reference

```ts
/**
 * React hook that provides a standard way to generate async callbacks by returning an array containing:
 *  1. a wrapped callback function
 *  2. a status object including:
 *      i. An executing flag
 *      ii. an error result created from any raised exceptions
 *      iii. an success flag that can be used if success is not otherwise indicated (often ignored and not captured from the returned values).
 * 
 * @param callback Async callback that will be wrapped with the extended functionality and returned.
 * @param deps Dependencies passed to React's useCallback()
 */
export function useAsyncCallback<T extends (...args: any[]) => Promise<any>>(callback: T, deps: React.DependencyList): [T, AsyncCallbackStatus]

/**
 * Class containing the status of a useAsyncCallback() action.
 * 
 * This class replaces the three optional array arguments from useAsyncCallback() with a single class, which will make extending
 * the reported status easier in the future, and matches the way status is returned from other hook libraries a bit more closely now
 * there are more hook libraries around.
 */
export interface AsyncCallbackStatus {
    /**
     * True while the async action is being executed.
     */
    isExecuting: boolean,

    /**
     * Errors raised by the callback.
     */
    errors: any,

    /**
     * Flag set to true if the last invocation of the scallback executed successfully (i.e. without throwing any exceptions).
     */
    successfullyExecuted: boolean,
}
```

## Upgrading form previous versions

The object returned in the array from useAsyncCallback() changed in version 2.0.0 creating a breaking API change.  The decision was made for version 2.0.0 to combine the options representing
status into a single object, returned as the second part of the array, rather than returning each seperatly in the array.  This gives the caller more flexiblity on which items to use or ignore,
as well as a option to keep all this state in a single object where that is useful (for example when lots of callbacks are being used).

To update from version 1.x you will need to change the syntax of consuming the result to take into account the status object being returned.
This simply requires the use of the object desconstruction syntax rather than the array deconstruction syntax.  e.g.:

```ts
import { useAsyncCallback } from 'react-use-async-callback';

// Old style (react-use-async-callback 1.x)
const [load, isLoading, loadingErrors, loadingSuccess] = useAsyncCallback(async () : Promise<any> => {
	// Perform your async task here.
}, []);

// In the new style (react-use-async-callback 2.x) becomes
const [load, { isExecuting: isLoading, errors: loadingErrors, successfullyExecuted: loadingSuccess }] = useAsyncCallback(async () : Promise<any> => {
	// Perform your async task here.
}, []);

```


## License

Licensed under the MIT license.
