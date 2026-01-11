/**
 * Handles API errors and returns user-friendly error messages
 * @param {Error} error - The error object from axios or fetch
 * @returns {Object} - Formatted error with message and status
 */
export const handleApiError = (error) => {
    // Network error (no response from server)
    if (!error.response) {
        return {
            message: 'Unable to connect to server. Please check your internet connection.',
            status: 0,
            isNetworkError: true
        };
    }

    // HTTP error responses
    const { status, data } = error.response;

    switch (status) {
        case 400:
            return {
                message: data?.error || data?.message || 'Invalid request. Please check your input.',
                status: 400
            };
        case 401:
            return {
                message: 'Unauthorized. Please log in again.',
                status: 401
            };
        case 403:
            return {
                message: 'Access denied. You do not have permission to perform this action.',
                status: 403
            };
        case 404:
            return {
                message: data?.error || 'The requested resource was not found.',
                status: 404
            };
        case 500:
            return {
                message: 'Server error. Please try again later.',
                status: 500
            };
        case 503:
            return {
                message: 'Service temporarily unavailable. Please try again later.',
                status: 503
            };
        default:
            return {
                message: data?.error || data?.message || 'An unexpected error occurred.',
                status: status
            };
    }
};

/**
 * Wrapper for async API calls with error handling
 * @param {Function} apiCall - The async function to execute
 * @param {Function} onError - Optional error handler callback
 * @returns {Promise} - The result or handled error
 */
export const withErrorHandling = async (apiCall, onError) => {
    try {
        return await apiCall();
    } catch (error) {
        const handledError = handleApiError(error);

        // Log to console in development
        if (process.env.NODE_ENV === 'development') {
            console.error('API Error:', handledError);
        }

        // Call custom error handler if provided
        if (onError) {
            onError(handledError);
        }

        throw handledError;
    }
};
