'use client'
import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../page'
import { useResponseDataDiocese, useResponseDioceseData } from './lib';
import { AppDispatch } from '@/app/store/store';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { fetchDiocese } from './core/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DioceseInterface } from './core/models/diocese.model';
import { Pencil, Trash2 } from 'lucide-react';
import { PaginationPage } from '@/app/shared/components/Pagination';
import Loading from '@/app/shared/components/Loading';

const Diocese = () => {
  const dioceses = useResponseDataDiocese();
  const { request, isLoading, response } = useResponseDioceseData();
  const dispatch: AppDispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState<number>(response.currentPage || 1)
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchDiocese({...request, page: currentPage}))
  }, [dispatch, request, currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (e: any) => {
    dispatch(fetchDiocese({...request, page: 1, name: e?.target?.value}))
  }
  return (
    <DashboardLayout>
      <div className="px-2 py-2">
        <Button className='btn-theme my-5' onClick={() => router.push('diocese/create')}>Ajouter</Button>
        <Input onChange={(e) => handleSearch(e)} className='my-5 w-[200px] rounded-[5px]' placeholder='Rechercher...' type='search'/>
        <Table className='border-[1px]'>
          <TableHeader>
            <TableRow>
              <TableHead colSpan={2}>Titre</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dioceses?.map((item: DioceseInterface) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium" colSpan={2}>{item?.name}</TableCell>
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

export default Diocese