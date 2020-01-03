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