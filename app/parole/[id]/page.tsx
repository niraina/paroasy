"use client";
import { getTonokira } from "@/app/dashboard/(siteweb)/tonokira/core/requests/_get_request";
import Loading from "@/app/shared/components/Loading";
import { toast } from "@/components/ui/use-toast";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const DetailParole = () => {
  const { id } = useParams();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [data, setData] = useState<any>({});
  const fetchHomeById = async (id: number) => {
    await getTonokira(id)
      .then((response) => {
        if (response?.status === 200) {
          setData(response?.data?.data);
          setIsloading(false);
        } else {
          toast({
            variant: "destructive",
            title: "Chargement échoué",
          });
        }
        setIsloading(false);
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: error?.response?.data?.error || "Chargement échoué",
        });
        setIsloading(false);
      });
  };

  useEffect(() => {
    id && fetchHomeById(+id);
  }, [id]);
  return (
    <>
      <Loading loading={isLoading} />
      <div className="container min-h-screen">
        <h1 className="text-[38px] text-center font-semibold my-5">
          {data?.title}
        </h1>
        <div
          className="mb-10 list-parole"
          dangerouslySetInnerHTML={{ __html: data?.content }}
        />
      </div>
    </>
  );
};

export default DetailParole;
