
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, DollarSign } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/auth/password-input";
import { Logo } from "@/components/icons";
import { useToast } from "@/hooks/use-toast";
import { 
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password is required." }),
});

const twoFactorSchema = z.object({
  code: z.string().min(6, { message: "Your code must be 6 digits." }),
});

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [showTwoFactor, setShowTwoFactor] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);
  const otpInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (showTwoFactor) {
      setTimeout(() => {
        otpInputRef.current?.focus();
      }, 0);
    }
  }, [showTwoFactor]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const twoFactorForm = useForm<z.infer<typeof twoFactorSchema>>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: {
      code: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    // Simulate a quick check
    if (values.email === "admin@example.com" && values.password === "Password123!") {
      setShowTwoFactor(true);
    } else {
        toast({
            variant: "destructive",
            title: "Login Failed",
            description: "Invalid email or password. Please try again.",
        });
    }
    setIsLoading(false);
  }

  async function onTwoFactorSubmit(values: z.infer<typeof twoFactorSchema>) {
    setIsLoading(true);
    
    // In a real app, you'd verify the 2FA code with your backend.
    // For this prototype, any 6-digit code will work.
    if (values.code === "123456") {
      toast({
        title: "Login Successful",
        description: "Welcome back! Redirecting to your dashboard.",
      });
      router.push("/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: "Invalid 2FA Code",
        description: "The code you entered is incorrect. Please try again.",
      });
      twoFactorForm.reset();
    }
    setIsLoading(false);
  }

  return (
    <Card className="w-full max-w-md shadow-2xl">
      <CardHeader className="text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary [perspective:800px]">
          <DollarSign className="h-10 w-10 animate-spin-y-360" />
        </div>
        <div className="mx-auto mb-4">
            <Logo />
        </div>
        <CardTitle className="font-headline text-2xl">{showTwoFactor ? "Two-Factor Authentication" : "Welcome Back"}</CardTitle>
        <CardDescription>
          {showTwoFactor ? "Enter the code from your Google Authenticator app." : "Enter your credentials to access your crypto portfolio."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {showTwoFactor ? (
          <Form {...twoFactorForm}>
            <form 
              ref={formRef} 
              onSubmit={twoFactorForm.handleSubmit(onTwoFactorSubmit)} 
              className="space-y-6"
            >
              <div className="flex justify-center">
                <FormField
                  control={twoFactorForm.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Authentication Code</FormLabel>
                      <FormControl>
                        <InputOTP 
                          maxLength={6} 
                          {...field}
                          render={({ slots }) => (
                            <InputOTPGroup>
                              {slots.slice(0, 3).map((slot, index) => (
                                <InputOTPSlot key={index} {...slot} />
                              ))}
                              <InputOTPSeparator />
                              {slots.slice(3).map((slot, index) => (
                                <InputOTPSlot key={index + 3} {...slot} />
                              ))}
                            </InputOTPGroup>
                          )}
                          onComplete={() => {
                            // Trigger form submission programmatically
                            formRef.current?.requestSubmit();
                          }}
                        >
                          <input ref={otpInputRef} />
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full font-bold transition-all duration-300 hover:scale-105" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Verify & Sign In
              </Button>
            </form>
          </Form>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <Link
                        href="#"
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <PasswordInput placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full font-bold transition-all duration-300 hover:scale-105" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
      <CardFooter className="flex justify-center text-sm">
        <p>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-bold text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
