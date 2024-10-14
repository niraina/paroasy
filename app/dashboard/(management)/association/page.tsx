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
import { Eye, Pencil, Trash2 } from "lucide-react";
import { PaginationPage } from "@/app/shared/components/Pagination";
import Loading from "@/app/shared/components/Loading";
import { toast } from "@/components/ui/use-toast";
import moment from "moment";
import { useResponseDataHomonorie, useResponseHomonorieData } from "./lib";
import { fetchHomonorie } from "./core/actions";
import { deleteHomonorie } from "./core/requests/_del_request";
import { Homonorie } from "./core/models/homonorie.model";

const HomonoriePage = () => {
  const datas = useResponseDataHomonorie();
  const { request, isLoading, response } = useResponseHomonorieData();
  const dispatch: AppDispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(
    response.currentPage || 1
  );
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchHomonorie({ ...request, page: currentPage }));
  }, [dispatch, request, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (e: any) => {
    dispatch(fetchHomonorie({ ...request, page: 1, name: e?.target?.value }));
  };

  const handleDelete = async (id: number) => {
    await deleteHomonorie(+id)
      .then((response) => {
        if (response?.status === 200) {
          toast({ title: "Suppression réussi" });
          dispatch(fetchHomonorie({ ...request, page: currentPage }));
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
      <h1 className="mt-2 text-[18px] uppercase">Association</h1>
      <div className="px-2 py-2">
        <div className="flex gap-3">
          <Button
            className="btn-theme my-5"
            onClick={() => router.push("association/create")}
          >
            Ajouter
          </Button>
        </div>
        <Input
          onChange={(e) => handleSearch(e)}
          className="my-5 w-[200px] rounded-[5px]"
          placeholder="Rechercher..."
          type="search"
        />
        <Table className="border-[1px]">
          <TableHeader>
            <TableRow>
              <TableHead>Nom de l'association</TableHead>
              <TableHead>Nombre des membres </TableHead>
              <TableHead>Nombre zokiny</TableHead>
              <TableHead>Nombre zandriny</TableHead>
              <TableHead>Eglise</TableHead>
              <TableHead>Responsable</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {datas?.map((item: Homonorie) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item?.name}</TableCell>
                <TableCell className="font-medium">{item?.membre}</TableCell>
                <TableCell className="font-medium capitalize">
                  {item?.nbZoky}
                </TableCell>
                <TableCell className="font-medium capitalize">
                  {item?.nbZandry}
                </TableCell>
                <TableCell className="font-medium capitalize">
                  {item?.eglise?.name}
                </TableCell>
                <TableCell className="font-medium capitalize">
                  {item?.responsable ? item?.responsable[0]?.fullName : ""}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Eye
                      className="cursor-pointer"
                      onClick={() => router.push(`association/${item.id}`)}
                    />
                    <Pencil
                      className="cursor-pointer"
                      onClick={() =>
                        router.push(`association/create/${item.id}`)
                      }
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

export default HomonoriePage;