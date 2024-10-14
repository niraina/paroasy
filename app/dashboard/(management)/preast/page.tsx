"use client";
import { AppDispatch } from "@/app/store/store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "../../page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { PaginationPage } from "@/app/shared/components/Pagination";
import Loading from "@/app/shared/components/Loading";
import { toast } from "@/components/ui/use-toast";
import { useResponseDataPreast, useResponsePreastData } from "./lib";
import { fetchPreast } from "./core/actions";
import { deletePreast } from "./core/requests/_del_request";
import { Preast } from "./core/models/preast.model";
import Image from "next/image";
import moment from "moment";

const EglisePage = () => {
  const datas = useResponseDataPreast();
  const { request, isLoading, response } = useResponsePreastData();
  const dispatch: AppDispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(
    response.currentPage || 1
  );
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchPreast({ ...request, page: currentPage }));
  }, [dispatch, request, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (e: any) => {
    dispatch(fetchPreast({ ...request, page: 1, firstName: e?.target?.value }));
  };

  const handleDelete = async (id: number) => {
    await deletePreast(+id)
      .then((response) => {
        if (response?.status === 200) {
          toast({ title: "Suppression réussi" });
          dispatch(fetchPreast({ ...request, page: currentPage }));
          setLoading(false);
        }
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: error?.response?.data?.error || "Suppression échoué",
        });
        setLoading(false);
      });
  };
  return (
    <DashboardLayout>
      <h1 className="mt-2 text-[18px] uppercase">Prêtre</h1>
      <div className="px-2 py-2">
        <Button
          className="btn-theme my-5"
          onClick={() => router.push("preast/create")}
        >
          Ajouter
        </Button>
        <Input
          onChange={(e) => handleSearch(e)}
          className="my-5 w-[200px] rounded-[5px]"
          placeholder="Rechercher..."
          type="search"
        />
        <Table className="border-[1px]">
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Nom et prénom</TableHead>
              <TableHead>Date de naissance</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Eglise</TableHead>
              <TableHead>Responsable</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {datas?.map((item: Preast) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  <Image
                    src={item.thumbnail}
                    width={40}
                    height={40}
                    alt={item.firstName}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  {item?.firstName} {item?.lastName}
                </TableCell>
                <TableCell className="font-medium">
                  {item.birthDate &&
                    moment(item.birthDate).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell className="font-medium">{item?.status}</TableCell>
                <TableCell className="font-medium">
                  {item?.eglise?.name}
                </TableCell>
                <TableCell className="font-medium">
                  {item?.isResponsable === "yes" ? "Oui" : "Non"}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Pencil
                      className="cursor-pointer"
                      onClick={() => router.push(`preast/create/${item.id}`)}
                    />
                    <Trash2
                      className="cursor-pointer"
                      onClick={() => handleDelete(item?.id as number)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <PaginationPage
          currentPage={currentPage}
          totalPages={response?.totalPages || 1}
          onPageChange={handlePageChange}
        />
      </div>
      <Loading loading={isLoading || loading} />
    </DashboardLayout>
  );
};

export default EglisePage;
