"use client";

import { useEffect } from "react";
import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import Loading from "../shared/components/Loading";
import Slider from "react-slick";
import Link from "next/link";
import { useResponseArticleData, useResponseDataArticle } from "../dashboard/siteweb/article/lib";
import { fetchArticle } from "../dashboard/siteweb/article/core/actions";
import { InterfaceHome } from "../dashboard/siteweb/home/core/models/home.model";

const Actuality = () => {
  const articles = useResponseDataArticle();
  const { request, isLoading } = useResponseArticleData();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticle({ ...request, page: 1, itemsPerPage: 6 }));
  }, [dispatch, request]);

  var settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    autoplaySpeed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    fade: false,
  };

  return (
    <>
      <h2 className="text-[28px] text-center py-5">Nos actualités</h2>
      {articles && (
        <Slider {...settings}>
          {articles?.map((item: InterfaceHome) => (
            <div className="mx-auto w-full mb-5 px-3" key={item?.id}>
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
                className="underline italic text-center text-[14px] block"
              >
                Plus...
              </Link>
            </div>
          ))}
        </Slider>
      )}
      <Link
        href="/actuality"
        className="italic underline text-center block my-5 mb-5"
      >
        Voir toutes les actualités
      </Link>
      <Loading loading={isLoading} />
    </>
  );
};

export default Actuality;
