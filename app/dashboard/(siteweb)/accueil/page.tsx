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
import Loading from "@/app/shared/components/Loading";
import { useResponseDataHome, useResponseHomeData } from "../home/lib";
import { fetchHome } from "../home/core/actions";
import { Home } from "../home/core/models/home.model";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { deleteCover } from "../home/core/requests/_del_request";
import { toast } from "@/components/ui/use-toast";
import { TYPE_PAGE } from "@/app/shared/constant/type-page";

const Accueil = () => {
  const homes = useResponseDataHome();
  const { request, isLoading, response } = useResponseHomeData();
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    dispatch(fetchHome({ ...request, page: 1, type: TYPE_PAGE.couverture }));
  }, [dispatch, request]);

  const handleDelete = async (id: number) => {
    await deleteCover(+id)
      .then((response) => {
        if (response?.status === 200) {
          toast({ title: "Suppression réussi" });
          dispatch(
            fetchHome({ ...request, page: 1, type: TYPE_PAGE.couverture })
          );
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
        <h2 className="py-5 text-2xl font-semibold">Couverture</h2>
        <Button
          className="btn-theme my-5"
          onClick={() => router.push("accueil/create")}
        >
          Ajouter
        </Button>
        <Table className="border-[1px]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Titre</TableHead>
              <TableHead>Contenu</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {homes?.map((item: Home) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item?.title}</TableCell>
                <TableCell>
                  <div dangerouslySetInnerHTML={{ __html: item?.content }} />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Pencil
                      className="cursor-pointer"
                      onClick={() => router.push("accueil/create/" + item.id)}
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
      </div>
      <Loading loading={isLoading || loading} />
    </DashboardLayout>
  );
};

export default Accueil;
