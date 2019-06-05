import * as React from 'react';

/**
 * React hook that provides a standard way generate async calls by returning a wrapped callback, and a executing and flag and error result.
 * 
 * @param callback Async callback that will be wrapped with the extended functionality and returned.
 * @param deps Dependencies passed to React's useCallback()
 */
export function useAsyncCallback<T extends (...args: any[]) => Promise<any>>(callback: T, deps: React.DependencyList): [T, boolean, string] {
    const [isExecuting, setIsExecuting] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>('');

    const wrappedCallback : T = React.useCallback(async (...argsx: any[]) => {
        setIsExecuting(true);

        try {
            let ret = await callback(...argsx);
            setError('');
            setIsExecuting(false);
            return ret;
        } catch (e) {
            setError(e);
            setIsExecuting(false);
        }
    }, [...deps, setIsExecuting, setError]) as T;

    return [wrappedCallback, isExecuting, error];
}
