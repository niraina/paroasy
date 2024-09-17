'use client'
import DashboardLayout from '@/app/dashboard/page'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { postDiocese } from '../core/requests/_post_request'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import Loading from '@/app/shared/components/Loading'

const Create = () => {
    const router = useRouter()
    const [data, setData] = useState({
        name: ""
    })
    const [isLoading, setIsloading] = useState<boolean>(false)
    const { toast } = useToast();

    const onChange = (v: any) => {
        setData((prev: any) => ({...prev, ...v}))
    }

    const handleSend = async() => {
        if(!data.name) {
            toast({
                variant: "destructive",
                title: "Champ titre requis",
              });
              return;
        }
        setIsloading(true)
        await postDiocese({name: data?.name}).then((response) => {
            if(response?.status === 200 || response?.status === 201) {
                setData({
                    name: "",
                })
                toast({ title: "Enregistrement réussi" });
                router.push("/dashboard/diocese/");
                setIsloading(false);
            }
        }).catch((error) => {
            toast({
                variant: "destructive",
                title: error?.response?.data?.error || "Enregistrement échoué",
              });
            setIsloading(false);
        }).finally(() => setIsloading(false))
    }
  return (
    <DashboardLayout>
        <form className='my-5'>
            <div className='mb-2'>
                <label htmlFor="name">Nom</label>
                <Input id="name" type='text' placeholder='Titre' value={data.name} onChange={(e) => onChange({name: e?.target?.value})}/>
            </div>
            <Button type='button' className='btn-theme my-5' onClick={handleSend}>Enregistrer</Button>
        </form>
        <Loading loading={isLoading}/>
    </DashboardLayout>
  )
}

export default Create