"use client";
import DashboardLayout from "@/app/dashboard/page";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/app/shared/components/Loading";
import { Input } from "@/components/ui/input";
import { Etablisement } from "../../core/models/etablisement.model";
import { REGION } from "@/app/shared/constant/region";
import {
  postResponsable,
  putEtablisement,
  putResponsable,
} from "../../core/requests/_post_request";
import { getEtablisement } from "../../core/requests/_get_request";

const Create = () => {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const { toast } = useToast();
  const [data, setData] = useState<Etablisement>({
    name: "",
    district: "",
    region: REGION[0].value,
    nbEleve: 0,
    nbBacc: 0,
    nbBepc: 0,
    nbCepe: 0,
    resultBepc: 0,
    resultBacc: 0,
    resultCepe: 0,
    diocese: "",
    schoolYear: "",
  });

  const [responsable, setResponsable] = useState({
    fullName: "",
    poste: "",
    tel: "",
    id: "",
  });
  const [file, setFile] = useState<string>("");

  const onChange = (v: any) => {
    setData((prev: any) => ({ ...prev, ...v }));
  };

  const onChangeResponsable = (v: any) => {
    setResponsable((prev: any) => ({ ...prev, ...v }));
  };

  const handleSend = async () => {
    setIsloading(true);
    await putEtablisement(+id, {
      name: data.name,
      district: data.district,
      region: data.region,
      nbEleve: +data.nbEleve,
      nbBacc: +data.nbBacc,
      nbBepc: +data.nbBepc,
      nbCepe: +data.nbCepe,
      resultBepc: +data.resultBepc,
      resultBacc: +data.resultBacc,
      resultCepe: +data.resultCepe,
      diocese: data.diocese,
      schoolYear: data.schoolYear,
    })
      .then((response) => {
        if (response?.status === 200) {
          setData({
            name: data.name,
            district: data.district,
            region: data.region,
            nbEleve: +data.nbEleve,
            nbBacc: +data.nbBacc,
            nbBepc: +data.nbBepc,
            nbCepe: +data.nbCepe,
            resultBepc: +data.resultBepc,
            resultBacc: +data.resultBacc,
            resultCepe: +data.resultCepe,
            diocese: data.diocese,
            schoolYear: data.schoolYear,
          });

          if (responsable?.id) {
            const formData = new FormData();
            formData.append("fullName", responsable?.fullName);
            formData.append("poste", responsable?.poste);
            formData.append("tel", responsable?.tel);
            formData.append("etablisementId", id ? (id as any) : "");
            formData.append("id", responsable?.id as any);
            formData.append("file", file);
            putResponsable(+responsable?.id, formData)
              .then((res) => {
                toast({ title: "Modification réussi" });
                setIsloading(false);
                router.push("/dashboard/etablisement/");
              })
              .catch((error) => {
                toast({
                  variant: "destructive",
                  title: error?.res?.data?.error || "Modification échoué",
                });
                setIsloading(false);
              });
          } else {
            const formData = new FormData();
            formData.append("fullName", responsable?.fullName);
            formData.append("poste", responsable?.poste);
            formData.append("tel", responsable?.tel);
            formData.append("file", file);
            postResponsable(formData)
              .then((response) => {
                if (response?.status === 200 || response?.status === 201) {
                  setResponsable({
                    fullName: "",
                    poste: "",
                    tel: "",
                    id: "",
                  });
                  toast({ title: "Enregistrement réussi" });
                  router.push("/dashboard/etablisement/");
                  setIsloading(false);
                }
              })
              .catch((error) => {
                toast({
                  variant: "destructive",
                  title:
                    error?.response?.data?.error || "Enregistrement échoué",
                });
                setIsloading(false);
              });
          }
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
    await getEtablisement(id)
      .then((response) => {
        if (response?.status === 200) {
          setData(response?.data?.data);
          setResponsable({
            fullName: response?.data?.data?.responsable[0]?.fullName || "",
            poste: response?.data?.data?.responsable[0]?.poste || "",
            tel: response?.data?.data?.responsable[0]?.tel || "",
            id: response?.data?.data?.responsable[0]?.id || null,
          });
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
      <h1 className="mt-2 text-[18px] uppercase">Nouvelle - Etablisement</h1>
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
        <div className="mb-2">
          <label htmlFor="diocese">Diocèse</label>
          <Input
            id="diocese"
            type="text"
            placeholder="Diocèse"
            value={data.diocese}
            onChange={(e) => onChange({ diocese: e?.target?.value })}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="nbEleve">Nombre d'élève</label>
          <Input
            id="nbEleve"
            type="number"
            placeholder="Nombre d'élève"
            value={data.nbEleve}
            onChange={(e) => onChange({ nbEleve: e?.target?.value })}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="nbCepe">Nombre d'élève CEPE</label>
          <Input
            id="nbCepe"
            type="number"
            placeholder="Nombre d'élève CEPE"
            value={data.nbCepe}
            onChange={(e) => onChange({ nbCepe: e?.target?.value })}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="resultCepe">Résultat CEPE</label>
          <Input
            id="resultCepe"
            type="number"
            placeholder="Résultat CEPE"
            value={data.resultCepe}
            onChange={(e) => onChange({ resultCepe: e?.target?.value })}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="nbBepc">Nombre d'élève BEPC</label>
          <Input
            id="nbBepc"
            type="number"
            placeholder="Nombre d'élève BEPC"
            value={data.nbBepc}
            onChange={(e) => onChange({ nbBepc: e?.target?.value })}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="resultBepc">Résultat BEPC</label>
          <Input
            id="resultBepc"
            type="number"
            placeholder="Résultat BEPC"
            value={data.resultBepc}
            onChange={(e) => onChange({ resultBepc: e?.target?.value })}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="nbBacc">Nombre d'élève BACC</label>
          <Input
            id="nbBacc"
            type="number"
            placeholder="Nombre d'élève BACC"
            value={data.nbBacc}
            onChange={(e) => onChange({ nbBacc: e?.target?.value })}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="resultBacc">Résultat BACC</label>
          <Input
            id="resultBacc"
            type="number"
            placeholder="Résultat BACC"
            value={data.resultBacc}
            onChange={(e) => onChange({ resultBacc: e?.target?.value })}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="schoolYear">Année scolaire</label>
          <Input
            id="schoolYear"
            type="text"
            placeholder="Année scolaire"
            value={data.schoolYear}
            onChange={(e) => onChange({ schoolYear: e?.target?.value })}
          />
        </div>
        <hr />
        <h2 className="text-[28px] my-3">Responsable</h2>
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

export default Create;
