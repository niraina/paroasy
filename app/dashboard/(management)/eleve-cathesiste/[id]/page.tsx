"use client";

import { useParams } from "next/navigation";
import { getEleveCathesiste } from "../core/requests/_get_request";
import { useEffect, useState } from "react";
import { EleveCathesiste } from "../core/models/eleve-cathesiste.model";
import { toast } from "@/components/ui/use-toast";
import { getEcoleCathesiste } from "../../ecole-cathesiste/core/requests/_get_request";
import DashboardLayout from "@/app/dashboard/page";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import moment from "moment";
import { EcoleCathesiste } from "../../ecole-cathesiste/core/models/ecole-cathesiste.model";
import Link from "next/link";
import Loading from "@/app/shared/components/Loading";

const Show = () => {
  const { id } = useParams();
  const [data, setData] = useState<EleveCathesiste>();
  const [ecole, setEcole] = useState<EcoleCathesiste>();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const fetchById = async (id: number) => {
    await getEleveCathesiste(id)
      .then((response) => {
        if (response?.status === 200) {
          setData(response?.data?.data);
          setIsloading(false);
          getEcoleCathesiste(+response?.data?.data?.ecoleId)
            .then((res) => {
              setEcole(res?.data?.data);
              setIsloading(false);
            })
            .catch((error) => {
              toast({
                variant: "destructive",
                title: error?.response?.data?.error || "Enregistrement échoué",
              });
              setIsloading(false);
            });
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
      <div className="my-6">
        <h1 className="text-2xl my-4">{data?.ecole?.name}</h1>
        <p className="mb-2">
          Responsable: {ecole?.preast?.firstName} {ecole?.preast?.lastName}
        </p>
        <Table className="border-[1px]">
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Nom et Prénom</TableCell>
              <TableCell className="font-medium">
                {data?.firstName} {data?.lastName}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Date de naissance</TableCell>
              <TableCell className="font-medium">
                {moment(data?.birthDate).format("DD/MM/YYYY")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Date d'integration</TableCell>
              <TableCell className="font-medium">
                {moment(data?.intergationDate).format("DD/MM/YYYY")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Eglise</TableCell>
              <TableCell className="font-medium">
                {ecole?.eglise?.name}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Région</TableCell>
              <TableCell className="font-medium">
                {ecole?.eglise?.region}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">District</TableCell>
              <TableCell className="font-medium">
                {ecole?.eglise?.district}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Link
          href="/dashboard/eleve-cathesiste/"
          className="px-1 underline py-6 block font-bold"
        >
          Retour
        </Link>
      </div>
      <Loading loading={isLoading} />
    </DashboardLayout>
  );
};

export default Show;
