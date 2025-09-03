'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@workspace/ui/shadcn/button';
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/shadcn/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@workspace/ui/shadcn/form';
import { Input } from '@workspace/ui/shadcn/input';
import { Label } from '@workspace/ui/shadcn/label';
import { RadioGroup, RadioGroupItem } from '@workspace/ui/shadcn/radio-group';
import { Textarea } from '@workspace/ui/shadcn/textarea';
import { CheckCircle, Heart, Star } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import LightRays from '@/components/ui/light-rays';

// Zod schema for form validation
const uninstallFeedbackSchema = z.object({
  reason: z.string().min(1, 'Please select a reason for uninstalling'),
  feedback: z.string().optional(),
  email: z.union([z.literal(''), z.string().email('Please enter a valid email address')]).optional(),
});

type UninstallFeedbackForm = z.infer<typeof uninstallFeedbackSchema>;

const ExtensionUninstallPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const uninstallReasons = [
    { id: 'not-useful', label: 'Not useful for my needs' },
    { id: 'too-complex', label: 'Too complex to use' },
    { id: 'performance', label: 'Performance issues' },
    { id: 'privacy', label: 'Privacy concerns' },
    { id: 'alternative', label: 'Found a better alternative' },
    { id: 'temporary', label: 'Temporary removal' },
    { id: 'other', label: 'Other reason' },
  ];

  const form = useForm<UninstallFeedbackForm>({
    resolver: zodResolver(uninstallFeedbackSchema),
    defaultValues: {
      reason: '',
      feedback: '',
      email: '',
    },
  });

  const onSubmit = async (data: UninstallFeedbackForm) => {
    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual API endpoint later
      console.log('Submitting feedback:', data);

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Here you would typically send data to your API
      // const response = await fetch('/api/uninstall-feedback', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });

      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      // Handle error - you could show a toast notification here
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-black text-white">
        <div className="relative z-10 flex min-h-screen items-center justify-center">
          <div className="mx-auto max-w-2xl space-y-6 px-6 text-center">
            <div className="mb-6 flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h1 className="bg-gradient-to-r from-white to-gray-300 bg-clip-text font-bold text-5xl text-transparent md:text-6xl">
              Thank you for your feedback!
            </h1>
            <p className="text-gray-400 text-xl leading-relaxed">
              Your input helps us improve. We hope to welcome you back in the future.
            </p>
            <div className="flex items-center justify-center gap-2 text-green-500">
              <Heart className="h-5 w-5" />
              <span className="text-lg">We appreciate you</span>
            </div>
          </div>
        </div>

        <LightRays
          distortion={0.05}
          followMouse={true}
          lightSpread={0.8}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          rayLength={1.2}
          raysColor="#22c55e"
          raysOrigin="top-center"
          raysSpeed={1.5}
        />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="relative z-10 flex min-h-screen items-center justify-center py-12">
        <div className="mx-auto w-full max-w-4xl px-6">
          {/* Header Section */}
          <div className="mb-12 space-y-6 text-center">
            <h1 className="font-bold text-5xl text-gradient text-transparent md:text-7xl">Sorry to see you go!</h1>
            <p className="mx-auto max-w-3xl text-gray-400 text-xl leading-relaxed md:text-2xl">
              We're always working to improve. Your feedback helps us build a better experience for everyone.
            </p>
          </div>

          {/* Feedback Form */}
          <Card className="border-gray-800 bg-gray-900/50 py-8 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2 text-center text-2xl text-white">
                <Star className="h-6 w-6 text-green-500" />
                Help us improve
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <Form {...form}>
                <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                  {/* Reason Selection */}
                  <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel className="font-medium text-lg text-white">
                          What's the main reason for uninstalling? *
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            className="grid grid-cols-1 gap-3 md:grid-cols-2"
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            {uninstallReasons.map((reason) => (
                              <div
                                className="flex items-center space-x-3 rounded-lg border border-gray-700 p-3 transition-colors hover:border-green-500/50"
                                key={reason.id}
                              >
                                <RadioGroupItem
                                  className="border-gray-600 text-green-500"
                                  id={reason.id}
                                  value={reason.id}
                                />
                                <Label className="flex-1 cursor-pointer text-gray-300" htmlFor={reason.id}>
                                  {reason.label}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  {/* Additional Feedback */}
                  <FormField
                    control={form.control}
                    name="feedback"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel className="font-medium text-lg text-white">Additional feedback (optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            className="min-h-[120px] border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-500 focus:border-green-500"
                            placeholder="Tell us more about your experience or what we could do better..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  {/* Email (optional) */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel className="font-medium text-lg text-white">
                          Email (optional - for follow-up)
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-500 focus:border-green-500"
                            placeholder="your@email.com"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  {/* Submit Buttons */}
                  <div className="flex flex-col gap-4 pt-6 sm:flex-row">
                    <Button
                      className="flex-1 bg-green-600 py-3 font-medium text-lg text-white hover:bg-green-700 disabled:opacity-50"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                    </Button>
                    <Button
                      className="flex-1 border-gray-600 py-3 text-gray-300 text-lg hover:bg-gray-800"
                      disabled={isSubmitting}
                      onClick={() => window.close()}
                      type="button"
                      variant="outline"
                    >
                      Skip & Close
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Footer Message */}
          <div className="mt-12 space-y-4 text-center">
            <p className="text-gray-500">We hope to welcome you back in the future</p>
            <div className="flex items-center justify-center gap-2 text-green-500">
              <Heart className="h-4 w-4" />
              <span>Thank you for trying our extension</span>
            </div>
          </div>
        </div>
      </div>

      <LightRays
        className="!absolute min-h-screen w-full"
        distortion={0.05}
        followMouse={true}
        lightSpread={0.8}
        mouseInfluence={0.1}
        noiseAmount={0.1}
        rayLength={1.2}
        raysColor="#22c55e"
        raysOrigin="top-center"
        raysSpeed={1.5}
      />
    </div>
  );
};

export default ExtensionUninstallPage;
