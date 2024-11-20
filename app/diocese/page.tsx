"use client";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { useEffect } from "react";
import Loading from "../shared/components/Loading";
import { useResponseDataPageDiocese, useResponsePageDioceseData } from "../dashboard/siteweb/diocese-page/lib";
import { fetchPageDiocese } from "../dashboard/siteweb/diocese-page/core/actions";

const Diocese = () => {
  const homes = useResponseDataPageDiocese();
  const { request, isLoading } = useResponsePageDioceseData();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPageDiocese({ ...request, page: 1 }));
  }, [dispatch, request]);
  return (
    <div className="container">
      {!homes ? (
        <div className="py-5">
          <h1 className="text-[38px] text-center font-semibold mb-5">
            Le Diocèse aujourd'hui
          </h1>
          <p>
            Fort-Dauphin reste le Centre des Lazaristes et des Filles de la
            Charité : Maisons provinciales et Noviciats.
          </p>

          <p>
            En 2010 ils ont fêté les 350 ans de la mort de Saint Vincent et de
            Sainte Louise de Marillac : les reliques de ces saints ont circulé
            dans quelques diocèses de l'île pour cette occasion.
          </p>

          <p>
            En 2011 ils ont fêté le centenaire de leurs provinces. Avec sincère
            fierté ils peuvent contempler les fruits des durs labeurs de ces
            longues années de présence dans le Sud Malgache. A cette occasion
            l'évêque du lieu a dit :
          </p>
          <div className="flex justify-around">
            <i>« Fitohizana fa tsy fitovizana »</i>
            <i>« Continuité dans la diversité.»</i>
          </div>
          <p>
            Actuellement le diocèse, selon la dernière statistique, compte 109
            068 catholiques sur une population de 1 311 891, répartis sur 3
            paroisses de ville et 16 districts que vous verrez sur la carte :
          </p>
          <ul className="list-disc ps-10">
            <li>
              <strong>Androy</strong> d'Ambovombe, districts d'Ambovombe
              banlieue, Tsihombe, Beloha, Tranoroa, Bekily, Bekitro, Antanimora
              et Beraketa.
            </li>
            <li>
              <strong>Anosy</strong>: de la Cathédrale, Tanambao, districts de
              Mahialambo, Soanierana, Manambaro, Ranopiso, Ranomafana,
              Amboasary, Tsivory et Manantenina.
            </li>
          </ul>
          <p>
            La chapelle de la léproserie d'Ampasy accueille tout le quartier:
            875 catholiques dont 400 élèves en primaire. De même que la chapelle
            de Marillac (Maison provinciale) accueille plus de 900 catholiques.
            Il est urgent d'y ouvrir une vraie paroisse, vu l'extension de la
            ville à cause de l'exploitation minière.
          </p>
          <p>
            En 2005 le diocèse a fêté son cinquantenaire, et depuis l'effort a
            été mis sur la responsabilisation des laïcs. En vue de cela un
            directoire pastoral les aide à réfléchir sur leur rôle. Le fruit est
            vraiment palpable surtout en ville. Bien sûr le diocèse passe, comme
            d'autres peut-être, un moment très critique financièrement avec la
            diminution, voire la suppression des aides extérieures, mais on est
            confiant de la prise de responsabilité des laïcs. Et surtout :
          </p>
          <i className="text-center my-2 block">
            « Miara-dàlana amintsika ny Tompo »
          </i>
          <i className="text-center my-2 block">
            « Le Seigneur fait route avec nous. »
          </i>
        </div>
      ) : (
        homes.map((item: any) => (
          <div
            key={item.id}
            dangerouslySetInnerHTML={{ __html: item?.content }}
            className="diocese"
          />
        ))
      )}
      <Loading loading={isLoading} />
    </div>
  );
};

export default Diocese;
