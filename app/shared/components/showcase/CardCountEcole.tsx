import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import CountUp from "react-countup";

interface PropsType {
  title: string;
  count: number;
  cepe: number;
  bepc: number;
  bacc: number;
}

const CardCountEcole = ({ title, count, cepe, bepc, bacc }: PropsType) => {
  return (
    <div className="px-2 mx-auto">
      <Card className="card-count">
        <CardContent className="count-content">
          <p>{title}</p>
          <h3>
            <CountUp
              className="account-balance"
              start={0}
              end={count}
              duration={5}
              useEasing={true}
              separator=" "
            />
          </h3>
          <div className="flex gap-1 h-[11px] text-[12px] mt-[-12px]">
            <p>
              <b className="text-[10px]">CEPE : </b>
              <span style={{ color: cepe > 40 ? "black" : "red" }}>
                {cepe ? cepe : "--"} %
              </span>
            </p>
            <p>
              <b className="text-[10px]">BEPC : </b>
              <span style={{ color: cepe > 40 ? "black" : "red" }}>
                {bepc ? bepc : "--"} %
              </span>
            </p>
            <p>
              <b className="text-[10px]">BACC : </b>
              <span style={{ color: cepe > 40 ? "black" : "red" }}>
                {bacc ? bacc : "--"} %
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardCountEcole;
