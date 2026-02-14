"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Send } from "lucide-react";
import PinVerificationModal from "./PinVerificationModal";

export default function SendMoneyCard({ onTransactionComplete }: { onTransactionComplete?: () => void }) {
    const [loading, setLoading] = useState(false);
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const res = await fetch("/api/transactions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    recipientEmail: recipient,
                    amount: parseFloat(amount),
                    description,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Transaction failed");
            }

            setSuccess("Money sent successfully!");
            setRecipient("");
            setAmount("");
            setDescription("");
            if (onTransactionComplete) onTransactionComplete();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full glass">
            <CardHeader>
                <CardTitle>Send Money</CardTitle>
                <CardDescription>Transfer funds to another user instantly.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSend} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="recipient">Recipient Email</Label>
                        <Input
                            id="recipient"
                            placeholder="user@example.com"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                            id="amount"
                            type="number"
                            placeholder="0.00"
                            min="0.01"
                            step="0.01"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description (Optional)</Label>
                        <Input
                            id="description"
                            placeholder="Dinner, Rent, etc."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-sm text-destructive">{error}</p>}
                    {success && <p className="text-sm text-green-600">{success}</p>}
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                        Send Money
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
