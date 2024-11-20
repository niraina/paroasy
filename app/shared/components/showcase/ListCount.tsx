import { useEffect, useState } from "react";
import CardCount from "./CardCount";
import { EleveCathesiste } from "@/app/dashboard/(management)/eleve-cathesiste/core/models/eleve-cathesiste.model";
import { getAllEleveCathesiste } from "@/app/dashboard/(management)/eleve-cathesiste/core/requests/_get_request";
import Loading from "../Loading";
import { Etablisement } from "@/app/dashboard/(management)/etablisement/core/models/etablisement.model";
import { getAllEtablisement } from "@/app/dashboard/(management)/etablisement/core/requests/_get_request";
import CardCountEcole from "./CardCountEcole";

const ListCount = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [eleve, setEleve] = useState<EleveCathesiste[]>([]);
  const [etablisement, setEtablisement] = useState<Etablisement[]>([]);
  const fetchEleve = async () => {
    try {
      setIsLoading(true);
      const response = await getAllEleveCathesiste({ itemsPerPage: 10000 });
      setEleve(response?.data?.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const fetchEtablisement = async () => {
    try {
      setIsLoading(true);
      const response = await getAllEtablisement({ itemsPerPage: 10000 });
      setEtablisement(response?.data?.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchEleve();
    fetchEtablisement();
  }, []);
  return (
    <div className="row mt-5 mb-5">
    {eleve ? 
      <div className="col-3 mb-2">
        <CardCount title="Ecole cathesiste" count={eleve?.length} />
      </div>
    : ""}
      {etablisement?.map((item: Etablisement) => (
        <div className="col-3 mb-2" key={item.id}>
          <CardCountEcole
            title={item.name}
            count={item.nbEleve}
            cepe={item.resultCepe}
            bepc={item.resultBepc}
            bacc={item.resultBacc}
          />
        </div>
      ))}
      <Loading loading={isLoading} />
    </div>
  );
};

export default ListCount;
