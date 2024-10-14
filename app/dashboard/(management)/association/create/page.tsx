"use client";
import DashboardLayout from "@/app/dashboard/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/shared/components/Loading";
import { Eglise } from "../../eglise/core/models/eglise.model";
import { getAllParoasy } from "../../eglise/core/requests/_get_request";
import { toast } from "@/components/ui/use-toast";
import {
  postHomonorie,
  postHomonorieResponsable,
} from "../core/requests/_post_request";
import { createFormData } from "@/app/shared/usecase/createFormData";
interface DataModel {
  name: string;
  membre: number;
  nbZoky: number;
  nbZandry: number;
  egliseId: number | null;
}
const Create = () => {
  const router = useRouter();

  const [data, setData] = useState<DataModel>({
    name: "",
    membre: 0,
    nbZoky: 0,
    nbZandry: 0,
    egliseId: null,
  });
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [eglise, setEglise] = useState<Eglise[]>([]);
  const [responsable, setResponsable] = useState({
    fullName: "",
    poste: "",
    tel: "",
  });
  const [file, setFile] = useState<string>("");
  const onChangeResponsable = (v: any) => {
    setResponsable((prev: any) => ({ ...prev, ...v }));
  };

  const fetchEglise = async () => {
    const response = await getAllParoasy({ itemsPerPage: 1000 });
    setEglise(response.data.data);
  };
  useEffect(() => {
    fetchEglise();
  }, []);

  const onChange = (v: any) => {
    setData((prev: any) => ({ ...prev, ...v }));
  };

  const handleSend = async () => {
    if (
      !data.name ||
      !data.membre ||
      !data.nbZoky ||
      !data.nbZandry ||
      !data.egliseId
    ) {
      toast({
        variant: "destructive",
        title: "Champ titre requis",
      });
      console.log(data);

      return;
    }
    setIsloading(true);
    await postHomonorie({
      name: data.name,
      membre: +data.membre,
      nbZoky: +data.nbZoky,
      nbZandry: +data.nbZandry,
      egliseId: +data.egliseId,
    })
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          setData({
            name: "",
            membre: 0,
            nbZoky: 0,
            nbZandry: 0,
            egliseId: null,
          });
          postHomonorieResponsable(
            createFormData({
              fullName: responsable?.fullName,
              poste: responsable?.poste,
              tel: responsable?.tel,
              homonorieId: response?.data?.id,
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
                router.push("/dashboard/association/");
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
      <h1 className="mt-2 text-[18px] uppercase">Nouvelle - Association</h1>
      <form className="my-5">
        <div className="mb-2">
          <label htmlFor="name">Nom de l'association</label>
          <Input
            id="name"
            type="text"
            placeholder="Nom de l'association"
            value={data.name}
            onChange={(e) => onChange({ name: e?.target?.value })}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="membre">Nombre membre</label>
          <Input
            id="membre"
            type="number"
            placeholder="Nombre membre"
            value={data.membre}
            onChange={(e) => onChange({ membre: e?.target?.value })}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="nbZoky">Nombre zoky</label>
          <Input
            id="nbZoky"
            type="number"
            placeholder="Nombre zandry"
            value={data.nbZoky}
            onChange={(e) => onChange({ nbZoky: e?.target?.value })}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="nbZandry">Nombre zandry</label>
          <Input
            id="nbZandry"
            type="number"
            placeholder="Nombre zandry"
            value={data.nbZandry}
            onChange={(e) => onChange({ nbZandry: e?.target?.value })}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="type">Eglise</label>
          <select
            onChange={(e) => onChange({ egliseId: e?.target?.value })}
            className="w-full py-2 ps-2 border-[1px] border-[#000] dark:border-[#fff]"
          >
            {eglise.map((item: Eglise, index: number) => (
              <option key={item.id} value={item.id} selected={index === 0}>
                {item.name}
              </option>
            ))}
          </select>
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
