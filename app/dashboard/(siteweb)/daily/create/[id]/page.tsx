"use client";
import DashboardLayout from "@/app/dashboard/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/app/shared/components/Loading";
import Wygywyg from "@/app/shared/components/Wygywyg";
import { putTonokiraDaily } from "../../core/requests/_post_request";
import { getTonokiraDaily } from "../../core/requests/_get_request";

const Create = () => {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>({
    reference: "",
    creationDate: new Date() as unknown as string,
  });
  const [content, setContent] = useState<any>();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const { toast } = useToast();

  const onChange = (v: any) => {
    setData((prev: any) => ({ ...prev, ...v }));
  };

  const handleChangeContent = (e: any) => {
    setContent(e.content);
  };

  const handleSend = async () => {
    if (!data.reference || !content) {
      toast({
        variant: "destructive",
        title: "Champ requis",
      });
      return;
    }
    setIsloading(true);
    await putTonokiraDaily(+id, {
      reference: data.reference,
      content: content,
      creationDate: data.creationDate,
    })
      .then((response) => {
        if (response?.status === 200) {
          setData({
            reference: "",
            creationDate: new Date() as unknown as string,
          });
          setContent("");
          toast({ title: "Modification réussi" });
          setIsloading(false);
          router.push("/dashboard/daily/");
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
    await getTonokiraDaily(id)
      .then((response) => {
        if (response?.status === 200) {
          setData(response?.data?.data);
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
          <label htmlFor="reference">Reference</label>
          <Input
            id="reference"
            type="text"
            placeholder="Reference"
            value={data.reference}
            onChange={(e) => onChange({ reference: e?.target?.value })}
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
