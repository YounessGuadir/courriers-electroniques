import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from '@/components/ui/card';
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form';
import {
  EyeIcon, EyeOffIcon, Loader2, KeyIcon, LockIcon
} from 'lucide-react';
import { useUserContext } from '../../Context/UserContext';
import { LOGIN_ROUTE } from '../../router';

const formSchema = z.object({
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
  password_confirmation: z.string(),
}).refine(data => data.password === data.password_confirmation, {
  message: "Passwords don't match",
  path: ['password_confirmation'],
});

export default function ResetPassword() {
  const { token } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState(null);

  const { updatePassword } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const emailParam = queryParams.get('email');
    if (token && emailParam) {
      setEmail(emailParam);
    } else {
      toast({
        title: 'Invalid reset link',
        description: 'The password reset link is invalid or expired.',
        variant: 'destructive',
      });
    }
  }, [location.search]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      password_confirmation: '',
    },
  });

async function onSubmit(data) {
  if (!token || !email) {
    toast({
      title: 'Error',
      description: 'Missing token or email to reset your password.',
      variant: 'destructive',
    });
    return;
  }

  setIsSubmitting(true);

  try {
    console.log("Payload envoyé :", { email, token, ...data });
    await updatePassword({ email, token, ...data });
    toast({
      title: 'Success!',
      description: 'Your password has been successfully updated.',
      variant: 'success',
    });
  } catch (error) {
    console.error("Erreur complète backend :", error.response);
    toast({
      title: 'Password Reset Failed',
      description: error.response?.data?.message || 'Unknown error',
      variant: 'destructive',
    });
  } finally {
    setIsSubmitting(false);
  }
}
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Reset Your Password</CardTitle>
          <CardDescription>Create a new password for your account</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <LockIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          {...field}
                          className="pl-9 pr-10"
                          type={showPassword ? "text" : "password"}
                          disabled={isSubmitting}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword
                            ? <EyeOffIcon className="h-4 w-4" />
                            : <EyeIcon className="h-4 w-4" />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password_confirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <KeyIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          {...field}
                          className="pl-9 pr-10"
                          type={showConfirmPassword ? "text" : "password"}
                          disabled={isSubmitting}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword
                            ? <EyeOffIcon className="h-4 w-4" />
                            : <EyeIcon className="h-4 w-4" />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting
                  ? <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Resetting...
                    </>
                  : 'Reset Password'}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="justify-center">
          <p className="text-sm">
            Remember your password?{' '}
            <Button variant="link" onClick={() => navigate(LOGIN_ROUTE)}>Sign in</Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
