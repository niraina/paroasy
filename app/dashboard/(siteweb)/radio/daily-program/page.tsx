"use client";
import { useEffect, useState } from "react";
import DashboardLayout from "../../../page";
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
import Loading from "@/app/shared/components/Loading";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import {
  useResponseDailyProgramData,
  useResponseDataDailyProgram,
} from "./lib";
import { fetchDailyProgram } from "./core/actions";
import { DailyProgram } from "./core/models/home.model";
import moment from "moment";
import { deleteDailyProgram } from "./core/requests/_del_request";
import { toast } from "@/components/ui/use-toast";
import { PaginationPage } from "@/app/shared/components/Pagination";

const RadioDaily = () => {
  const data = useResponseDataDailyProgram();
  const { request, isLoading, response } = useResponseDailyProgramData();
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(
    response.currentPage || 1
  );
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const router = useRouter();

  useEffect(() => {
    dispatch(fetchDailyProgram({ ...request, page: 1 }));
  }, [dispatch, request]);

  const handleDelete = async (id: number) => {
    await deleteDailyProgram(+id)
      .then((response) => {
        if (response?.status === 200) {
          toast({ title: "Suppression réussi" });
          dispatch(fetchDailyProgram({ ...request, page: currentPage }));
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
        <h2 className="py-5 text-2xl font-semibold">Programme radio</h2>

        <Button
          className="btn-theme my-5"
          onClick={() => router.push("daily-program/create")}
        >
          Ajouter
        </Button>
        <Table className="border-[1px]">
          <TableHeader>
            <TableRow>
              <TableHead>Programme</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item: DailyProgram) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div dangerouslySetInnerHTML={{ __html: item?.content }} />
                </TableCell>
                <TableCell>
                  {item?.creationDate &&
                    moment(item?.creationDate).format("DD/MM/YYYY HH:mm:ss")}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Pencil
                      className="cursor-pointer"
                      onClick={() =>
                        router.push("daily-program/create/" + item.id)
                      }
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

export default RadioDaily;
