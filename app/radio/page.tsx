"use client";
import DailyProgram from "./components/daily-program";
import History from "./components/history";
import Responsable from "./components/responsable";
import "./radio.scss";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Radio = () => {
  return (
    <div className="container min-h-[85vh]">
      <Tabs defaultValue="daily-program" className="w-full mt-5">
        <TabsList>
          <TabsTrigger value="daily-program">Programme du jour</TabsTrigger>
          <TabsTrigger value="responsable">Responsable</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
        </TabsList>
        <TabsContent value="daily-program">
          <DailyProgram />
        </TabsContent>
        <TabsContent value="responsable">
          <Responsable />
        </TabsContent>
        <TabsContent value="history">
          <History />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Radio;
