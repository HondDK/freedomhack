'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDeleteDepartament } from '@/entities/departament/hooks/useDeleteDepartament';
import { useEditDepartament } from '@/entities/departament/hooks/useEditDepartament';
import { useGetDepartament } from '@/entities/departament/hooks/useGetDepartament';
import { Button } from '@/shared/ui/button';
import { CardFooter, CardHeader, Card } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Skeleton } from '@/shared/ui/skeleton';

type TProps = {
  id: string;
};

export function DepartamentPage({ id }: TProps) {
  const router = useRouter();
  const { data, isPending } = useGetDepartament(Number(id));
  const { mutate: editCompany, isSuccess: successEdit } = useEditDepartament();
  const { mutate: deleteCompany, isSuccess: successDelete } = useDeleteDepartament();
  const [isEditing, setIsEditing] = useState(false);
  const [departamentName, setDepartamentName] = useState(data?.name || '');

  const handleEdit = () => {
    editCompany({
      id: Number(id),
      name: departamentName,
      company: data?.company || 0
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
            <img className="w-20 h-20 md:w-24 md:h-24 mb-4 object-contain mx-auto" alt={`${data.name} logo`} src={data.logo} />
          ) : (
            <div className="w-20 h-20 md:w-24 md:h-24 mb-4 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-500 text-sm md:text-lg">No Logo</span>
            </div>
          )}
          {isEditing ? (
            <Input
              onChange={(e) => setDepartamentName(e.target.value)}
              placeholder="Enter company name"
              value={departamentName}
              className="w-full mb-4"
            />
          ) : (
            <h2 className="text-xl font-semibold mb-2">{data.name}</h2>
          )}
        </CardHeader>
        <CardFooter className="flex flex-col md:flex-row justify-between gap-4 mt-4">
          {isEditing ? (
            <Button className="bg-green-500 text-white hover:bg-green-600 w-full" onClick={handleEdit}>
              Сохранить
            </Button>
          ) : (
            <Button className="bg-blue-500 text-white hover:bg-blue-600 w-full" onClick={() => setIsEditing(true)}>
              Редактировать
            </Button>
          )}
          <Button onClick={handleDelete} className="w-full" variant="outline">
            Удалить
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
