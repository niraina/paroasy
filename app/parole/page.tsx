"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ParoleComponents from "./components/parole";
import DailyComponent from "./components/daily";
const Parole = () => {
  return (
    <div className="container min-h-[85vh]">
      <Tabs defaultValue="parole" className="w-full mt-5">
        <TabsList>
          <TabsTrigger value="parole">Paroles</TabsTrigger>
          <TabsTrigger value="daily">Programme journalier</TabsTrigger>
        </TabsList>
        <TabsContent value="parole">
          <ParoleComponents />
        </TabsContent>
        <TabsContent value="daily">
          <DailyComponent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Parole;
