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
    <div className="mx-auto max-w-md space-y-8 p-6">
      <h2 className="font-bold text-2xl">Form Input Examples</h2>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {/* Basic text input */}
        <TextInput
          error={errors.name}
          label="Full Name"
          placeholder="Enter your full name"
          registration={register('name')}
          required
        />

        {/* Email input with icon */}
        <TextInput
          error={errors.email}
          helperText="We'll never share your email with anyone else"
          label="Email Address"
          leftIcon={<Mail />}
          placeholder="Enter your email"
          registration={register('email')}
          required
          type="email"
        />

        {/* Password input */}
        <PasswordInput
          error={errors.password}
          helperText="Must be at least 8 characters long"
          label="Password"
          leftIcon={<Lock />}
          placeholder="Create a strong password"
          registration={register('password')}
          required
        />

        {/* Phone input with icon */}
        <TextInput
          error={errors.phone}
          helperText="Optional - for account recovery"
          label="Phone Number"
          leftIcon={<Phone />}
          placeholder="(555) 123-4567"
          registration={register('phone')}
          type="tel"
        />

        {/* Search input with right icon */}
        <TextInput
          error={errors.search}
          label="Search"
          placeholder="Search for something..."
          registration={register('search')}
          rightIcon={<Search />}
          type="search"
        />

        {/* Input with error state */}
        <TextInput
          error={{
            type: 'manual',
            message: 'This is an example error message',
          }}
          label="Error Example"
          leftIcon={<AlertCircle />}
          placeholder="This field has an error"
          required
        />

        {/* Disabled input */}
        <TextInput
          disabled
          helperText="This field is currently disabled"
          label="Disabled Input"
          leftIcon={<User />}
          placeholder="This input is disabled"
        />

        <button
          className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
          type="submit"
        >
          Submit Form
        </button>
      </form>
    </div>
  );
};
