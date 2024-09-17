"use client";
import { useEffect } from "react";
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
import { Pencil } from "lucide-react";
import { useResponseDataRadio, useResponseRadioData } from "./lib";
import { fetchRadio } from "./core/actions";

const Radio = () => {
  const data = useResponseDataRadio();
  const { request, isLoading } = useResponseRadioData();
  const dispatch: AppDispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    dispatch(fetchRadio({ ...request, page: 1 }));
  }, [dispatch, request]);

  return (
    <DashboardLayout>
      <div className="px-2 py-2">
        <h2 className="py-5 text-2xl font-semibold">Radio</h2>
        {data.length + 1 > 1 ? (
          ""
        ) : (
          <Button
            className="btn-theme my-5"
            onClick={() => router.push("history/create")}
          >
            Ajouter
          </Button>
        )}
        <Table className="border-[1px]">
          <TableHeader>
            <TableRow>
              <TableHead>Contenu</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div dangerouslySetInnerHTML={{ __html: item?.content }} />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Pencil
                      className="cursor-pointer"
                      onClick={() => router.push("history/create/" + item.id)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Loading loading={isLoading} />
    </DashboardLayout>
  );
};

export default Radio;
