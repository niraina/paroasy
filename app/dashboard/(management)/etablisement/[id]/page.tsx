"use client";
import DashboardLayout from "@/app/dashboard/page";
import React, { useEffect, useState } from "react";
import { Etablisement } from "../core/models/etablisement.model";
import { useParams } from "next/navigation";
import { getEtablisement } from "../core/requests/_get_request";
import Loading from "@/app/shared/components/Loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatNumber } from "@/app/shared/usecase/stat";
import Image from "next/image";
import { Responsable } from "../core/models/responsable.model";
import Link from "next/link";

const Show = () => {
  const { id } = useParams();
  const [data, setData] = useState<Etablisement>();
  const [loading, setLoading] = useState<boolean>(false);
  const getData = async (id: number) => {
    try {
      setLoading(true);
      await getEtablisement(id)
        .then((response) => {
          setData(response?.data?.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    id && getData(+id);
  }, [id]);

  console.log(data);

  return (
    <DashboardLayout>
      <Link
        href="/dashboard/etablisement"
        className="underline italic bold my-4 block"
      >
        Retour
      </Link>
      <h1 className="mt-2 text-[18px] uppercase mb-4">Etablisement - Détail</h1>
      <Table className="border-[1px]">
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Région</TableHead>
            <TableHead>District</TableHead>
            <TableHead>Nombre d'élève</TableHead>
            <TableHead>CEPE</TableHead>
            <TableHead>Resultat CEPE</TableHead>
            <TableHead>BEPC</TableHead>
            <TableHead>Resultat BEPC</TableHead>
            <TableHead>BACC</TableHead>
            <TableHead>Resultat BACC</TableHead>
            <TableHead>Année scolaire</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">{data?.name}</TableCell>
            <TableCell className="font-medium capitalize">
              {data?.region}
            </TableCell>
            <TableCell className="font-medium">{data?.district}</TableCell>
            <TableCell className="font-medium">{data?.nbEleve}</TableCell>
            <TableCell className="font-medium">{data?.nbCepe}</TableCell>
            <TableCell className="font-medium">
              {data?.resultCepe}{" "}
              <span className="text-red-800">
                (
                {data?.resultCepe &&
                  formatNumber((data?.resultCepe * 100) / data?.nbCepe)}
                )
              </span>
            </TableCell>
            <TableCell className="font-medium">{data?.nbBepc}</TableCell>
            <TableCell className="font-medium">
              {data?.resultBepc}{" "}
              <span className="text-red-800">
                (
                {data?.resultBepc &&
                  formatNumber((data?.resultBepc * 100) / data?.nbBepc)}
                )
              </span>
            </TableCell>
            <TableCell className="font-medium">{data?.nbBacc}</TableCell>
            <TableCell className="font-medium">
              {data?.resultBacc}{" "}
              <span className="text-red-800">
                (
                {data?.resultBacc &&
                  formatNumber((data?.resultBacc * 100) / data?.nbBacc)}
                )
              </span>
            </TableCell>
            <TableCell className="font-medium">{data?.schoolYear}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <h2 className="mt-2 text-[18px] uppercase mb-4">Responsable</h2>
      <Table className="border-[1px]">
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Nom et prénom</TableHead>
            <TableHead>Poste</TableHead>
            <TableHead>Téléphone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.responsable?.map((item: Responsable) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                <Image
                  src={item?.thumbnail}
                  width={100}
                  height={100}
                  alt={item.fullName}
                  className="object-cover"
                />
              </TableCell>
              <TableCell className="font-medium capitalize">
                {item?.fullName}
              </TableCell>
              <TableCell className="font-medium">{item?.poste}</TableCell>
              <TableCell className="font-medium">{item?.tel}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Loading loading={loading} />
    </DashboardLayout>
  );
};

export default Show;
