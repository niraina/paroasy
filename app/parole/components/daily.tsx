import { fetchTonokiraDaily } from "@/app/dashboard/(siteweb)/daily/core/actions";
import { Daily } from "@/app/dashboard/(siteweb)/daily/core/models/home.model";
import {
  useResponseDataTonokiraDaily,
  useResponseTonokiraDailyData,
} from "@/app/dashboard/(siteweb)/daily/lib";
import Loading from "@/app/shared/components/Loading";
import { AppDispatch } from "@/app/store/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const DailyComponent = () => {
  const datas = useResponseDataTonokiraDaily();
  const { request, isLoading, response } = useResponseTonokiraDailyData();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTonokiraDaily({ ...request, page: 1 }));
  }, [dispatch, request]);

  return (
    <div className="">
      {datas?.map((item: Daily) => (
        <div
          key={item.id}
          className="border-[1px] border-[#c3c3c3] rounded-[10px] p-3 mb-6"
        >
          <p className="font-bold">{item?.reference}</p>
          <div
            className="daily"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        </div>
      ))}
      <Loading loading={isLoading} />
    </div>
  );
};

export default DailyComponent;
