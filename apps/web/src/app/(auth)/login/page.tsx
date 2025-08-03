'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Lock, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import SocialAuth from '@/components/feature/auth/social-auth';
import { PasswordInput, TextInput } from '@/components/forms';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';

// import { authClient } from '@/lib/auth-client';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await authClient.signIn.email(data);
      toast.success('Registration successful');
      return router.push('/login');
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="font-bold text-2xl">Welcome back</h1>
          <p className="text-balance text-muted-foreground">
            Login to your Acme Inc account
          </p>
        </div>
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
        <Button className="w-full" type="submit">
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            'Login'
          )}
        </Button>
        <SocialAuth />

        <div className="text-center text-sm">
          Don&apos;t have an account?{' '}
          <a className="underline underline-offset-4" href="/register">
            Sign up
          </a>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
