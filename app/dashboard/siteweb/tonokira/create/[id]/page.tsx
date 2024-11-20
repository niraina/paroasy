"use client";
import DashboardLayout from "@/app/dashboard/page";
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
import { getTonokira } from "../../core/requests/_get_request";
import { putTonokira } from "../../core/requests/_post_request";

const CreateTonokiraId = () => {
  const router = useRouter();
  const { id } = useParams();
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
        title: "Champ content requis",
      });
      return;
    }
    setIsloading(true);
    await putTonokira(+id, { title: title, content: content })
      .then((response) => {
        if (response?.status === 200) {
          setTitle("");
          setContent("");
          toast({ title: "Modification réussi" });
          setIsloading(false);
          router.push("/dashboard/siteweb/tonokira/");
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
    await getTonokira(id)
      .then((response) => {
        if (response?.status === 200) {
          setTitle(response?.data?.data?.title);
          setContent(response?.data?.data?.content);
          setIsloading(false);
        } else {
          toast({
            variant: "destructive",
            title: "Chargement échoué",
          });
        }
        setIsloading(false);
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: error?.response?.data?.error || "Chargement échoué",
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

export default CreateTonokiraId;
