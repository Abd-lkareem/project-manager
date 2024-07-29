import { forwardRef, useRef } from 'react';

export default forwardRef(function SelectedInput({  children , className = '', ...props }, ref) {
    const input = ref ? ref : useRef();

    return (
        <select
            {...props}

            className={
                'm-2 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm ' +
                className
            }
            ref={input}
        >
            <option value="">select status</option>
            {children.map(status => (
                <option value={status}>{status}</option>
        ))}
        </select>
    );
});
