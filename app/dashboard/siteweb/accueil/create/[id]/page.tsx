"use client";
import DashboardLayout from "@/app/dashboard/page";
import { createFormData } from "@/app/shared/usecase/createFormData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/app/shared/components/Loading";
import dynamic from "next/dynamic";
const Wygywyg = dynamic(
  () => import('@/app/shared/components/Wygywyg'),{
    ssr: false
  }
)
import { putHome } from "../../../home/core/requests/_post_request";
import { getHome } from "../../../home/core/requests/_get_request";
import { TYPE_PAGE } from "@/app/shared/constant/type-page";

const CreateaccueilById = () => {
  const router = useRouter();
  const { id } = useParams();
  const [data, setData] = useState({
    title: "",
    content: "",
    isPublic: true,
    type: TYPE_PAGE.couverture,
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
      id: +id,
    };
    const finalData1 = {
      title: data.title,
      content: content,
      isPublic: true,
      type: +data.type,
      id: +id,
    };
    setIsloading(true);
    await putHome(+id, createFormData(file ? finalData : finalData1))
      .then((response) => {
        if (response?.status === 200) {
          setData({
            title: "",
            content: "",
            isPublic: true,
            type: TYPE_PAGE.couverture,
          });
          toast({ title: "Modification réussi" });
          setIsloading(false);
          router.push("/dashboard/siteweb/accueil/");
        }
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: error?.response?.data?.error || "Modification échoué",
        });
        setIsloading(false);
      });
  };

  const fetchHomeById = async (id: number) => {
    await getHome(id)
      .then((response) => {
        if (response?.status === 200) {
          setData({
            title: response?.data?.data?.title,
            content: response?.data?.data?.content,
            isPublic: true,
            type: TYPE_PAGE.couverture,
          });
          setContent(response?.data?.data?.content);
          setIsloading(false);
        } else {
          toast({
            variant: "destructive",
            title: "Enregistrement échoué",
          });
        }
        setIsloading(false);
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: error?.response?.data?.error || "Enregistrement échoué",
        });
        setIsloading(false);
      });
  };

  useEffect(() => {
    id && fetchHomeById(+id);
  }, [id]);
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
        <Button type="button" className="btn-theme my-5" onClick={handleSend}>
          Enregistrer
        </Button>
      </form>
      <Loading loading={isLoading} />
    </DashboardLayout>
  );
};

export default CreateaccueilById;
