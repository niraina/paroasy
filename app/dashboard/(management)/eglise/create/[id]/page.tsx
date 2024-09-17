"use client";
import DashboardLayout from "@/app/dashboard/page";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/app/shared/components/Loading";
import Wygywyg from "@/app/shared/components/Wygywyg";
import { Eglise } from "../../core/models/eglise.model";
import { getParoasy } from "../../core/requests/_get_request";
import { putParoasy } from "../../core/requests/_post_request";
import { Input } from "@/components/ui/input";

const Create = () => {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const { toast } = useToast();
  const [data, setData] = useState<Eglise>({
    name: "",
    district: "",
    region: "anôsy",
    creationDate: new Date() as unknown as string,
  });

  const onChange = (v: any) => {
    setData((prev: any) => ({ ...prev, ...v }));
  };

  const handleSend = async () => {
    setIsloading(true);
    await putParoasy(+id, {
      name: data.name,
      region: data?.region,
      district: data?.district,
    })
      .then((response) => {
        if (response?.status === 200) {
          setData({
            name: "",
            district: "",
            region: "anôsy",
            creationDate: new Date() as unknown as string,
          });
          toast({ title: "Modification réussi" });
          setIsloading(false);
          router.push("/dashboard/eglise/");
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

  const fetchHomeById = async (id: number) => {
    await getParoasy(id)
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
    id && fetchHomeById(+id);
  }, [id]);
  return (
    <DashboardLayout>
      <form className="my-5">
        <div className="mb-2">
          <label htmlFor="name">Nom</label>
          <Input
            id="name"
            type="text"
            placeholder="Titre"
            value={data.name}
            onChange={(e) => onChange({ name: e?.target?.value })}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="type">Région</label>
          <select
            onChange={(e) => onChange({ region: +e?.target?.value })}
            className="w-full py-2 ps-2 border-[1px] border-[#000] dark:border-[#fff]"
          >
            <option value="anôsy">Anôsy</option>
            <option value="androy">Androy</option>
          </select>
        </div>
        <div className="mb-2">
          <label htmlFor="district">District</label>
          <Input
            id="district"
            type="text"
            placeholder="Titre"
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
