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
import { useResponseDataLibrairy, useResponseLibrairyData } from "./lib";
import { fetchLibrairy } from "./core/actions";
import { deleteLibrairy } from "./core/requests/_del_request";
import { Librairy } from "./core/models/librairy.model";

const HomonoriePage = () => {
  const datas = useResponseDataLibrairy();
  const { request, isLoading, response } = useResponseLibrairyData();
  const dispatch: AppDispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(
    response.currentPage || 1
  );
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchLibrairy({ ...request, page: currentPage }));
  }, [dispatch, request, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (e: any) => {
    dispatch(fetchLibrairy({ ...request, page: 1, name: e?.target?.value }));
  };

  const handleDelete = async (id: number) => {
    await deleteLibrairy(+id)
      .then((response) => {
        if (response?.status === 200) {
          toast({ title: "Suppression réussi" });
          dispatch(fetchLibrairy({ ...request, page: currentPage }));
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
      <h1 className="mt-2 text-[18px] uppercase">Librairie</h1>
      <div className="px-2 py-2">
        <div className="flex gap-3">
          <Button
            className="btn-theme my-5"
            onClick={() => router.push("librairy/create")}
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
              <TableHead>Nom</TableHead>
              <TableHead>Responsable</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {datas?.map((item: Librairy) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item?.name}</TableCell>
                <TableCell className="font-medium capitalize">
                  {item?.responsable ? item?.responsable[0]?.fullName : ""}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Eye
                      className="cursor-pointer"
                      onClick={() => router.push(`librairy/${item.id}`)}
                    />
                    <Pencil
                      className="cursor-pointer"
                      onClick={() => router.push(`librairy/create/${item.id}`)}
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
