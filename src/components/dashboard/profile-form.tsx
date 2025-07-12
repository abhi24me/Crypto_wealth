// This file path is new
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import * as React from "react";

interface ProfileFormProps {
  user: {
    name: string;
    email: string;
    is2FAEnabled: boolean;
  };
  initials: string;
}

export function ProfileForm({ user, initials }: ProfileFormProps) {
  const [name, setName] = React.useState(user.name);
  const [email, setEmail] = React.useState(user.email);
  const [is2FAEnabled, setIs2FAEnabled] = React.useState(user.is2FAEnabled);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>Update your personal information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="https://placehold.co/80x80.png" alt="User avatar" data-ai-hint="user avatar" />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <Button variant="outline">Change Photo</Button>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
      <div className="flex items-center justify-between rounded-lg border p-4 bg-card">
          <div className="flex items-center gap-4">
              <div className="h-6 w-6 text-primary" />
              <div>
                  <h3 className="font-semibold">Two-Factor Authentication (2FA)</h3>
                  <p className="text-sm text-muted-foreground">
                      2FA must be enabled to withdraw funds.
                  </p>
              </div>
          </div>
          <Switch id="2fa-switch" checked={is2FAEnabled} onCheckedChange={setIs2FAEnabled} />
      </div>
    </>
  );
}
