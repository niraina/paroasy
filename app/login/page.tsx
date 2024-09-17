"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { loginPost, registerPost } from "./core/requests/_post_request";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface Ilogin {
  email: string;
  password: string;
}

interface IRegister {
  email: string;
  password: string;
  name: string;
  roleId: number;
}

const Login = () => {
  const [loginState, setLoginState] = useState<Ilogin>({
    email: "",
    password: "",
  });
  const [registerState, setRegisterState] = useState<IRegister>({
    email: "",
    name: "",
    password: "",
    roleId: 2,
  });
  const { toast } = useToast();
  const router = useRouter();

  const handleLogin = async () => {
    const { status, data, error } = await loginPost(loginState);
    console.log("Login Response:", { status, data, error });
    if (status === 200) {
      toast({ title: "Connexion réussi" });
      localStorage.setItem("token", data?.token);
      router.push("/dashboard"); // Rediriger vers le tableau de bord
    } else {
      toast({
        variant: "destructive",
        title: error?.response?.data?.error || "Connexion échoué",
      });
    }
  };

  const handleRegister = async () => {
    const { status, data, error } = await registerPost(registerState);
    console.log("Login Response:", { status, data, error });
    if (status === 200 || status === 201) {
      toast({ title: "Inscription réussi" });
      setRegisterState({
        email: "",
        name: "",
        password: "",
        roleId: 2,
      });
    } else {
      toast({
        variant: "destructive",
        title: error?.response?.data?.error || "Inscription échoué",
      });
    }
  };

  return (
    <div className="container h-[90vh] pt-5">
      <div className="flex justify-center h-full items-center">
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account" className="">
              Se connecter
            </TabsTrigger>
            <TabsTrigger value="password">S'inscrire</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardContent className="space-y-2">
                <div className="space-y-1 mt-5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="jhon@exemple.com"
                    value={loginState.email}
                    onChange={(e) =>
                      setLoginState((prev: any) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Mots de passe</Label>
                  <Input
                    type="password"
                    id="password"
                    placeholder="Votre mots de passe"
                    value={loginState.password}
                    onChange={(e) =>
                      setLoginState((prev: any) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                  />
                </div>
              </CardContent>
              <CardFooter className="mx-auto text-center">
                <Button onClick={handleLogin} className="btn-theme">
                  Connexion
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardContent className="space-y-2">
                <div className="space-y-1 mt-5">
                  <Label htmlFor="name">Nom et prénom</Label>
                  <Input
                    type="text"
                    id="name"
                    placeholder="nom et prénom"
                    value={registerState.name}
                    onChange={(e) =>
                      setRegisterState((prev: any) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-1 mt-5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="jhon@exemple.com"
                    value={registerState.email}
                    onChange={(e) =>
                      setRegisterState((prev: any) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Mots de passe</Label>
                  <Input
                    type="password"
                    id="password"
                    placeholder="Votre mots de passe"
                    value={registerState.password}
                    onChange={(e) =>
                      setRegisterState((prev: any) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleRegister} className="btn-theme">
                  Connexion
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
