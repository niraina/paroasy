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
import { createFormData } from "@/app/shared/usecase/createFormData";
import { postFormation } from "../core/requests/_post_request";
import { EleveCathesiste } from "../../eleve-cathesiste/core/models/eleve-cathesiste.model";
import { getAllEleveCathesiste } from "../../eleve-cathesiste/core/requests/_get_request";
interface DataModel {
  label: string;
  eleveId: number | null;
}
const Create = () => {
  const router = useRouter();

  const [data, setData] = useState<DataModel>({
    label: "",
    eleveId: null,
  });
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [eleve, setEleve] = useState<EleveCathesiste[]>([]);

  const fecthEleve = async () => {
    const response = await getAllEleveCathesiste({ page: 1 });
    setEleve(response?.data?.data);
  };

  useEffect(() => {
    fecthEleve();
  }, []);

  const onChange = (v: any) => {
    setData((prev: any) => ({ ...prev, ...v }));
  };

  const handleSend = async () => {
    if (!data.label || !data.eleveId) {
      toast({
        variant: "destructive",
        title: "Champ titre requis",
      });
      console.log(data);

      return;
    }
    setIsloading(true);
    await postFormation({
      label: data.label,
      eleveId: data.eleveId,
    })
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          setData({
            label: "",
            eleveId: null,
          });
          toast({ title: "Enregistrement réussi" });
          router.push("/dashboard/formation/");
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
      <h1 className="mt-2 text-[18px] uppercase">Nouvelle - formation</h1>
      <form className="my-5">
        <div className="mb-2">
          <label htmlFor="type">Formation</label>
          <select
            onChange={(e) => onChange({ label: e?.target?.value })}
            className="w-full py-2 ps-2 border-[1px] border-[#000] dark:border-[#fff]"
          >
            <option value="Petit seminaire" selected>
              Petit seminaire
            </option>
            <option value="Grand seminaire">Grand seminaire</option>
          </select>
        </div>
        <div className="mb-2">
          <label htmlFor="type">Eleve</label>
          <select
            onChange={(e) => onChange({ eleveId: e?.target?.value })}
            className="w-full py-2 ps-2 border-[1px] border-[#000] dark:border-[#fff]"
          >
            {eleve?.map((item: EleveCathesiste, index: number) => (
              <option value={item.id} key={item.id} selected={index === 0}>
                {item?.firstName} {item?.lastName}
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
