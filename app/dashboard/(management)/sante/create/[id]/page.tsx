"use client";
import DashboardLayout from "@/app/dashboard/page";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/app/shared/components/Loading";
import { Input } from "@/components/ui/input";
import moment from "moment";
import { REGION } from "@/app/shared/constant/region";
import { putSante } from "../../core/requests/_post_request";
import { getSante } from "../../core/requests/_get_request";
import { Eglise } from "../../../eglise/core/models/eglise.model";
import { getAllParoasy } from "../../../eglise/core/requests/_get_request";
interface DataModel {
  nomMaladie: string;
  personne: string;
  creationDate: string;
  region: string;
  district: string;
  egliseId: number | null;
  congregation: string;
}

const Create = () => {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const { toast } = useToast();
  const now = new Date();

  const [data, setData] = useState<DataModel>({
    nomMaladie: "",
    personne: "",
    creationDate: moment(now).format("YYYY-MM-DD"),
    region: REGION[0].value,
    district: "",
    egliseId: null,
    congregation: "",
  });

  const [eglise, setEglise] = useState<Eglise[]>([]);
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
    setIsloading(true);
    await putSante(+id, {
      nomMaladie: data.nomMaladie,
      personne: data.personne,
      creationDate: data.creationDate,
      region: data.region,
      district: data.district,
      egliseId: data.egliseId && +data.egliseId,
      congregation: data.congregation,
    })
      .then((response) => {
        if (response?.status === 200) {
          setData({
            nomMaladie: "",
            personne: "",
            creationDate: "",
            region: REGION[0].value,
            district: "",
            egliseId: null,
            congregation: "",
          });
          toast({ title: "Modification réussi" });
          setIsloading(false);
          router.push("/dashboard/sante/");
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
    await getSante(id)
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
      <h1 className="mt-2 text-[18px] uppercase">Modification - CDS</h1>
      <form className="my-5">
        <div className="mb-2">
          <label htmlFor="nomMaladie">Nom de la maladie</label>
          <Input
            id="nomMaladie"
            type="text"
            placeholder="Nmodif cdsom de la maladie"
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
              <option
                key={item.value}
                value={item.value}
                selected={data.region === item.value}
              >
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
              <option
                key={item.id}
                value={item.id}
                selected={item.id === data.egliseId}
              >
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
        <Button type="button" className="btn-theme my-5" onClick={handleSend}>
          Enregistrer
        </Button>
      </form>
      <Loading loading={isLoading} />
    </DashboardLayout>
  );
};

export default Create;
