"use client";
import DashboardLayout from "@/app/dashboard/page";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/app/shared/components/Loading";
import { Input } from "@/components/ui/input";
import { Eglise } from "../../../eglise/core/models/eglise.model";
import { Preast } from "../../../preast/core/models/preast.model";
import { getAllParoasy } from "../../../eglise/core/requests/_get_request";
import { getAllPreast } from "../../../preast/core/requests/_get_request";
import { EcoleCathesiste } from "../../../ecole-cathesiste/core/models/ecole-cathesiste.model";
import { getAllEcoleCathesiste } from "../../../ecole-cathesiste/core/requests/_get_request";
import { putEleveCathesiste } from "../../core/requests/_post_request";
import { getEleveCathesiste } from "../../core/requests/_get_request";
import moment from "moment";
interface DataModel {
  firstName: string;
  lastName: string;
  birthDate: string;
  intergationDate: string;
  ecoleId: number | null;
}

const Create = () => {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const { toast } = useToast();
  const [data, setData] = useState<DataModel>({
    firstName: "",
    lastName: "",
    birthDate: "",
    intergationDate: "",
    ecoleId: null,
  });
  const [ecole, setEcole] = useState<EcoleCathesiste[]>([]);

  const fetchEcole = async () => {
    const response = await getAllEcoleCathesiste({ itemsPerPage: 1000 });
    setEcole(response.data.data);
  };
  useEffect(() => {
    fetchEcole();
  }, []);

  const onChange = (v: any) => {
    setData((prev: any) => ({ ...prev, ...v }));
  };

  const handleSend = async () => {
    setIsloading(true);
    await putEleveCathesiste(+id, {
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: data.birthDate,
      intergationDate: data.intergationDate,
      ecoleId: data.ecoleId ? +data.ecoleId : null,
    })
      .then((response) => {
        if (response?.status === 200) {
          setData({
            firstName: "",
            lastName: "",
            birthDate: "",
            intergationDate: "",
            ecoleId: null,
          });
          toast({ title: "Modification réussi" });
          setIsloading(false);
          router.push("/dashboard/eleve-cathesiste/");
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
    await getEleveCathesiste(id)
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
      <h1 className="mt-2 text-[18px] uppercase">
        Modifcation - Eleve cathesiste
      </h1>
      <form className="my-5">
        <div className="mb-2">
          <label htmlFor="firstName">Nom</label>
          <Input
            id="firstName"
            type="text"
            placeholder="Nom"
            value={data.firstName}
            onChange={(e) => onChange({ firstName: e?.target?.value })}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="lastName">Prénom</label>
          <Input
            id="lastName"
            type="text"
            placeholder="Prénom"
            value={data.lastName}
            onChange={(e) => onChange({ lastName: e?.target?.value })}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="type">Ecole cathesiste</label>
          <select
            onChange={(e) => onChange({ ecoleId: e?.target?.value })}
            className="w-full py-2 ps-2 border-[1px] border-[#000] dark:border-[#fff]"
          >
            {ecole.map((item: EcoleCathesiste) => (
              <option
                key={item.id}
                value={item.id}
                selected={data.ecoleId === item.id}
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label htmlFor="birthDate">Date de naissance</label>
          <Input
            id="birthDate"
            type="date"
            placeholder="Date de naissance"
            value={moment(data.birthDate).format("YYYY-MM-DD")}
            onChange={(e) => onChange({ birthDate: e?.target?.value })}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="intergationDate">Date d'integration</label>
          <Input
            id="intergationDate"
            type="date"
            placeholder="Date d'integration"
            value={moment(data.intergationDate).format("YYYY-MM-DD")}
            onChange={(e) => onChange({ intergationDate: e?.target?.value })}
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
