"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface PinVerificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (pin: string) => void;
    isSetupMode?: boolean;
}

export default function PinVerificationModal({ isOpen, onClose, onSuccess, isSetupMode = false }: PinVerificationModalProps) {
    const [pin, setPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (isSetupMode) {
                if (pin !== confirmPin) {
                    throw new Error("PINs do not match");
                }
                if (pin.length < 4) {
                    throw new Error("PIN must be at least 4 digits");
                }

                const res = await fetch("/api/user/pin", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ pin }),
                });

                if (!res.ok) {
                    const data = await res.json();
                    throw new Error(data.error || "Failed to set PIN");
                }
            }

            // If verifying or after setup success, pass PIN back
            onSuccess(pin);
            setPin("");
            setConfirmPin("");
            onClose();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="glass">
                <DialogHeader>
                    <DialogTitle>{isSetupMode ? "Set Transaction PIN" : "Enter Transaction PIN"}</DialogTitle>
                    <DialogDescription>
                        {isSetupMode
                            ? "Please create a secure PIN for your transactions."
                            : "Please enter your PIN to confirm this transaction."}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="pin">PIN</Label>
                        <Input
                            id="pin"
                            type="password"
                            placeholder="****"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            required
                            maxLength={6}
                            className="text-center text-2xl tracking-widest"
                        />
                    </div>
                    {isSetupMode && (
                        <div className="space-y-2">
                            <Label htmlFor="confirmPin">Confirm PIN</Label>
                            <Input
                                id="confirmPin"
                                type="password"
                                placeholder="****"
                                value={confirmPin}
                                onChange={(e) => setConfirmPin(e.target.value)}
                                required
                                maxLength={6}
                                className="text-center text-2xl tracking-widest"
                            />
                        </div>
                    )}
                    {error && <p className="text-sm text-destructive text-center">{error}</p>}
                    <DialogFooter>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isSetupMode ? "Create PIN" : "Confirm"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
