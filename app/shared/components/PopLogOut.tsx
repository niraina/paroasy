"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";

import { useRouter } from "next/navigation";

export function PopLogOut() {
  const { toast } = useToast();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", { method: "POST" });
      if (response.ok) {
        localStorage.removeItem("token");
        router.push("/login");
        toast({ title: "Déconnexion réussie" });
      } else {
        toast({
          title: "Erreur lors de la déconnexion",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error during logout:", error);
      toast({ title: "Erreur lors de la déconnexion", variant: "destructive" });
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Admin</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <p className="text-sm text-center text-muted-foreground">
              admin@yopmail.com
            </p>
          </div>
          <Button onClick={handleLogout}>Deconnexion</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
