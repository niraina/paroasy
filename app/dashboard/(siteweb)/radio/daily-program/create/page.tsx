"use client";
import DashboardLayout from "@/app/dashboard/page";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/app/shared/components/Loading";
import Wygywyg from "@/app/shared/components/Wygywyg";
import { postDailyProgram } from "../core/requests/_post_request";
import { Input } from "@/components/ui/input";

const CreateDailyProgram = () => {
  const router = useRouter();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const { toast } = useToast();
  const [content, setContent] = useState<any>();
  const now = new Date();
  const [date, setDate] = useState<any>();
  const handleChangeContent = (e: any) => {
    setContent(e.content);
  };

  const handleSend = async () => {
    if (!content) {
      toast({
        variant: "destructive",
        title: "Champ requis",
      });
      return;
    }
    setIsloading(true);
    await postDailyProgram({ content: content, creationDate: date || now })
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          setContent("");
          toast({ title: "Enregistrement réussi" });
          setIsloading(false);
          router.push("/dashboard/radio/daily-program");
        }
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: error?.response?.data?.error || "Enregistrement échoué",
        });
        setIsloading(false);
      });
  };
  return (
    <DashboardLayout>
      <form className="my-5">
        <div className="mb-2">
          <label htmlFor="content">Programme</label>
          <Wygywyg
            name="content"
            value={content}
            onChange={handleChangeContent}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="date">Date</label>
          <Input
            id="date"
            type="datetime-local"
            placeholder="Date"
            value={date}
            onChange={(e: any) => setDate(e?.target.value)}
          />
        </div>
        <Button type="button" className="btn-theme my-5" onClick={handleSend}>
          Enregistrer
        </Button>
      </form>
      <Loading loading={isLoading} />
    </DashboardLayout>
  );
};

export default CreateDailyProgram;
