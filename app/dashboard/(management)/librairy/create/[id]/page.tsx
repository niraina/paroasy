"use client";
import DashboardLayout from "@/app/dashboard/page";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/app/shared/components/Loading";
import { Input } from "@/components/ui/input";
import { Eglise } from "../../../eglise/core/models/eglise.model";
import { getAllParoasy } from "../../../eglise/core/requests/_get_request";
import { createFormData } from "@/app/shared/usecase/createFormData";
import {
  putLibrairy,
  putLibrairyResponsable,
} from "../../core/requests/_post_request";
import { getLibrairy } from "../../core/requests/_get_request";
interface DataModel {
  name: string;
}

const Create = () => {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const { toast } = useToast();
  const now = new Date();

  const [data, setData] = useState<DataModel>({
    name: "",
  });

  const [responsable, setResponsable] = useState({
    id: null,
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
    setIsloading(true);
    await putLibrairy(+id, {
      name: data.name,
    })
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          responsable.id &&
            putLibrairyResponsable(
              +responsable.id,
              createFormData({
                fullName: responsable?.fullName,
                poste: responsable?.poste,
                tel: responsable?.tel,
                id: responsable?.id,
                librairyId: id,
                file: file,
              })
            )
              .then((response) => {
                if (response?.status === 200 || response?.status === 201) {
                  setData({
                    name: "",
                  });
                  setResponsable({
                    fullName: "",
                    poste: "",
                    tel: "",
                    id: null,
                  });
                  toast({ title: "Modification réussi" });
                  router.push("/dashboard/librairy/");
                  setIsloading(false);
                }
              })
              .catch((error) => {
                toast({
                  variant: "destructive",
                  title:
                    error?.response?.data?.error || "Enregistrement échoué",
                });
                setIsloading(false);
              });

          setIsloading(false);
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
    await getLibrairy(id)
      .then((response) => {
        if (response?.status === 200) {
          setData(response?.data?.data);
          setResponsable(response?.data?.data?.responsable[0]);
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
      <h1 className="mt-2 text-[18px] uppercase">Modification - Librairie</h1>
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
