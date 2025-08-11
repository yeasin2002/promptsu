/** biome-ignore-all lint/style/noNestedTernary: <> */
'use client';

import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { forwardRef, type ReactNode, useId } from 'react';
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { cn } from '@/lib/utils';

interface TextInputProps {
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: FieldError;
  required?: boolean;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  inputClassName?: string;
  registration?: UseFormRegisterReturn;
  type?: 'text' | 'email' | 'tel' | 'url' | 'search';
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      placeholder,
      helperText,
      error,
      required = false,
      disabled = false,
      leftIcon,
      rightIcon,
      className,
      inputClassName,
      registration,
      type = 'text',
      ...props
    },
    ref
  ) => {
    const id = useId();
    const hasError = Boolean(error);
    const hasIcons = Boolean(leftIcon || rightIcon);

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
              'py-5',
              hasIcons && leftIcon && 'pl-10',
              hasIcons && rightIcon && 'pr-10',
              hasError && 'border-destructive focus-visible:border-destructive',
              inputClassName
            )}
            disabled={disabled}
            id={id}
            placeholder={placeholder}
            ref={ref}
            type={type}
            {...registration}
            {...props}
          />

          {rightIcon && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <div className="h-5 w-5 text-muted-foreground">{rightIcon}</div>
            </div>
          )}
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

TextInput.displayName = 'TextInput';

export { TextInput };
