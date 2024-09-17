'use client'
import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../page'
import { AppDispatch } from '@/app/store/store';
import { useDispatch } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PaginationPage } from '@/app/shared/components/Pagination';
import Loading from '@/app/shared/components/Loading';
import { useResponseDataHome, useResponseHomeData } from './lib';
import { fetchHome } from './core/actions';
import { Home } from './core/models/home.model';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'
import { Pencil, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

const HomeDashPage = () => {
  const homes = useResponseDataHome();
  const { request, isLoading, response } = useResponseHomeData();
  const dispatch: AppDispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState<number>(response.currentPage || 1)
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchHome({...request, page: currentPage}))
  }, [dispatch, request, currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (e: any) => {
    dispatch(fetchHome({...request, page: 1, title: e?.target?.value}))
  }

  return (
    <DashboardLayout>
      <div className="px-2 py-2">
        <Button className='btn-theme my-5' onClick={() => router.push('home/create')}>Ajouter</Button>
        <Input onChange={(e) => handleSearch(e)} className='my-5 w-[200px] rounded-[5px]' placeholder='Rechercher...' type='search'/>
        <Table className='border-[1px]'>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Titre</TableHead>
              <TableHead>Contenu</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {homes?.map((item: Home) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item?.title}</TableCell>
                <TableCell>{item?.content}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Pencil className="cursor-pointer"/>
                    <Trash2 className="cursor-pointer"/>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <PaginationPage currentPage={currentPage} totalPages={response?.totalPages || 1} onPageChange={handlePageChange}/>
      </div>
      <Loading loading={isLoading}/>
    </DashboardLayout>
  )
}

export default HomeDashPage