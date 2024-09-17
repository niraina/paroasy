"use client";
import DashboardLayout from "@/app/dashboard/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/app/shared/components/Loading";
import { postParoasy } from "../core/requests/_post_request";
import { Eglise } from "../core/models/eglise.model";
import { REGION } from "@/app/shared/constant/region";

const Create = () => {
  const router = useRouter();
  const [data, setData] = useState<Eglise>({
    name: "",
    district: "",
    region: REGION[0].value,
    creationDate: new Date() as unknown as string,
  });
  const [isLoading, setIsloading] = useState<boolean>(false);
  const { toast } = useToast();

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
    await postParoasy({
      name: data?.name,
      district: data?.district,
      region: data?.region,
      creationDate: data?.creationDate,
    })
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          setData({
            name: "",
            district: "",
            region: "",
          });
          toast({ title: "Enregistrement réussi" });
          router.push("/dashboard/eglise/");
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
      <h1 className="mt-2 text-[18px] uppercase">Nouvelle - Eglise</h1>
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
        <Button type="button" className="btn-theme my-5" onClick={handleSend}>
          Enregistrer
        </Button>
      </form>
      <Loading loading={isLoading} />
    </DashboardLayout>
  );
};

export default Create;
