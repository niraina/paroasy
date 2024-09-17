"use client";
import DashboardLayout from "@/app/dashboard/page";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/app/shared/components/Loading";
import { Input } from "@/components/ui/input";
import { EcoleCathesiste } from "../../../ecole-cathesiste/core/models/ecole-cathesiste.model";
import { getAllEcoleCathesiste } from "../../../ecole-cathesiste/core/requests/_get_request";
import moment from "moment";
import { REGION } from "@/app/shared/constant/region";
import { putSante } from "../../core/requests/_post_request";
import { getSante } from "../../core/requests/_get_request";
interface DataModel {
  nomMaladie: string;
  personne: string;
  creationDate: string;
  region: string;
  district: string;
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
  });

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
    })
      .then((response) => {
        if (response?.status === 200) {
          setData({
            nomMaladie: "",
            personne: "",
            creationDate: "",
            region: REGION[0].value,
            district: "",
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
      <h1 className="mt-2 text-[18px] uppercase">
        Nouvelle - Eleve cathesiste
      </h1>
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
        <Button type="button" className="btn-theme my-5" onClick={handleSend}>
          Enregistrer
        </Button>
      </form>
      <Loading loading={isLoading} />
    </DashboardLayout>
  );
};

export default Create;
