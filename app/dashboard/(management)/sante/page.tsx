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
import { useResponseDataSante, useResponseSanteData } from "./lib";
import { fetchSante } from "./core/actions";
import { deleteSante } from "./core/requests/_del_request";
import { Sante } from "./core/models/sante.model";

const EleveCathesistePage = () => {
  const datas = useResponseDataSante();
  const { request, isLoading, response } = useResponseSanteData();
  const dispatch: AppDispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(
    response.currentPage || 1
  );
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchSante({ ...request, page: currentPage }));
  }, [dispatch, request, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (e: any) => {
    dispatch(fetchSante({ ...request, page: 1, nomMaladie: e?.target?.value }));
  };

  const handleDelete = async (id: number) => {
    await deleteSante(+id)
      .then((response) => {
        if (response?.status === 200) {
          toast({ title: "Suppression réussi" });
          dispatch(fetchSante({ ...request, page: currentPage }));
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
      <h1 className="mt-2 text-[18px] uppercase">Centre de santé</h1>
      <div className="px-2 py-2">
        <div className="flex gap-3">
          <Button
            className="btn-theme my-5"
            onClick={() => router.push("sante/create")}
          >
            Ajouter
          </Button>
          <Button
            className="btn-theme my-5"
            onClick={() => router.push("sante/responsable")}
          >
            Ajouter responsable
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
              <TableHead>Nom de la maladie</TableHead>
              <TableHead>Nom du patient </TableHead>
              <TableHead>Région</TableHead>
              <TableHead>District</TableHead>
              <TableHead>Date de visite</TableHead>
              <TableHead>Congregation</TableHead>
              <TableHead>Responsable</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {datas?.map((item: Sante) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  {item?.nomMaladie}
                </TableCell>
                <TableCell className="font-medium">{item?.personne}</TableCell>
                <TableCell className="font-medium capitalize">
                  {item?.region}
                </TableCell>
                <TableCell className="font-medium capitalize">
                  {item?.district}
                </TableCell>
                <TableCell className="font-medium capitalize">
                  {moment(item?.creationDate).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell className="font-medium capitalize">
                  {item?.congregation}
                </TableCell>
                <TableCell className="font-medium capitalize">
                  {item?.responsable?.fullName
                    ? item?.responsable?.fullName
                    : "--"}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Eye
                      className="cursor-pointer"
                      onClick={() => router.push(`sante/${item.id}`)}
                    />
                    <Pencil
                      className="cursor-pointer"
                      onClick={() => router.push(`sante/create/${item.id}`)}
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

export default EleveCathesistePage;
