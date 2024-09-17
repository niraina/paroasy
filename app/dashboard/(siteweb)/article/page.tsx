"use client";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../page";
import { useResponseArticleData, useResponseDataArticle } from "./lib";
import { AppDispatch } from "@/app/store/store";
import { useDispatch } from "react-redux";
import { fetchArticle } from "./core/actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Article } from "./core/models/article.model";
import { PaginationPage } from "@/app/shared/components/Pagination";
import Loading from "@/app/shared/components/Loading";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { deleteArticle } from "./core/requests/_del_request";
import { toast } from "@/components/ui/use-toast";

const ArticlePage = () => {
  const router = useRouter();
  const articles = useResponseDataArticle();
  const { request, isLoading, response } = useResponseArticleData();
  const dispatch: AppDispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(
    response.currentPage || 1
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchArticle({ ...request, page: currentPage }));
  }, [dispatch, request, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id: number) => {
    await deleteArticle(+id)
      .then((response) => {
        if (response?.status === 200) {
          toast({ title: "Suppression réussi" });
          dispatch(fetchArticle({ ...request, page: currentPage }));
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
        <h2 className="text-2xl font-semibold py-5">Actualitées</h2>
        <Button
          className="btn-theme my-5"
          onClick={() => router.push("article/create")}
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
            {articles?.map((item: Article) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item?.title}</TableCell>
                <TableCell>
                  <div dangerouslySetInnerHTML={{ __html: item?.content }} />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Pencil
                      className="cursor-pointer"
                      onClick={() => router.push("article/create/" + item.id)}
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

export default ArticlePage;
