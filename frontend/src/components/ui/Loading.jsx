import React from 'react';

/**
 * Spinner component for loading states
 */
export const Spinner = ({ size = 'md', className = '' }) => {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16'
    };

    return (
        <div className={`inline-block ${sizeClasses[size]} ${className} will-change-transform`}>
            <div className="animate-spin rounded-full border-3 border-gray-200 border-t-secondary h-full w-full"></div>
        </div>
    );
};

/**
 * Loading overlay for full-page loading
 */
export const LoadingOverlay = ({ message = 'Loading...' }) => {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 shadow-2xl text-center">
                <Spinner size="lg" className="mx-auto mb-4" />
                <p className="text-estate-text font-medium">{message}</p>
            </div>
        </div>
    );
};

/**
 * Skeleton loader for text
 */
export const SkeletonText = ({ lines = 1, className = '' }) => {
    return (
        <div className={`space-y-3 ${className}`}>
            {[...Array(lines)].map((_, i) => (
                <div
                    key={i}
                    className="h-4 bg-gray-200 rounded animate-pulse will-change-opacity"
                    style={{ width: i === lines - 1 ? '80%' : '100%' }}
                ></div>
            ))}
        </div>
    );
};

/**
 * Skeleton loader for cards
 */
export const SkeletonCard = ({ className = '' }) => {
    return (
        <div className={`bg-white p-6 rounded-xl shadow-lg ${className}`}>
            <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="ml-4 flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                </div>
            </div>
            <SkeletonText lines={3} />
        </div>
    );
};

/**
 * Loading button state
 */
export const ButtonWithLoading = ({
    children,
    loading,
    disabled,
    onClick,
    className = '',
    ...props
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled || loading}
            className={`relative ${className} ${(disabled || loading) ? 'opacity-60 cursor-not-allowed' : ''
                }`}
            {...props}
        >
            {loading && (
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Spinner size="sm" />
                </span>
            )}
            <span className={loading ? 'invisible' : ''}>{children}</span>
        </button>
    );
};

export default Spinner;
