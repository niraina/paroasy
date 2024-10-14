"use client";
import { useDispatch } from "react-redux";
import {
  useResponseDataPreast,
  useResponsePreastData,
} from "../dashboard/(management)/preast/lib";
import { AppDispatch } from "../store/store";
import { useEffect } from "react";
import { fetchPreast } from "../dashboard/(management)/preast/core/actions";
import Loading from "../shared/components/Loading";
import { Preast } from "../dashboard/(management)/preast/core/models/preast.model";
import Image from "next/image";
import {
  useResponseDataSanteResponsable,
  useResponseSanteResponsableData,
} from "../dashboard/(management)/sante/lib";
import { fetchSanteResponsable } from "../dashboard/(management)/sante/core/actions";
import { Responsable } from "../dashboard/(management)/sante/core/models/responsable.model";
import {
  useResponseDataEcoleCathesiste,
  useResponseEcoleCathesisteData,
} from "../dashboard/(management)/ecole-cathesiste/lib";
import { fetchEcoleCathesiste } from "../dashboard/(management)/ecole-cathesiste/core/actions";
import CardResponsable from "./card-responsable";
import { EcoleCathesiste } from "../dashboard/(management)/ecole-cathesiste/core/models/ecole-cathesiste.model";
import {
  useResponseDataLibrairyResponsable,
  useResponseLibrairyResponsableData,
} from "../dashboard/(management)/librairy/lib";
import { fetchLibrairyResponsable } from "../dashboard/(management)/librairy/core/actions";
import { ResponsableLibrairy } from "../dashboard/(management)/librairy/core/models/responsable.model";

const ResponsableHome = () => {
  const datas = useResponseDataPreast();
  const { request, isLoading } = useResponsePreastData();
  const dispatch: AppDispatch = useDispatch();

  const santes = useResponseDataSanteResponsable();
  const santesReq = useResponseSanteResponsableData();

  const ecoleCat = useResponseDataEcoleCathesiste();
  const ecoleCatRq = useResponseEcoleCathesisteData();

  const libs = useResponseDataLibrairyResponsable();
  const libsReq = useResponseLibrairyResponsableData();

  useEffect(() => {
    dispatch(fetchPreast({ ...request, page: 1 }));
  }, [dispatch, request]);

  useEffect(() => {
    dispatch(fetchSanteResponsable({ ...santesReq.request, page: 1 }));
  }, [dispatch, santesReq.request]);

  useEffect(() => {
    dispatch(fetchEcoleCathesiste({ ...ecoleCatRq.request, page: 1 }));
  }, [dispatch, ecoleCatRq.request]);

  useEffect(() => {
    dispatch(fetchLibrairyResponsable({ ...libsReq.request, page: 1 }));
  }, [dispatch, libsReq.request]);
  return (
    <>
      {datas
        ?.filter((res: Preast) => (res.isResponsable === "yes" ? res : null))
        .map((item: Preast) => (
          <CardResponsable
            key={item.id}
            image={item.thumbnail}
            name={`${item.firstName} ${item.lastName}`}
            poste={item.status}
            lieu={`${item.eglise?.name} ${item.eglise?.region} ${item.eglise?.district}`}
          />
        ))}
      {santes.map((item: Responsable) => (
        <CardResponsable
          key={item.id}
          image={item.thumbnail}
          name={item.fullName}
          poste={item.poste}
          contact={item.tel as string}
        />
      ))}
      {ecoleCat.map((item: EcoleCathesiste) => (
        <CardResponsable
          key={item.id}
          image={item.preast.thumbnail}
          name={`${item.preast.firstName} ${item.preast.lastName}`}
          poste={item.preast.status}
          lieu={item.eglise?.name}
        />
      ))}
      {libs.map((item: ResponsableLibrairy) => (
        <CardResponsable
          key={item.id}
          image={item.thumbnail}
          name={`${item.fullName}`}
          poste={item.poste}
          contact={item.tel as string}
        />
      ))}
      <Loading loading={isLoading} />
    </>
  );
};

export default ResponsableHome;
