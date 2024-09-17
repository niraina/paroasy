"use client";
import DashboardLayout from "@/app/dashboard/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/app/shared/components/Loading";
import { getAllEcoleCathesiste } from "../../ecole-cathesiste/core/requests/_get_request";
import { postEleveCathesiste } from "../core/requests/_post_request";
import { EcoleCathesiste } from "@prisma/client";
interface DataModel {
  firstName: string;
  lastName: string;
  birthDate: string;
  intergationDate: string;
  ecoleId: number | null;
}
const Create = () => {
  const router = useRouter();
  const [data, setData] = useState<DataModel>({
    firstName: "",
    lastName: "",
    birthDate: "",
    intergationDate: "",
    ecoleId: null,
  });
  const [isLoading, setIsloading] = useState<boolean>(false);
  const { toast } = useToast();
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
    if (
      !data.firstName ||
      !data.lastName ||
      !data.birthDate ||
      !data.intergationDate ||
      !data.ecoleId
    ) {
      toast({
        variant: "destructive",
        title: "Champ titre requis",
      });
      return;
    }
    setIsloading(true);
    await postEleveCathesiste({
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: data.birthDate,
      intergationDate: data.intergationDate,
      ecoleId: +data.ecoleId,
    })
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          setData({
            firstName: "",
            lastName: "",
            birthDate: "",
            intergationDate: "",
            ecoleId: null,
          });
          toast({ title: "Enregistrement réussi" });
          router.push("/dashboard/eleve-cathesiste/");
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
        Nouvelle - Eleve cathesiste
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
              <option key={item.id} value={item.id}>
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
            value={data.birthDate}
            onChange={(e) => onChange({ birthDate: e?.target?.value })}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="intergationDate">Date d'integration</label>
          <Input
            id="intergationDate"
            type="date"
            placeholder="Date d'integration"
            value={data.intergationDate}
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
