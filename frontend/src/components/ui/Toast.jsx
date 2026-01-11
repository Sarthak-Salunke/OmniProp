import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const ToastContext = createContext(null);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info', duration = 3000) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);

        if (duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }

        return id;
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const toast = {
        success: (message, duration) => addToast(message, 'success', duration),
        error: (message, duration) => addToast(message, 'error', duration),
        warning: (message, duration) => addToast(message, 'warning', duration),
        info: (message, duration) => addToast(message, 'info', duration),
    };

    return (
        <ToastContext.Provider value={toast}>
            {children}
            <ToastContainer toasts={toasts} onRemove={removeToast} />
        </ToastContext.Provider>
    );
};

const ToastContainer = ({ toasts, onRemove }) => {
    return (
        <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
            {toasts.map(toast => (
                <Toast key={toast.id} {...toast} onClose={() => onRemove(toast.id)} />
            ))}
        </div>
    );
};

const Toast = ({ message, type, onClose }) => {
    const config = {
        success: {
            icon: CheckCircle,
            className: 'bg-emerald-50 border-emerald-200 text-emerald-800',
            iconClassName: 'text-emerald-500'
        },
        error: {
            icon: AlertCircle,
            className: 'bg-red-50 border-red-200 text-red-800',
            iconClassName: 'text-red-500'
        },
        warning: {
            icon: AlertTriangle,
            className: 'bg-yellow-50 border-yellow-200 text-yellow-800',
            iconClassName: 'text-yellow-500'
        },
        info: {
            icon: Info,
            className: 'bg-teal-50 border-teal-200 text-teal-800',
            iconClassName: 'text-teal-600'
        }
    };

    const { icon: Icon, className, iconClassName } = config[type] || config.info;

    return (
        <div
            className={`${className} border rounded-lg shadow-lg p-4 flex items-start gap-3 animate-slide-in-right min-w-[300px]`}
        >
            <Icon className={`${iconClassName} w-5 h-5 flex-shrink-0 mt-0.5`} />
            <p className="flex-1 text-sm font-medium">{message}</p>
            <button
                onClick={onClose}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};

export default ToastProvider;
