/** biome-ignore-all lint/style/noNestedTernary: <> */
'use client';

import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { forwardRef, type ReactNode, useId, useState } from 'react';
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { cn } from '@/lib/utils';

interface PasswordInputProps {
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: FieldError;
  required?: boolean;
  disabled?: boolean;
  leftIcon?: ReactNode;
  className?: string;
  inputClassName?: string;
  registration?: UseFormRegisterReturn;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      label,
      placeholder = 'Enter your password',
      helperText,
      error,
      required = false,
      disabled = false,
      leftIcon,
      className,
      inputClassName,
      registration,
      ...props
    },
    ref
  ) => {
    const id = useId();
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const hasError = Boolean(error);

    const toggleVisibility = () => setIsVisible((prevState) => !prevState);

    return (
      <div className={cn('space-y-2', className)}>
        {label && (
          <Label className="font-medium text-sm" htmlFor={id}>
            {label}
            {required && <span className="ml-1 text-destructive">*</span>}
          </Label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <div className="h-5 w-5 text-muted-foreground">{leftIcon}</div>
            </div>
          )}

          <Input
            aria-describedby={
              error ? `${id}-error` : helperText ? `${id}-helper` : undefined
            }
            aria-invalid={hasError}
            className={cn(
              'py-5 pr-10',
              leftIcon && 'pl-10',
              hasError && 'border-destructive focus-visible:border-destructive',
              inputClassName
            )}
            disabled={disabled}
            id={id}
            placeholder={placeholder}
            ref={ref}
            type={isVisible ? 'text' : 'password'}
            {...registration}
            {...props}
          />

          <button
            aria-label={isVisible ? 'Hide password' : 'Show password'}
            aria-pressed={isVisible}
            className="absolute inset-y-0 right-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            disabled={disabled}
            onClick={toggleVisibility}
            type="button"
          >
            {isVisible ? (
              <EyeOffIcon aria-hidden="true" size={16} />
            ) : (
              <EyeIcon aria-hidden="true" size={16} />
            )}
          </button>
        </div>

        {error && (
          <p className="text-destructive text-sm" id={`${id}-error`}>
            {error.message}
          </p>
        )}

        {helperText && !error && (
          <p className="text-muted-foreground text-sm" id={`${id}-helper`}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
