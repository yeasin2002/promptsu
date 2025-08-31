'use client';

import SocialAuth from '@/components/feature/auth/social-auth';
import { PasswordInput, TextInput } from '@/components/forms';
import { authClient } from '@/lib/auth-client';
import { notifyExtensionAuthChange } from '@/lib/extension-sync';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@workspace/ui/shadcn/button';
import { Loader2, Lock, Mail, User } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const result = await authClient.signUp.email(
        { ...data, callbackURL: '/prompts' },
        {
          onSuccess: (ctx) => {
            console.log('Registration successful:', ctx);
            toast.success('Registration successful');
            // Notify extension of successful registration
            notifyExtensionAuthChange(ctx.data);
          },
          onError: (error) => {
            console.error('Registration error:', error);
            toast.error(error?.error?.message || 'Registration failed');
          },
        }
      );
    } catch (error) {
      console.error('Registration exception:', error);
      toast.error((error as Error).message || 'An unexpected error occurred');
    }
  };

  return (
    <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="font-bold text-2xl">Create Account</h1>
          <p className="text-balance text-muted-foreground">
            Sign up for a new account
          </p>
        </div>

        <TextInput
          error={errors.name}
          label="Name"
          leftIcon={<User />}
          placeholder="Enter your name"
          registration={register('name')}
          required
        />

        <TextInput
          error={errors.email}
          label="Email address"
          leftIcon={<Mail />}
          placeholder="Enter your email"
          registration={register('email')}
          required
          type="email"
        />

        <PasswordInput
          error={errors.password}
          label="Password"
          leftIcon={<Lock />}
          placeholder="Enter your password"
          registration={register('password')}
          required
        />
        <PasswordInput
          error={errors.confirmPassword}
          label="confirm Password"
          leftIcon={<Lock />}
          placeholder="Enter your password again"
          registration={register('confirmPassword')}
          required
        />

        <Button className="w-full" type="submit">
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            'Sign up'
          )}
        </Button>
        <SocialAuth />

        <div className="text-center text-sm">
          Already have an account?
          <Link className="underline underline-offset-4" href="/login">
            Login
          </Link>
        </div>
      </div>
    </form>
  );
};

export default RegisterPage;
