"use client";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../page";
import { AppDispatch } from "@/app/store/store";
import { useDispatch } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PaginationPage } from "@/app/shared/components/Pagination";
import Loading from "@/app/shared/components/Loading";
import { useResponseDataTonokira, useResponseTonokiraData } from "./lib";
import { fetchTonokira } from "./core/actions";
import { Tonokira } from "./core/models/home.model";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { deleteTonokira } from "./core/requests/_del_request";
import { toast } from "@/components/ui/use-toast";

const HomeDashPage = () => {
  const homes = useResponseDataTonokira();
  const { request, isLoading, response } = useResponseTonokiraData();
  const dispatch: AppDispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(
    response.currentPage || 1
  );
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchTonokira({ ...request, page: currentPage }));
  }, [dispatch, request, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (e: any) => {
    dispatch(fetchTonokira({ ...request, page: 1, title: e?.target?.value }));
  };

  const handleDelete = async (id: number) => {
    await deleteTonokira(+id)
      .then((response) => {
        if (response?.status === 200) {
          toast({ title: "Suppression réussi" });
          dispatch(fetchTonokira({ ...request, page: currentPage }));
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
      <div className="px-2 py-2">
        <Button
          className="btn-theme my-5"
          onClick={() => router.push("tonokira/create")}
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
              <TableHead className="w-[100px]">Titre</TableHead>
              <TableHead>Contenu</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {homes?.map((item: Tonokira) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item?.title}</TableCell>
                <TableCell>
                  <div dangerouslySetInnerHTML={{ __html: item?.content }} />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Pencil
                      className="cursor-pointer"
                      onClick={() => router.push("tonokira/create/" + item.id)}
                    />
                    <Trash2
                      className="cursor-pointer"
                      onClick={() => handleDelete(item.id)}
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

export default HomeDashPage;
