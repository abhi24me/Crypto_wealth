// This file path is new
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Send } from "lucide-react";

interface ReferralActionsProps {
    referralLink: string;
}

export function ReferralActions({ referralLink }: ReferralActionsProps) {
    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        // In a real app, you'd show a toast notification here.
    };

    return (
        <div className="grid gap-6 lg:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Your Referral Link</CardTitle>
                </CardHeader>
                <CardContent className="flex gap-2">
                    <Input value={referralLink} readOnly />
                    <Button variant="outline" size="icon" onClick={handleCopy}>
                        <Copy className="h-4 w-4" />
                        <span className="sr-only">Copy</span>
                    </Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Invite by Email</CardTitle>
                </CardHeader>
                <CardContent className="flex gap-2">
                    <Input type="email" placeholder="friend@example.com" />
                    <Button>
                        <Send className="h-4 w-4 mr-2" />
                        Invite
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
