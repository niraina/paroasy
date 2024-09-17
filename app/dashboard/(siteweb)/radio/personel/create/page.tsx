"use client";
import DashboardLayout from "@/app/dashboard/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/app/shared/components/Loading";
import { postPersonnel } from "../core/requests/_post_request";

const Create = () => {
  const router = useRouter();
  const [data, setData] = useState({
    fullName: "",
    poste: "",
    tel: "",
  });
  const [file, setFile] = useState<string>("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const { toast } = useToast();

  const onChange = (v: any) => {
    setData((prev: any) => ({ ...prev, ...v }));
  };

  const handleFile = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleSend = async () => {
    if (!data.fullName || !data.poste || !data.tel || !file) {
      toast({
        variant: "destructive",
        title: "Il y a des champs requis non valide",
      });
      return;
    }
    const formData = new FormData();
    formData.append("fullName", data?.fullName);
    formData.append("poste", data?.poste);
    formData.append("tel", data?.tel);
    formData.append("file", file);

    setIsloading(true);
    await postPersonnel(formData)
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          setData({
            fullName: "",
            poste: "",
            tel: "",
          });
          toast({ title: "Enregistrement réussi" });
          router.push("/dashboard/radio/personel/");
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
      <h1 className="mt-2 text-[18px] uppercase">Nouvelle - Responsable</h1>
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

export default Create;
