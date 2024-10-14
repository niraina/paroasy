"use client";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store";
import { useEffect } from "react";
import { fetchCarousel } from "./dashboard/(siteweb)/carousel/core/actions";
import {
  useLoadingHome,
  useResponseDataHome,
  useResponseHomeData,
} from "./dashboard/(siteweb)/home/lib";
import { fetchHome } from "./dashboard/(siteweb)/home/core/actions";
import { InterfaceHome } from "./dashboard/(siteweb)/home/core/models/home.model";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import Link from "next/link";
import {
  useResponseArticleData,
  useResponseDataArticle,
} from "./dashboard/(siteweb)/article/lib";
import Loading from "./shared/components/Loading";
import { fetchArticle } from "./dashboard/(siteweb)/article/core/actions";
import ListCount from "./shared/components/showcase/ListCount";
import Actuality from "./(home)/actuality";
import ResponsableHome from "./(home)/responsable";

export default function Home() {
  const articles = useResponseDataArticle();
  const { request, isLoading } = useResponseArticleData();
  const homes = useResponseDataHome();
  const data = useResponseHomeData();
  const loadingHome = useLoadingHome();
  var settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    autoplaySpeed: 6000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    fade: true,
  };

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCarousel());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchHome({ ...data.request, page: 1, itemsPerPage: 10, type: 1 })
    );
  }, [dispatch, data.request]);

  useEffect(() => {
    dispatch(fetchArticle({ ...request, page: 1, itemsPerPage: 3 }));
  }, [dispatch, request, 1]);

  return (
    <div className="overflow-hidden">
      <Loading loading={loadingHome || isLoading} />
      {homes.length > 0 ? (
        <Slider {...settings}>
          {homes
            ?.filter((res: InterfaceHome) => res.type !== "2")
            ?.map((item: InterfaceHome) => (
              <div
                className="hero relative"
                style={{ backgroundImage: `url(${item.tumbnail})` }}
                key={item.id}
              >
                <img
                  src={item.tumbnail}
                  className="absolute z-0 w-full h-full object-cover"
                />
                <div className="hero-content absolute left-0 right-0 mx-auto top-0 bottom-0 flex items-center justify-center">
                  <div className="px-[24px]">
                    <h1 className="hero-title text-white">{item.title}</h1>
                    <p
                      className="hero-subtitle text-white"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                  </div>
                </div>
              </div>
            ))}
        </Slider>
      ) : (
        <div
          className="hero"
          style={{ backgroundImage: `url("/img/bera-2.jpg")` }}
        >
          <div className="hero-content px-[24px]">
            <h1 className="hero-title font-bold">BIENVENUE SUR NOTRE SITE,</h1>
            <p className="hero-subtitle text-[12px]">
              <i>
                «Pour une Église synodale : communion, participation et mission»
              </i>{" "}
              : c'est le thème de la XVIe assemblée générale ordinaire du synode
              des évêques convoquée par le Pape François. Le Saint–Père nous a
              rappelé à plusieurs reprises que la synodalité est une des voies
              majeures dans la vie de l'église:
              <i>
                «Ce que le Seigneur nous demande, dans un certain sens, est déjà
                contenu entièrement dans le mot synode : Marcher ensemble –
                laïcs, pasteurs, évêque de Rome – un concept facile à exprimer
                en paroles, mais pas si facile à mettre en pratique.»
              </i>
            </p>
          </div>
        </div>
      )}
      <div className="container !mb-10">
        <ListCount />
          <h2 className="text-[28px] text-center py-5">Les Résponsables</h2>
          <div className="my-5 flex flex-wrap w-full">
            <ResponsableHome />
          </div>
        <Actuality />
      </div>
    </div>
  );
}
