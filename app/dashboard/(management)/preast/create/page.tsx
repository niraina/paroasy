"use client";
import DashboardLayout from "@/app/dashboard/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/app/shared/components/Loading";
import { postPreast } from "../core/requests/_post_request";
import { Eglise } from "../../eglise/core/models/eglise.model";
import { getAllParoasy } from "../../eglise/core/requests/_get_request";
import { Textarea } from "@/components/ui/textarea";

const Create = () => {
  const router = useRouter();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    about: "",
    egliseId: null,
    status: "",
    birthDate: "",
    isResponsable: "no"
  });
  const [file, setFile] = useState<string>("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const { toast } = useToast();
  const [eglises, setEglises] = useState<Eglise[]>([]);

  const fetchEglise = async () => {
    setIsloading(true);
    try {
      const response = await getAllParoasy({ itemsPerPage: 1000 });
      setEglises(response?.data?.data);
      setIsloading(false);
    } catch (error) {
      console.log(error);
      setIsloading(false);
    }
  };

  useEffect(() => {
    fetchEglise();
  }, []);

  const onChange = (v: any) => {
    setData((prev: any) => ({ ...prev, ...v }));
  };

  const handleFile = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleSend = async () => {
    if (
      !data.firstName ||
      !data.lastName ||
      !data.birthDate ||
      !data.egliseId ||
      !data.status ||
      !file
    ) {
      toast({
        variant: "destructive",
        title: "Il y a des champs requis non valide",
      });
      return;
    }

    const formData = new FormData();
    formData.append("firstName", data?.firstName);
    formData.append("lastName", data?.lastName);
    formData.append("birthDate", data?.birthDate);
    formData.append("egliseId", data?.egliseId);
    formData.append("about", data?.about);
    formData.append("status", data?.status);
    formData.append("isResponsable", data?.isResponsable);
    formData.append("file", file);

    setIsloading(true);
    await postPreast(formData)
      .then((response) => {
        if (response?.status === 201 || response?.status === 200) {
          setData({
            firstName: "",
            lastName: "",
            about: "",
            egliseId: null,
            status: "",
            birthDate: "",
            isResponsable: "no",
          });
          toast({ title: "Enregistrement réussi" });
          router.push("/dashboard/preast/");
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
      <h1 className="mt-2 text-[18px] uppercase">Nouvelle - Prêtre</h1>
      <form className="my-5">
        <div className="mb-2">
          <label htmlFor="file">Fichier image</label>
          <Input
            id="file"
            type="file"
            placeholder="Image"
            onChange={handleFile}
          />
        </div>
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
          <label htmlFor="status">Status</label>
          <Input
            id="status"
            type="text"
            placeholder="Status"
            value={data.status}
            onChange={(e) => onChange({ status: e?.target?.value })}
          />
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
          <label htmlFor="egliseId">Eglise</label>
          <select
            onChange={(e) => onChange({ egliseId: e?.target?.value })}
            className="w-full py-2 ps-2 border-[1px] border-[#000] dark:border-[#fff]"
          >
            {eglises.map((item: Eglise) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label htmlFor="about">À propos</label>
          <Textarea
            id="about"
            onChange={(e) => onChange({ about: e?.target?.value })}
          ></Textarea>
        </div>
        <div className="mb-2">
          <label htmlFor="isResponsable">Responsable</label>
          <select
            onChange={(e) => onChange({ isResponsable: e?.target?.value })}
            className="w-full py-2 ps-2 border-[1px] border-[#000] dark:border-[#fff]"
          >
              <option value="no">
                Non
              </option>
              <option value="yes">
                Oui
              </option>
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
