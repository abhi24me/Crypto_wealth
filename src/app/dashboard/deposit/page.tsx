"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, ChevronLeft, Loader2 } from "lucide-react";
import Image from "next/image";

export default function DepositPage() {
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    nickname: "",
    amount: 1000,
    split: [40, 60],
  });
  const [isProcessing, setIsProcessing] = React.useState(false);
  const router = useRouter();

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  
  const handleSliderChange = (value: number[]) => {
      setFormData(prev => ({ ...prev, split: value }));
  }

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate a quick transaction processing
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsProcessing(false);
    handleNext();
  };

  const finishDeposit = () => {
    // In a real app, you'd likely show a toast message on the dashboard.
    // For this prototype, we just navigate.
    router.push("/dashboard");
  };

  const progressValue = (step / 3) * 100;

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 items-center justify-center">
      <div className="w-full max-w-2xl">
        <Progress value={progressValue} className="mb-4" />
        <Card className="shadow-lg">
          {step === 1 && (
            <>
              <CardHeader>
                <CardTitle>Step 1: Deposit Details</CardTitle>
                <CardDescription>
                  Set up your deposit amount and token allocation.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-2">
                  <Label htmlFor="nickname">Nickname</Label>
                  <Input
                    id="nickname"
                    placeholder="e.g., CryptoKing"
                    value={formData.nickname}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="amount">Deposit Amount (USD)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={formData.amount}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-4">
                  <Label>Token Split</Label>
                  <div className="flex justify-between text-sm font-medium">
                      <span>LX Token: {formData.split[0]}%</span>
                      <span>KX Token: {formData.split[1]}%</span>
                  </div>
                  <Slider
                    defaultValue={[40,60]}
                    onValueChange={handleSliderChange}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleNext} className="ml-auto">
                  Next
                </Button>
              </CardFooter>
            </>
          )}

          {step === 2 && (
            <>
              <CardHeader>
                <CardTitle>Step 2: Make Payment</CardTitle>
                <CardDescription>
                  Scan the QR code with your wallet to pay with USDT.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-center">
                 <div className="flex justify-center">
                    <Image
                        src="https://placehold.co/256x256.png"
                        data-ai-hint="QR code"
                        alt="USDT Payment QR Code"
                        width={256}
                        height={256}
                        className="rounded-lg border"
                    />
                 </div>
                 <div className="space-y-1">
                    <p className="font-bold text-lg">{formData.amount} USDT</p>
                    <p className="text-sm text-muted-foreground">To wallet address: <span className="font-mono text-xs">0x123...aBcD</span></p>
                 </div>
                 <Card className="text-left bg-muted/50">
                    <CardHeader className="p-4">
                        <CardTitle className="text-base">Transaction Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 text-sm space-y-2">
                        <div className="flex justify-between"><span>Amount:</span> <span className="font-medium">${formData.amount}.00</span></div>
                        <div className="flex justify-between"><span>Network Fee:</span> <span className="font-medium">$1.50</span></div>
                        <div className="flex justify-between font-bold"><span>Total:</span> <span>${Number(formData.amount) + 1.5}.00</span></div>
                    </CardContent>
                 </Card>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  <ChevronLeft className="mr-2" /> Back
                </Button>
                <Button onClick={handlePayment} disabled={isProcessing}>
                    {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isProcessing ? "Processing..." : "I Have Paid"}
                </Button>
              </CardFooter>
            </>
          )}

          {step === 3 && (
            <>
              <CardHeader className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
                    <CheckCircle className="h-10 w-10 text-green-500" />
                </div>
                <CardTitle className="mt-4">Payment Successful!</CardTitle>
                <CardDescription>
                  Your transaction has been confirmed and your balance will be updated shortly.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                 <p className="text-muted-foreground">Your funds have been allocated according to your chosen split:</p>
                 <p className="font-bold text-lg">{formData.split[0]}% LX Token & {formData.split[1]}% KX Token</p>
              </CardContent>
              <CardFooter>
                <Button onClick={finishDeposit} className="w-full">
                  Go to Dashboard
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </main>
  );
}
