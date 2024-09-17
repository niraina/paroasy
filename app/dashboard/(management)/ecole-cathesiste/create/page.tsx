"use client";
import DashboardLayout from "@/app/dashboard/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/app/shared/components/Loading";
import { postEcoleCathesiste } from "../core/requests/_post_request";
import { Eglise } from "../../eglise/core/models/eglise.model";
import { getAllParoasy } from "../../eglise/core/requests/_get_request";
import { Preast } from "../../preast/core/models/preast.model";
import { getAllPreast } from "../../preast/core/requests/_get_request";
interface DataModel {
  name: string;
  egliseId: number | null;
  preastId: number | null;
}
const Create = () => {
  const router = useRouter();
  const [data, setData] = useState<DataModel>({
    name: "",
    egliseId: null,
    preastId: null,
  });
  const [isLoading, setIsloading] = useState<boolean>(false);
  const { toast } = useToast();
  const [eglise, setEglise] = useState<Eglise[]>([]);
  const [preast, setPreast] = useState<Preast[]>([]);

  const fetchEglise = async () => {
    const response = await getAllParoasy({ itemsPerPage: 1000 });
    setEglise(response.data.data);
  };
  useEffect(() => {
    fetchEglise();
  }, []);

  const fetchPreast = async () => {
    const response = await getAllPreast({ itemsPerPage: 1000 });
    setPreast(response.data.data);
  };
  useEffect(() => {
    fetchPreast();
  }, []);

  const onChange = (v: any) => {
    setData((prev: any) => ({ ...prev, ...v }));
  };

  const handleSend = async () => {
    if (!data.name) {
      toast({
        variant: "destructive",
        title: "Champ titre requis",
      });
      return;
    }
    setIsloading(true);
    await postEcoleCathesiste({
      name: data.name,
      egliseId: data.egliseId ? +data.egliseId : null,
      preastId: data.preastId ? +data.preastId : null,
    })
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          setData({
            name: "",
            egliseId: null,
            preastId: null,
          });
          toast({ title: "Enregistrement réussi" });
          router.push("/dashboard/ecole-cathesiste/");
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
      <h1 className="mt-2 text-[18px] uppercase">
        Nouvelle - Ecole cathesiste
      </h1>
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
        <div className="mb-2">
          <label htmlFor="type">Eglise</label>
          <select
            onChange={(e) => onChange({ egliseId: e?.target?.value })}
            className="w-full py-2 ps-2 border-[1px] border-[#000] dark:border-[#fff]"
          >
            {eglise.map((item: Eglise) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label htmlFor="type">Responsable</label>
          <select
            onChange={(e) => onChange({ preastId: e?.target?.value })}
            className="w-full py-2 ps-2 border-[1px] border-[#000] dark:border-[#fff]"
          >
            {preast.map((item: Preast) => (
              <option key={item.id} value={item.id}>
                {item.firstName} {item.lastName}
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
