'use client';

import { useRouter } from 'next/navigation';
import { Skeleton } from '@/shared/ui/skeleton';
import { useGetCompany } from '@/entities/company/hooks/useGetCompany';
import { useEffect, useState } from 'react';
import { useEditCompany } from '@/entities/company/hooks/useEditCompany';
import { useDeleteCompany } from '@/entities/company/hooks/useDeleteCompany';
import { Card, CardFooter, CardHeader } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';

type TProps = {
  id: string;
};

export function CompanyPage({ id }: TProps) {
  const router = useRouter();
  const { data, isPending } = useGetCompany(Number(id));
  const { mutate: editCompany, isSuccess: successEdit } = useEditCompany();
  const { mutate: deleteCompany, isSuccess: successDelete } = useDeleteCompany();
  const [isEditing, setIsEditing] = useState(false);
  const [companyName, setCompanyName] = useState(data?.name || '');

  const handleEdit = () => {
    editCompany({
      id: Number(id),
      name: companyName
    });
  };

  useEffect(() => {
    if (successEdit) {
      router.push('/companies');
    }
  }, [router, successEdit]);

  useEffect(() => {
    if (successDelete) {
      router.push('/companies');
    }
  }, [router, successDelete]);

  const handleDelete = () => {
    deleteCompany({ id: Number(id) });
  };

  if (isPending) {
    return <Skeleton className="h-full w-full" />;
  }

  if (!data) {
    return <p className="text-center mt-4">No data available</p>;
  }

  return (
    <div className="mt-6 flex flex-col items-center px-4">
      <Button onClick={() => router.back()} variant="outline" className="mb-4">
        Назад
      </Button>
      <Card className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <CardHeader className="text-center">
          {data.logo ? (
            <img src={data.logo} alt={`${data.name} logo`} className="w-20 h-20 md:w-24 md:h-24 mb-4 object-contain mx-auto" />
          ) : (
            <div className="w-20 h-20 md:w-24 md:h-24 mb-4 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-500 text-sm md:text-lg">No Logo</span>
            </div>
          )}
          {isEditing ? (
            <Input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full mb-4"
              placeholder="Enter company name"
            />
          ) : (
            <h2 className="text-xl font-semibold mb-2">{data.name}</h2>
          )}
        </CardHeader>
        <CardFooter className="flex flex-col md:flex-row justify-between gap-4 mt-4">
          {isEditing ? (
            <Button onClick={handleEdit} className="bg-green-500 text-white hover:bg-green-600 w-full">
              Сохранить
            </Button>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white hover:bg-blue-600 w-full">
              Редактировать
            </Button>
          )}
          <Button variant="outline" onClick={handleDelete} className="w-full">
            Удалить
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
