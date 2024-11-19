"use client";
import DashboardLayout from "@/app/dashboard/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/shared/components/Loading";
import { postSante } from "../core/requests/_post_request";
import { REGION } from "@/app/shared/constant/region";
import moment from "moment";
import { Eglise } from "../../eglise/core/models/eglise.model";
import { getAllParoasy } from "../../eglise/core/requests/_get_request";
import { toast } from "@/components/ui/use-toast";
import { Responsable } from "../core/models/responsable.model";
import { getAllSanteResponsable } from "../core/requests/_get_request";
interface DataModel {
  nomMaladie: string;
  personne: string;
  creationDate: string;
  region: string;
  district: string;
  egliseId: number | null;
  congregation: string;
  responsableId: number | null;
}
const CreateSante = () => {
  const router = useRouter();
  const now = new Date();

  const [data, setData] = useState<DataModel>({
    nomMaladie: "",
    personne: "",
    creationDate: moment(now).format("YYYY-MM-DD"),
    region: REGION[0].value,
    district: "",
    egliseId: null,
    congregation: "",
    responsableId: null,
  });
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [eglise, setEglise] = useState<Eglise[]>([]);
  const [responsable, setResponsable] = useState<Responsable[]>([]);
  const fetchEglise = async () => {
    const response = await getAllParoasy({ itemsPerPage: 1000 });
    setEglise(response.data.data);
  };
  useEffect(() => {
    fetchEglise();
  }, []);

  const fetchResponsable = async () => {
    const response = await getAllSanteResponsable({ itemsPerPage: 1000 });
    setResponsable(response.data.data);
  };
  useEffect(() => {
    fetchResponsable();
  }, []);

  const onChange = (v: any) => {
    setData((prev: any) => ({ ...prev, ...v }));
  };

  const handleSend = async () => {
    if (
      !data.nomMaladie ||
      !data.personne ||
      !data.creationDate ||
      !data.region ||
      !data.district ||
      !data.egliseId ||
      !data.congregation ||
      !data.responsableId
    ) {
      toast({
        variant: "destructive",
        title: "Champ titre requis",
      });
      console.log(data);

      return;
    }
    setIsloading(true);
    await postSante({
      nomMaladie: data.nomMaladie,
      personne: data.personne,
      creationDate: data.creationDate,
      region: data.region,
      district: data.district,
      egliseId: +data.egliseId,
      congregation: data.congregation,
      responsableId: +data.responsableId,
    })
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          setData({
            nomMaladie: "",
            personne: "",
            creationDate: "",
            region: REGION[0].value,
            district: "",
            egliseId: null,
            congregation: "",
            responsableId: null,
          });
          toast({ title: "Enregistrement réussi" });
          router.push("/dashboard/sante/");
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
      <h1 className="mt-2 text-[18px] uppercase">Nouvelle - CDS</h1>
      <form className="my-5">
        <div className="mb-2">
          <label htmlFor="nomMaladie">Nom de la maladie</label>
          <Input
            id="nomMaladie"
            type="text"
            placeholder="Nom de la maladie"
            value={data.nomMaladie}
            onChange={(e) => onChange({ nomMaladie: e?.target?.value })}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="personne">Nom du patient</label>
          <Input
            id="personne"
            type="text"
            placeholder="Nom du patient"
            value={data.personne}
            onChange={(e) => onChange({ personne: e?.target?.value })}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="type">Région</label>
          <select
            onChange={(e) => onChange({ region: e?.target?.value })}
            className="w-full py-2 ps-2 border-[1px] border-[#000] dark:border-[#fff]"
          >
            {REGION.map((item: { value: string; label: string }) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label htmlFor="district">District</label>
          <Input
            id="district"
            type="text"
            placeholder="District"
            value={data.district}
            onChange={(e) => onChange({ district: e?.target?.value })}
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
        <div className="mb-2">
          <label htmlFor="congregation">Congregation</label>
          <Input
            id="congregation"
            type="text"
            placeholder="congregation"
            value={data.congregation}
            onChange={(e) => onChange({ congregation: e?.target?.value })}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="type">Responsable</label>
          <select
            onChange={(e) => onChange({ responsableId: e?.target?.value })}
            className="w-full py-2 ps-2 border-[1px] border-[#000] dark:border-[#fff]"
          >
            {responsable.map((item: Responsable, index: number) => (
              <option key={item.id} value={item.id} selected={index === 0}>
                {item.fullName}
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

export default CreateSante;
