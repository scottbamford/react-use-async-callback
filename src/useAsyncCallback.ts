import * as React from 'react';
import { AsyncCallbackStatus } from './AsyncCallbackStatus';

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
export function useAsyncCallback<T extends (...args: any[]) => Promise<any>>(callback: T, deps: React.DependencyList): [T, AsyncCallbackStatus] {
    const [isExecuting, setIsExecuting] = React.useState<boolean>(false);
    const [error, setError] = React.useState<any>(undefined);
    const [success, setSuccess] = React.useState<boolean>(false);

    const wrappedCallback : T = React.useCallback(async (...argsx: any[]) => {
        setIsExecuting(true);
        setSuccess(false);

        try {
            let ret = await callback(...argsx);
            setSuccess(true);
            setError(undefined);
            setIsExecuting(false);
            return ret;
        } catch (e) {
            setError(e);
            setIsExecuting(false);

            // Pass on the exception so existing exception handling can handle it.
            throw e;
        }
    }, [...deps, setIsExecuting, setError]) as T;

    return [wrappedCallback, { isExecuting: isExecuting, errors: error, successfullyExecuted: success }];
}
