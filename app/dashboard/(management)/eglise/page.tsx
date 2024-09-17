"use client";
import { AppDispatch } from "@/app/store/store";
import { useResponseDataEglise, useResponseEgliseData } from "./lib";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchEglise } from "./core/actions";
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
import { Eglise } from "./core/models/eglise.model";
import { Pencil, Trash2 } from "lucide-react";
import { PaginationPage } from "@/app/shared/components/Pagination";
import Loading from "@/app/shared/components/Loading";
import { deleteParoasy } from "./core/requests/_del_request";
import { toast } from "@/components/ui/use-toast";

const EglisePage = () => {
  const eglises = useResponseDataEglise();
  const { request, isLoading, response } = useResponseEgliseData();
  const dispatch: AppDispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(
    response.currentPage || 1
  );
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchEglise({ ...request, page: currentPage }));
  }, [dispatch, request, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (e: any) => {
    dispatch(fetchEglise({ ...request, page: 1, name: e?.target?.value }));
  };

  const handleDelete = async (id: number) => {
    await deleteParoasy(+id)
      .then((response) => {
        if (response?.status === 200) {
          toast({ title: "Suppression réussi" });
          dispatch(fetchEglise({ ...request, page: currentPage }));
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
      <h1 className="mt-2 text-[18px] uppercase">Eglise</h1>
      <div className="px-2 py-2">
        <Button
          className="btn-theme my-5"
          onClick={() => router.push("eglise/create")}
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
              <TableHead>Titre</TableHead>
              <TableHead>Région</TableHead>
              <TableHead>District</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {eglises?.map((item: Eglise) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item?.name}</TableCell>
                <TableCell className="font-medium">{item?.region}</TableCell>
                <TableCell className="font-medium">{item?.district}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Pencil
                      className="cursor-pointer"
                      onClick={() => router.push(`eglise/create/${item.id}`)}
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
