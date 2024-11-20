import { AppDispatch } from "@/app/store/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./history.scss";
import { useResponseDataRadio, useResponseRadioData } from "@/app/dashboard/siteweb/radio/history/lib";
import { fetchRadio } from "@/app/dashboard/siteweb/radio/history/core/actions";
import { Radio } from "@/app/dashboard/siteweb/radio/history/core/models/home.model";

const History = () => {
  const data = useResponseDataRadio();
  const { request, isLoading } = useResponseRadioData();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRadio({ ...request, page: 1 }));
  }, [dispatch, request]);
  return (
    <div>
      {data &&
        data?.map((item: Radio) => (
          <div
            key={item.id}
            dangerouslySetInnerHTML={{ __html: item.content }}
            className="mb-2 px-3 mt-5 history"
          />
        ))}
    </div>
  );
};

export default History;
