import { fetchPersonel } from "@/app/dashboard/siteweb/radio/personel/core/actions";
import { Personel } from "@/app/dashboard/siteweb/radio/personel/core/models/personel.model";
import { useResponseDataPersonel, useResponsePersonelData } from "@/app/dashboard/siteweb/radio/personel/lib";
import Loading from "@/app/shared/components/Loading";
import { AppDispatch } from "@/app/store/store";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Responsable = () => {
  const data = useResponseDataPersonel();
  const { request, isLoading } = useResponsePersonelData();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPersonel({ ...request, page: 1 }));
  }, [dispatch, request]);
  return (
    <>
      <div className="flex flex-wrap">
        {data &&
          data?.map((item: Personel) => (
            <div className="w-full md:w-1/3 px-3" key={item.id}>
              <div className="rounded-[5px] border border-[#c3c3c3] p-3">
                <div className="w-full h-[200px] overflow-hidden">
                  <Image
                    src={item.thumbnail}
                    width={200}
                    height={200}
                    className="w-full h-full rounded-[5px] object-cover"
                    alt={item.fullName}
                  />
                </div>
                <strong className="text-[18px] py-2">{item.fullName}</strong>
                <p className="">
                  <strong>Poste : </strong>
                  {item.poste}
                </p>
                <p className="">
                  <strong>Téléphone : </strong>
                  {item.tel}
                </p>
              </div>
            </div>
          ))}
      </div>
      <Loading loading={isLoading} />
    </>
  );
};

export default Responsable;
