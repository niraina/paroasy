"use client";
 

import DashboardLayout from "@/app/dashboard/page";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/app/shared/components/Loading";
import dynamic from "next/dynamic";
const Wygywyg = dynamic(
  () => import('@/app/shared/components/Wygywyg'),{
    ssr: false
  }
)
import { postRadio } from "../core/requests/_post_request";

const CreateHistoryPage = () => {
  const router = useRouter();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const { toast } = useToast();
  const [content, setContent] = useState<any>();
  const handleChangeContent = (e: any) => {
    setContent(e.content);
  };

  const handleSend = async () => {
    if (!content) {
      toast({
        variant: "destructive",
        title: "Champ titre requis",
      });
      return;
    }
    setIsloading(true);
    await postRadio({ content: content })
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          setContent("");
          toast({ title: "Enregistrement réussi" });
          setIsloading(false);
          router.push("/dashboard/siteweb/radio/history");
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

export default CreateHistoryPage;
