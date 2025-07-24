import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ArrowLeft, MailIcon, Loader2 } from 'lucide-react';
import { useUserContext } from '../../Context/UserContext';
import { LOGIN_ROUTE } from '../../router';

// Form validation schema
const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});
export default function ForgotPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { resetPassword } = useUserContext();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(data) {
    setIsSubmitting(true);
    console.log(data.email)
    try {
      const response = await resetPassword(data.email);
      setEmailSent(true);
      toast.success('Please check your email for password reset instructions.');
      console.log(response);
    } catch (error) {
      console.error('Error requesting password reset:', error);
      toast.error('There was a problem sending the reset link. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">Reset Password</CardTitle>
          <CardDescription>
            {emailSent
              ? 'We’ve sent you a password reset email.'
              : 'Enter your email to receive a password reset link.'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {!emailSent ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MailIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            {...field}
                            className="pl-9"
                            placeholder="you@example.com"
                            type="email"
                            autoComplete="email"
                            disabled={isSubmitting}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending Link...
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </Button>
              </form>
            </Form>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                If you don't receive an email within a few minutes, please check your spam
                folder or verify the email address you provided.
              </p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setEmailSent(false);
                  form.reset();
                }}
              >
                Try another email
              </Button>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <div className="flex w-full items-center justify-center">
            <Button
              variant="link"
              className="text-sm text-muted-foreground"
              onClick={() => navigate(LOGIN_ROUTE)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to login
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
