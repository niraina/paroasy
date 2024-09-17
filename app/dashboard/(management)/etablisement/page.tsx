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
import {
  useResponseDataEtablisement,
  useResponseEtablisementData,
} from "./lib";
import { fetchEtablisement } from "./core/actions";
import { deleteEtablisement } from "./core/requests/_del_request";
import { Etablisement } from "./core/models/etablisement.model";
import { formatNumber } from "@/app/shared/usecase/stat";

const EtablisementPage = () => {
  const datas = useResponseDataEtablisement();
  const { request, isLoading, response } = useResponseEtablisementData();
  const dispatch: AppDispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(
    response.currentPage || 1
  );
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchEtablisement({ ...request, page: currentPage }));
  }, [dispatch, request, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (e: any) => {
    dispatch(
      fetchEtablisement({ ...request, page: 1, name: e?.target?.value })
    );
  };

  const handleDelete = async (id: number) => {
    await deleteEtablisement(+id)
      .then((response) => {
        if (response?.status === 200) {
          toast({ title: "Suppression réussi" });
          dispatch(fetchEtablisement({ ...request, page: currentPage }));
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
      <h1 className="mt-2 text-[18px] uppercase">Etablisement</h1>
      <div className="px-2 py-2">
        <Button
          className="btn-theme my-5"
          onClick={() => router.push("etablisement/create")}
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
              <TableHead>Responsable</TableHead>
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
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {datas?.map((item: Etablisement) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  {item?.responsable?.length
                    ? item?.responsable[0]?.fullName
                    : "--"}
                </TableCell>
                <TableCell className="font-medium">{item?.name}</TableCell>
                <TableCell className="font-medium capitalize">
                  {item?.region}
                </TableCell>
                <TableCell className="font-medium">{item?.district}</TableCell>
                <TableCell className="font-medium">{item?.nbEleve}</TableCell>
                <TableCell className="font-medium">{item?.nbCepe}</TableCell>
                <TableCell className="font-medium">
                  {item?.resultCepe}{" "}
                  <span className="text-red-800">
                    ({formatNumber((item?.resultCepe * 100) / item?.nbCepe)})
                  </span>
                </TableCell>
                <TableCell className="font-medium">{item?.nbBepc}</TableCell>
                <TableCell className="font-medium">
                  {item?.resultBepc}{" "}
                  <span className="text-red-800">
                    ({formatNumber((item?.resultBepc * 100) / item?.nbBepc)})
                  </span>
                </TableCell>
                <TableCell className="font-medium">{item?.nbBacc}</TableCell>
                <TableCell className="font-medium">
                  {item?.resultBacc}{" "}
                  <span className="text-red-800">
                    ({formatNumber((item?.resultBacc * 100) / item?.nbBacc)})
                  </span>
                </TableCell>
                <TableCell className="font-medium">
                  {item?.schoolYear}
                </TableCell>

                <TableCell>
                  <div className="flex gap-2">
                    <Eye
                      className="cursor-pointer"
                      onClick={() => router.push(`etablisement/${item.id}`)}
                    />
                    <Pencil
                      className="cursor-pointer"
                      onClick={() =>
                        router.push(`etablisement/create/${item.id}`)
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

export default EtablisementPage;
