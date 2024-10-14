"use client";
import { useEffect, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {
  useResponseDataTonokiraDaily,
  useResponseTonokiraDailyData,
} from "./lib";
import { fetchTonokiraDaily } from "./core/actions";
import { deleteTonokiraDaily } from "./core/requests/_del_request";
import { Daily } from "./core/models/home.model";
import moment from "moment";

const HomeDashPage = () => {
  const homes = useResponseDataTonokiraDaily();
  const { request, isLoading, response } = useResponseTonokiraDailyData();
  const dispatch: AppDispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(
    response.currentPage || 1
  );
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchTonokiraDaily({ ...request, page: currentPage }));
  }, [dispatch, request, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (e: any) => {
    dispatch(
      fetchTonokiraDaily({ ...request, page: 1, title: e?.target?.value })
    );
  };

  const handleDelete = async (id: number) => {
    await deleteTonokiraDaily(+id)
      .then((response) => {
        if (response?.status === 200) {
          toast({ title: "Suppression réussi" });
          dispatch(fetchTonokiraDaily({ ...request, page: currentPage }));
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
          onClick={() => router.push("daily/create")}
        >
          Ajouter
        </Button>
        <Input
          onChange={(e) => handleSearch(e)}
          className="my-5 w-[200px] rounded-[5px] hidden"
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
            {homes?.map((item: Daily) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item?.reference}</TableCell>
                <TableCell>
                  <div dangerouslySetInnerHTML={{ __html: item?.content }} />
                </TableCell>
                <TableCell className="font-medium">
                  {item.creationDate &&
                    moment(item.creationDate).format("DD/MM/YYYY HH:mm:ss")}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Pencil
                      className="cursor-pointer"
                      onClick={() => router.push("daily/create/" + item.id)}
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
