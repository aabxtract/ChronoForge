"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Wand2 } from "lucide-react";
import { useWallet } from "@/context/wallet-context";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { useState } from "react";
import { ClockSVG } from "../components/clock-svg";


const formSchema = z.object({
  duration: z.string().min(1, "Please select a duration."),
  theme: z.enum(["minimal", "cyberpunk", "astral", "molten"]),
});

const durations = [
  { label: "1 Hour", value: "3600" },
  { label: "1 Day", value: "86400" },
  { label: "7 Days", value: "604800" },
];

const themes = [
  { label: "Minimal", value: "minimal" },
  { label: "Cyberpunk", value: "cyberpunk" },
  { label: "Astral", value: "astral" },
  { label: "Molten", value: "molten" },
];

export default function MintPage() {
  const { toast } = useToast();
  const { isConnected, connectWallet } = useWallet();
  const [showReveal, setShowReveal] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      duration: "3600",
      theme: "minimal",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!isConnected) {
        toast({
            variant: "destructive",
            title: "Wallet not connected",
            description: "Please connect your wallet to mint a clock.",
        });
        connectWallet();
        return;
    }

    setShowReveal(true);
    setTimeout(() => setShowReveal(false), 4000);
    
    toast({
      title: "Minting in Progress...",
      description: "Your new clock is being forged in time.",
    });

    // Simulate minting delay
    setTimeout(() => {
       toast({
        title: "Your Clock Has Begun!",
        description: `Forged a ${values.theme} clock with a duration of ${durations.find(d => d.value === values.duration)?.label}.`,
      });
    }, 2000);
  }

  return (
    <>
      <div className="max-w-md mx-auto">
        <Card className="bg-card/50 backdrop-blur-lg border-border/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="text-primary" />
              Forge a New Clock
            </CardTitle>
            <CardDescription>
              Select a theme and duration to begin the countdown.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="theme"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Theme</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a theme" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {themes.map(theme => (
                             <SelectItem key={theme.value} value={theme.value} className="capitalize">{theme.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>The visual style of your clock.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a duration" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                           {durations.map(d => (
                             <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>The total lifespan of your clock.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" size="lg">
                  Mint Clock
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showReveal} onOpenChange={setShowReveal}>
        <DialogContent className="bg-transparent border-none shadow-none max-w-lg w-full flex flex-col items-center justify-center text-center p-0">
          <div className="animate-in fade-in zoom-in-90 duration-1000">
            <div className="w-64 h-64">
              <ClockSVG percentage={1} rarity="Common" theme={form.watch('theme')} isEvolved={false} />
            </div>
            <h2 className="text-3xl font-bold mt-6 text-slate-50 animate-in fade-in-0 slide-in-from-bottom-10 delay-500 duration-1000">
              Your Clock Has Begun.
            </h2>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
