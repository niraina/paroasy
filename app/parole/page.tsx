"use client";
import { useEffect, useState } from "react";
import { AppDispatch } from "@/app/store/store";
import { useDispatch } from "react-redux";
import { PaginationPage } from "@/app/shared/components/Pagination";
import Loading from "@/app/shared/components/Loading";
import {
  useResponseDataTonokira,
  useResponseTonokiraData,
} from "../dashboard/(siteweb)/tonokira/lib";
import { fetchTonokira } from "../dashboard/(siteweb)/tonokira/core/actions";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Link2 } from "lucide-react";
const Parole = () => {
  const homes = useResponseDataTonokira();
  const { request, isLoading, response } = useResponseTonokiraData();
  const dispatch: AppDispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(
    response.currentPage || 1
  );

  useEffect(() => {
    dispatch(fetchTonokira({ ...request, page: currentPage }));
  }, [dispatch, request, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (e: any) => {
    dispatch(fetchTonokira({ ...request, page: 1, title: e?.target?.value }));
  };

  console.log(homes);

  return (
    <>
      <Loading loading={isLoading} />
      <div className="container min-h-screen">
        <h1 className="text-[38px] text-center font-semibold my-5">Paroles</h1>
        <div className="flex justify-end">
          <Input
            onChange={(e) => handleSearch(e)}
            className="my-5 w-[200px] rounded-[5px]"
            placeholder="Rechercher..."
            type="search"
          />
        </div>
        <ul className="mb-10">
          {homes ? (
            homes.map((item: any) => (
              <li key={item.id}>
                <Link
                  href={`/parole/${item.id}`}
                  className="flex gap-1 py-2 dark:hover:text-[#ffe009] hover:text-[#22364f] duration-300 ease-in-out"
                >
                  <Link2 />
                  {item.title}
                </Link>
              </li>
            ))
          ) : (
            <p className="py-10 text-center text-2xl">Aucun parole...</p>
          )}
        </ul>
        {homes.length > 100 && (
          <PaginationPage
            currentPage={currentPage}
            totalPages={response?.totalPages || 1}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </>
  );
};

export default Parole;
