"use client";
import DashboardLayout from "@/app/dashboard/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/shared/components/Loading";
import { toast } from "@/components/ui/use-toast";
import { createFormData } from "@/app/shared/usecase/createFormData";
import {
  postLibrairy,
  postLibrairyResponsable,
} from "../core/requests/_post_request";
interface DataModel {
  name: string;
}
const Create = () => {
  const router = useRouter();

  const [data, setData] = useState<DataModel>({
    name: "",
  });
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [responsable, setResponsable] = useState({
    fullName: "",
    poste: "",
    tel: "",
  });
  const [file, setFile] = useState<string>("");
  const onChangeResponsable = (v: any) => {
    setResponsable((prev: any) => ({ ...prev, ...v }));
  };

  const onChange = (v: any) => {
    setData((prev: any) => ({ ...prev, ...v }));
  };

  const handleSend = async () => {
    if (!data.name) {
      toast({
        variant: "destructive",
        title: "Champ titre requis",
      });
      console.log(data);

      return;
    }
    setIsloading(true);
    await postLibrairy({
      name: data.name,
    })
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          setData({
            name: "",
          });
          postLibrairyResponsable(
            createFormData({
              fullName: responsable?.fullName,
              poste: responsable?.poste,
              tel: responsable?.tel,
              librairyId: response?.data?.id,
              file: file,
            })
          )
            .then((response) => {
              if (response?.status === 200 || response?.status === 201) {
                setResponsable({
                  fullName: "",
                  poste: "",
                  tel: "",
                });
                toast({ title: "Enregistrement réussi" });
                router.push("/dashboard/librairy/");
                setIsloading(false);
              }
            })
            .catch((error) => {
              toast({
                variant: "destructive",
                title: error?.response?.data?.error || "Enregistrement échoué",
              });
              setIsloading(false);
            });

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
      <h1 className="mt-2 text-[18px] uppercase">Nouvelle - Librairie</h1>
      <form className="my-5">
        <div className="mb-2">
          <label htmlFor="name">Nom</label>
          <Input
            id="name"
            type="text"
            placeholder="Nom"
            value={data.name}
            onChange={(e) => onChange({ name: e?.target?.value })}
          />
        </div>
        <h2 className="text-[28px] my-3">Responsable</h2>
        <div className="mb-2">
          <label htmlFor="file">Fichier image</label>
          <Input
            id="file"
            type="file"
            placeholder="Image"
            onChange={(e: any) => setFile(e?.target?.files[0])}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="fullName">Nom et Prénom</label>
          <Input
            id="fullName"
            type="text"
            placeholder="Nom et Prénom"
            value={responsable.fullName}
            onChange={(e) =>
              onChangeResponsable({ fullName: e?.target?.value })
            }
          />
        </div>
        <div className="mb-2">
          <label htmlFor="poste">Poste</label>
          <Input
            id="poste"
            type="text"
            placeholder="Poste"
            value={responsable.poste}
            onChange={(e) => onChangeResponsable({ poste: e?.target?.value })}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="tel">Téléphone</label>
          <Input
            id="tel"
            type="number"
            placeholder="Téléphone"
            value={responsable.tel}
            onChange={(e) => onChangeResponsable({ tel: e?.target?.value })}
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
