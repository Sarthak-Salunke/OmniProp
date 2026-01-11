import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  children,
  onClick,
  className = '',
  size = 'md',
  variant = 'primary'
}) => {
  // CONTRACT-COMPLIANT: Size variants using mapped scale keys
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',    // 16px / 8px
    md: 'px-6 py-3 text-base',  // 24px / 12px  
    lg: 'px-8 py-4 text-lg'     // 32px / 16px
  };

  // Variant styles
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark shadow-md hover:shadow-lg',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    ghost: 'text-primary hover:bg-primary/5',
  };

  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-full transition-[background-color,border-color,color,box-shadow,transform,opacity,filter] duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${sizeClasses[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'accent', 'outline'])
};

export default Button;