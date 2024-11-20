"use client";

import { getArticle } from "@/app/dashboard/siteweb/article/core/requests/_get_request";
import Loading from "@/app/shared/components/Loading";
import { toast } from "@/components/ui/use-toast";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ActualityDetail = () => {
  const { id } = useParams();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [data, setData] = useState<any>({});
  const fetchHomeById = async (id: number) => {
    await getArticle(id)
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
      <div className="container">
        <div className="py-5">
          <div className="mx-auto max-w-[650px] mb-6">
            <div className="">
              <img
                src={data?.tumbnail}
                alt={data?.title}
                className="w-full h-auto rounded-[10px]"
              />
            </div>
            <div className="">
              <h3 className="italic text-center py-2 text-[24px]">
                {data?.title}
              </h3>
            </div>
            <div dangerouslySetInnerHTML={{ __html: data?.content }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ActualityDetail;
