"use client";
import DashboardLayout from "@/app/dashboard/page";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/app/shared/components/Loading";
import { Input } from "@/components/ui/input";
import { putSanteResponsable } from "../../core/requests/_post_request";
import { getSanteResponsable } from "../../core/requests/_get_request";

const DetailResponsable = () => {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const { toast } = useToast();

  const [responsable, setResponsable] = useState({
    fullName: "",
    poste: "",
    tel: "",
    id: "",
  });
  const [file, setFile] = useState<string>("");

  const onChangeResponsable = (v: any) => {
    setResponsable((prev: any) => ({ ...prev, ...v }));
  };

  const fetchById = async (id: number) => {
    await getSanteResponsable(id)
      .then((response) => {
        if (response?.status === 200) {
          setResponsable(response?.data?.data);
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

  const handleSend = async () => {
    setIsloading(true);
    const formData = new FormData();
    formData.append("fullName", responsable?.fullName);
    formData.append("poste", responsable?.poste);
    formData.append("tel", responsable?.tel);
    formData.append("id", responsable?.id as any);
    formData.append("file", file);
    await putSanteResponsable(+id, formData)
      .then((response) => {
        if (response?.status === 200) {
          setResponsable({
            fullName: "",
            poste: "",
            tel: "",
            id: "",
          });
          toast({ title: "Modification réussi" });
          setIsloading(false);
          router.push("/dashboard/sante/responsable");
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

  return (
    <DashboardLayout>
      <h1 className="mt-2 text-[18px] uppercase">Nouvelle - Etablisement</h1>
      <form className="my-5">
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
            value={+responsable.tel}
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

export default DetailResponsable;
