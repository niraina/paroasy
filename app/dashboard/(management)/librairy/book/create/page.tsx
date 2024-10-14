"use client";
import DashboardLayout from "@/app/dashboard/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/shared/components/Loading";
import { toast } from "@/components/ui/use-toast";
import { Librairy } from "../../core/models/librairy.model";
import { getAllLibrairy } from "../../core/requests/_get_request";
import { postBook } from "../../core/requests/_post_request";

interface DataModel {
  title: string;
  author: string;
  librairyId: number | null;
}
const Create = () => {
  const router = useRouter();

  const [data, setData] = useState<DataModel>({
    title: "",
    author: "",
    librairyId: null,
  });
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [librairy, setLibrairy] = useState<Librairy[]>([]);

  const fetchLibrairy = async () => {
    const response = await getAllLibrairy({ page: 1 });
    setLibrairy(response?.data?.data);
  };

  useEffect(() => {
    fetchLibrairy();
  }, []);

  const onChange = (v: any) => {
    setData((prev: any) => ({ ...prev, ...v }));
  };

  const handleSend = async () => {
    console.log(data);

    if (!data.title || !data.author || !data.librairyId) {
      toast({
        variant: "destructive",
        title: "Champ requis",
      });
      console.log(data);

      return;
    }
    setIsloading(true);
    await postBook({
      title: data.title,
      author: data.author,
      librairyId: data.librairyId,
    })
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          setData({
            title: "",
            author: "",
            librairyId: null,
          });
          toast({ title: "Enregistrement réussi" });
          router.push("/dashboard/librairy/book/");
          setIsloading(false);
        }
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: error?.response?.data?.error || "Enregistrement échoué",
        });
        setIsloading(false);
      })
      .finally(() => setIsloading(false));
  };

  return (
    <DashboardLayout>
      <h1 className="mt-2 text-[18px] uppercase">Nouvelle - Livre</h1>
      <form className="my-5">
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
          <label htmlFor="author">Auteur</label>
          <Input
            id="author"
            type="text"
            placeholder="Auteur"
            value={data.author}
            onChange={(e) => onChange({ author: e?.target?.value })}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="type">Librairie</label>
          <select
            onChange={(e) => onChange({ librairyId: e?.target?.value })}
            className="w-full py-2 ps-2 border-[1px] border-[#000] dark:border-[#fff]"
          >
            {librairy.map((item: Librairy) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
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

export default Create;
