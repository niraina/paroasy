"use client";
import React, { useEffect } from "react";
import { InterfaceHome } from "../dashboard/(siteweb)/home/core/models/home.model";
import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  useResponseArticleData,
  useResponseDataArticle,
} from "../dashboard/(siteweb)/article/lib";
import { fetchArticle } from "../dashboard/(siteweb)/article/core/actions";
import Link from "next/link";
import Loading from "../shared/components/Loading";

const Actuality = () => {
  const articles = useResponseDataArticle();
  const { request, isLoading } = useResponseArticleData();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticle({ ...request, page: 1, itemsPerPage: 200 }));
  }, [dispatch, request]);

  return (
    <>
      <Loading loading={isLoading} />
      <div className="container">
        <div className="py-5">
          <h1 className="text-[38px] text-center font-semibold mb-5">
            Actualitées
          </h1>
          {articles &&
            articles?.map((item: InterfaceHome) => (
              <div className="mx-auto max-w-[650px] mb-6" key={item?.id}>
                <div className="">
                  <img
                    src={item?.tumbnail}
                    alt={item?.title}
                    className="w-full h-auto rounded-[10px]"
                  />
                </div>
                <div className="">
                  <h3 className="italic text-center py-2 text-[24px]">
                    {item?.title}
                  </h3>
                </div>
                <Link
                  href={`/actuality/${item.id}`}
                  className="undeline italic text-center text-[14px] block"
                >
                  Plus...
                </Link>
              </div>
            ))}
          <div className="mx-auto hidden">
            <Button className="btn-theme my-5 mx-auto text-center px-5 py-3 uppercase font-bold">
              Voir plus
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Actuality;
