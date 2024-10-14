"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useParams } from "next/navigation";
import { getLibrairy } from "../core/requests/_get_request";
import { useEffect, useState } from "react";
import DashboardLayout from "@/app/dashboard/page";
import { Librairy } from "../core/models/librairy.model";
import { ResponsableLibrairy } from "../core/models/responsable.model";
import Image from "next/image";
import { Book } from "../core/models/book.model";
import Link from "next/link";
const Detail = () => {
  const { id } = useParams();
  const [data, setData] = useState<Librairy>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchData = async (id: any) => {
    try {
      setIsLoading(true);
      await getLibrairy(id).then((response) => {
        setData(response?.data?.data);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    id && fetchData(+id);
  }, [id]);
  return (
    <DashboardLayout>
      <Link
        href="/dashboard/librairy/"
        className="px-1 underline py-6 block font-bold"
      >
        Retour
      </Link>
      <h1 className="mt-2 text-[18px] uppercase">Librairie - {data?.name}</h1>
      <h2 className="my-3 font-semibold">Résponsables : </h2>
      <Table className="border-[1px]">
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Nom et prénom</TableHead>
            <TableHead>Poste</TableHead>
            <TableHead>Contact</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.responsable?.map((item: ResponsableLibrairy) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                <Image
                  src={item?.thumbnail}
                  width={40}
                  height={40}
                  alt={item?.fullName}
                />
              </TableCell>
              <TableCell className="font-medium">{item?.fullName}</TableCell>
              <TableCell className="font-medium capitalize">
                {item?.poste}
              </TableCell>
              <TableCell>{item?.tel}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <h2 className="my-3 font-semibold">Livres : </h2>
      <Table className="border-[1px]">
        <TableHeader>
          <TableRow>
            <TableHead>Titre</TableHead>
            <TableHead>Auteur</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.book?.map((item: Book) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item?.title}</TableCell>
              <TableCell className="font-medium capitalize">
                {item?.author}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DashboardLayout>
  );
};

export default Detail;
