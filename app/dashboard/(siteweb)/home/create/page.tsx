"use client";
import DashboardLayout from "@/app/dashboard/page";
import { createFormData } from "@/app/shared/usecase/createFormData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { postHome } from "../core/requests/_post_request";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/app/shared/components/Loading";
import Wygywyg from "@/app/shared/components/Wygywyg";

const CreateHomePage = () => {
  const router = useRouter();
  const [data, setData] = useState({
    title: "",
    content: "",
    isPublic: true,
    type: 1,
  });
  const [isLoading, setIsloading] = useState<boolean>(false);
  const { toast } = useToast();
  const [file, setFile] = useState<string>("");
  const [content, setContent] = useState<any>();
  const handleChangeContent = (e: any) => {
    setContent(e.content);
  };

  const onChange = (v: any) => {
    setData((prev: any) => ({ ...prev, ...v }));
  };
  const handleFile = (e: any) => {
    setFile(e.target.files[0]);
  };
  const handleSend = async () => {
    if (!data.title) {
      toast({
        variant: "destructive",
        title: "Champ titre requis",
      });
      return;
    }
    const finalData = {
      title: data.title,
      content: content,
      isPublic: true,
      type: +data.type,
      file: file,
    };
    setIsloading(true);
    await postHome(createFormData(finalData))
      .then((response) => {
        if (response?.status === 200) {
          setData({
            title: "",
            content: "",
            isPublic: true,
            type: 1,
          });
          toast({ title: "Enregistrement réussi" });
          setIsloading(false);
          router.push("/dashboard/home/");
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
          <label htmlFor="file">Fichier image</label>
          <Input
            id="file"
            type="file"
            placeholder="Image"
            onChange={handleFile}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="title">Titre</label>
          <Input
            id="title"
            type="text"
            placeholder="Titre"
            value={data.title}
            onChange={(e) => onChange({ title: e?.target?.value })}
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
        <div className="mb-2">
          <label htmlFor="type">Selectionnée le type</label>
          <select
            onChange={(e) => onChange({ type: +e?.target?.value })}
            className="w-full py-2 ps-2 border-[1px] border-[#000] dark:border-[#fff]"
          >
            <option value="1">Couverture</option>
            <option value="2">Actualité</option>
          </select>
        </div>
        <Button type="button" className="btn-theme my-5" onClick={handleSend}>
          Enregistrer
        </Button>
      </form>
      <Loading loading={isLoading} />
    </DashboardLayout>
  );
};

export default CreateHomePage;
