import React from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import CountUp from "react-countup";

interface PropsType {
    title: string;
    count: number;
}

const CardCount = ({title, count}: PropsType) => {
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
            </CardContent>
        </Card>
    </div>
  );
};

export default CardCount;
