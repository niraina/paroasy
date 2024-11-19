"use client";
import { AppDispatch } from "@/app/store/store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { PaginationPage } from "@/app/shared/components/Pagination";
import Loading from "@/app/shared/components/Loading";
import { toast } from "@/components/ui/use-toast";
import {
  useResponseDataSanteResponsable,
  useResponseSanteResponsableData,
} from "../lib";
import { fetchSanteResponsable } from "../core/actions";
import { deleteSanteResponsable } from "../core/requests/_del_request";
import { Responsable } from "../core/models/responsable.model";
import Image from "next/image";
import DashboardLayout from "@/app/dashboard/page";

const ResponsabblePage = () => {
  const datas = useResponseDataSanteResponsable();
  const { request, isLoading, response } = useResponseSanteResponsableData();
  const dispatch: AppDispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(
    response.currentPage || 1
  );
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchSanteResponsable({ ...request, page: currentPage }));
  }, [dispatch, request, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id: number) => {
    await deleteSanteResponsable(+id)
      .then((response) => {
        if (response?.status === 200) {
          toast({ title: "Suppression réussi" });
          dispatch(fetchSanteResponsable({ ...request, page: currentPage }));
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
      <h1 className="mt-2 text-[18px] uppercase">Responsable - CDS</h1>
      <div className="px-2 py-2">
        <Button
          className="btn-theme my-5"
          onClick={() => router.push("responsable/create")}
        >
          Ajouter
        </Button>
        <Table className="border-[1px]">
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Nom et prénom</TableHead>
              <TableHead>Poste </TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {datas?.map((item: Responsable) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  <Image
                    src={item.thumbnail}
                    width={100}
                    height={100}
                    alt={item.fullName}
                    className="object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{item?.fullName}</TableCell>
                <TableCell className="font-medium">{item?.poste}</TableCell>
                <TableCell className="font-medium">{item?.tel}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Pencil
                      className="cursor-pointer"
                      onClick={() => router.push(`responsable/${item.id}`)}
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

export default ResponsabblePage;
