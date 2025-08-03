'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Lock, Mail, Phone, Search, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { PasswordInput, TextInput } from '@/components/forms';

const exampleSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().optional(),
  search: z.string().optional(),
});

type ExampleFormData = z.infer<typeof exampleSchema>;

export const FormExamples = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExampleFormData>({
    resolver: zodResolver(exampleSchema),
  });

  const onSubmit = (data: ExampleFormData) => {
    console.log('Form submitted:', data);
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-bold">Form Input Examples</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic text input */}
        <TextInput
          label="Full Name"
          placeholder="Enter your full name"
          registration={register('name')}
          error={errors.name}
          required
        />

        {/* Email input with icon */}
        <TextInput
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          leftIcon={<Mail />}
          registration={register('email')}
          error={errors.email}
          required
          helperText="We'll never share your email with anyone else"
        />

        {/* Password input */}
        <PasswordInput
          label="Password"
          placeholder="Create a strong password"
          leftIcon={<Lock />}
          registration={register('password')}
          error={errors.password}
          required
          helperText="Must be at least 8 characters long"
        />

        {/* Phone input with icon */}
        <TextInput
          label="Phone Number"
          type="tel"
          placeholder="(555) 123-4567"
          leftIcon={<Phone />}
          registration={register('phone')}
          error={errors.phone}
          helperText="Optional - for account recovery"
        />

        {/* Search input with right icon */}
        <TextInput
          label="Search"
          type="search"
          placeholder="Search for something..."
          rightIcon={<Search />}
          registration={register('search')}
          error={errors.search}
        />

        {/* Input with error state */}
        <TextInput
          label="Error Example"
          placeholder="This field has an error"
          leftIcon={<AlertCircle />}
          error={{
            type: 'manual',
            message: 'This is an example error message',
          }}
          required
        />

        {/* Disabled input */}
        <TextInput
          label="Disabled Input"
          placeholder="This input is disabled"
          leftIcon={<User />}
          disabled
          helperText="This field is currently disabled"
        />

        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
        >
          Submit Form
        </button>
      </form>
    </div>
  );
};
