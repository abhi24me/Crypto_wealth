import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, Lock, ShieldCheck, User } from "lucide-react";
import { ProfileForm } from "@/components/dashboard/profile-form";

// Mock user data, in a real app this would come from a database
const user = {
  name: "John Doe",
  email: "admin@example.com",
  kycStatus: "Verified",
  is2FAEnabled: true,
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
};

export default function ProfilePage() {

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-6">
        <ProfileForm user={user} initials={getInitials(user.name)} />

        {/* Security Section */}
        <Card>
            <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>Manage your account security settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* KYC Section */}
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                        <ShieldCheck className="h-6 w-6 text-primary" />
                        <div>
                            <h3 className="font-semibold">KYC Process</h3>
                            <p className={`text-sm ${user.kycStatus === 'Verified' ? 'text-green-600' : 'text-yellow-600'}`}>
                                Current Status: {user.kycStatus}
                            </p>
                        </div>
                    </div>
                    {user.kycStatus !== 'Verified' && (
                        <Button variant="secondary">Start KYC</Button>
                    )}
                </div>
                {/* 2FA Section */}
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                        <Lock className="h-6 w-6 text-primary" />
                        <div>
                            <h3 className="font-semibold">Two-Factor Authentication (2FA)</h3>
                            <p className="text-sm text-muted-foreground">
                                2FA must be enabled to withdraw funds.
                            </p>
                        </div>
                    </div>
                    {/* The interactive Switch is part of the client component */}
                </div>
                 {/* Password Reset Section */}
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                        <KeyRound className="h-6 w-6 text-primary" />
                        <div>
                            <h3 className="font-semibold">Password</h3>
                            <p className="text-sm text-muted-foreground">
                                For security, we recommend changing your password periodically.
                            </p>
                        </div>
                    </div>
                    <Button variant="outline">Reset Password</Button>
                </div>
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
