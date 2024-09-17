"use client";
import DashboardLayout from "@/app/dashboard/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { postTonokira } from "../core/requests/_post_request";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/app/shared/components/Loading";
import Wygywyg from "@/app/shared/components/Wygywyg";

const Create = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const { toast } = useToast();
  const [content, setContent] = useState<any>();
  const handleChangeContent = (e: any) => {
    setContent(e.content);
  };

  const handleSend = async () => {
    if (!title) {
      toast({
        variant: "destructive",
        title: "Champ titre requis",
      });
      return;
    }
    if (!content) {
      toast({
        variant: "destructive",
        title: "Champ contenu requis",
      });
      return;
    }
    setIsloading(true);
    await postTonokira({
      title: title,
      content: content,
    })
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          setTitle("");
          setContent("");
          toast({ title: "Enregistrement réussi" });
          setIsloading(false);
          router.push("/dashboard/tonokira/");
        }
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: error?.response?.data?.error || "Enregistrement échoué",
        });
        setIsloading(false);
      });
  };

  return (
    <DashboardLayout>
      <form className="my-5">
        <div className="mb-2">
          <label htmlFor="title">Titre</label>
          <Input
            id="title"
            type="text"
            placeholder="Titre"
            value={title}
            onChange={(e) => setTitle(e?.target?.value)}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="content">Contenu</label>
          <Wygywyg
            name="content"
            value={content}
            onChange={handleChangeContent}
          />
        </div>
        <Button type="button" className="btn-theme my-5" onClick={handleSend}>
          Enregistrer
        </Button>
      </form>
      <Loading loading={isLoading} />
    </DashboardLayout>
  );
};

export default Create;
