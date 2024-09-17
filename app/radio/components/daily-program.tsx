"use client";

import { fetchDailyProgram } from "@/app/dashboard/(siteweb)/radio/daily-program/core/actions";
import {
  useResponseDailyProgramData,
  useResponseDataDailyProgram,
} from "@/app/dashboard/(siteweb)/radio/daily-program/lib";
import Loading from "@/app/shared/components/Loading";
import { AppDispatch } from "@/app/store/store";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const DailyProgram = () => {
  const data = useResponseDataDailyProgram();
  const { request, isLoading } = useResponseDailyProgramData();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDailyProgram({ ...request, page: 1 }));
  }, [dispatch, request]);
  return (
    <>
      <div className="flex flex-wrap">
        {data &&
          data.map((item: any) => (
            <div key={item.id} className="w-full md:w-1/2 px-3">
              <div className="border rounded-[5px] p-3 mb-3 daily-program">
                <div
                  dangerouslySetInnerHTML={{ __html: item?.content }}
                  className=""
                />
                <small>
                  {item.creationDate &&
                    moment(item.creationDate).format("DD/MM/YYYY HH:mm")}
                </small>
              </div>
            </div>
          ))}
      </div>
      <Loading loading={isLoading} />
    </>
  );
};

export default DailyProgram;
