"use client";
import DashboardLayout from "@/app/dashboard/page";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/app/shared/components/Loading";
import { Input } from "@/components/ui/input";
import { putPersonnel } from "../../core/requests/_post_request";
import { getPersonel } from "../../core/requests/_get_request";

const CreatePersonelId = () => {
  const router = useRouter();
  const { id } = useParams();
  const [file, setFile] = useState<string>("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const { toast } = useToast();
  const [data, setData] = useState({
    fullName: "",
    poste: "",
    tel: "",
  });

  const onChange = (v: any) => {
    setData((prev: any) => ({ ...prev, ...v }));
  };
  const handleFile = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleSend = async () => {
    const formData = new FormData();
    formData.append("fullName", data?.fullName);
    formData.append("poste", data?.poste);
    formData.append("tel", data?.tel);
    formData.append("file", file);
    formData.append("id", id ? (+id as any) : "");

    setIsloading(true);
    await putPersonnel(+id, formData)
      .then((response) => {
        if (response?.status === 200) {
          setData({
            fullName: "",
            poste: "",
            tel: "",
          });
          toast({ title: "Modification réussi" });
          setIsloading(false);
          router.push("/dashboard/siteweb/radio/personel/");
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

  const fetchById = async (id: number) => {
    await getPersonel(id)
      .then((response) => {
        if (response?.status === 200) {
          setData(response?.data?.data);
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
    id && fetchById(+id);
  }, [id]);
  return (
    <DashboardLayout>
      <h1 className="mt-2 text-[18px] uppercase">Modifier - Responsable</h1>
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
          <label htmlFor="fullName">Nom et Prénom</label>
          <Input
            id="fullName"
            type="text"
            placeholder="Nom et Prénom"
            value={data.fullName}
            onChange={(e) => onChange({ fullName: e?.target?.value })}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="poste">Poste</label>
          <Input
            id="poste"
            type="text"
            placeholder="Poste"
            value={data.poste}
            onChange={(e) => onChange({ poste: e?.target?.value })}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="tel">Téléphone</label>
          <Input
            id="tel"
            type="number"
            placeholder="Téléphone"
            value={data.tel}
            onChange={(e) => onChange({ tel: e?.target?.value })}
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

export default CreatePersonelId;
