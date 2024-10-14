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
import { useResponseDataFormation, useResponseFormationData } from "./lib";
import { fetchFormation } from "./core/actions";
import { deleteFormation } from "./core/requests/_del_request";
import { Formation } from "./core/models/formation.model";

const HomonoriePage = () => {
  const datas = useResponseDataFormation();
  const { request, isLoading, response } = useResponseFormationData();
  const dispatch: AppDispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(
    response.currentPage || 1
  );
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchFormation({ ...request, page: currentPage }));
  }, [dispatch, request, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (e: any) => {
    dispatch(fetchFormation({ ...request, page: 1, label: e?.target?.value }));
  };

  const handleDelete = async (id: number) => {
    await deleteFormation(+id)
      .then((response) => {
        if (response?.status === 200) {
          toast({ title: "Suppression réussi" });
          dispatch(fetchFormation({ ...request, page: currentPage }));
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
      <h1 className="mt-2 text-[18px] uppercase">Formation</h1>
      <div className="px-2 py-2">
        <div className="flex gap-3">
          <Button
            className="btn-theme my-5"
            onClick={() => router.push("formation/create")}
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
              <TableHead>Formation</TableHead>
              <TableHead>Eleve</TableHead>
              <TableHead>Eglise</TableHead>
              <TableHead>District</TableHead>
              <TableHead>Région</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {datas?.map((item: Formation) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item?.label}</TableCell>
                <TableCell className="font-medium">
                  {item?.eleve?.firstName} {item?.eleve?.lastName}
                </TableCell>
                <TableCell className="font-medium">
                  {item?.eleve?.ecole?.eglise?.name}
                </TableCell>
                <TableCell className="font-medium">
                  {item?.eleve?.ecole?.eglise?.district}
                </TableCell>
                <TableCell className="font-medium">
                  {item?.eleve?.ecole?.eglise?.region}
                </TableCell>
                <TableCell className="font-medium">
                  {item?.eleve?.ecole?.eglise?.district}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Pencil
                      className="cursor-pointer"
                      onClick={() => router.push(`formation/create/${item.id}`)}
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
