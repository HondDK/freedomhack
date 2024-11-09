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
import { CompanySelect } from '@/entities/company/ui';

type TProps = {
  id: string;
};

export function DepartamentPage({ id }: TProps) {
  const router = useRouter();
  const { data, isPending } = useGetDepartament(Number(id));
  const { mutate: editDepartament, isSuccess: successEdit } = useEditDepartament();
  const { mutate: deleteDepartament, isSuccess: successDelete } = useDeleteDepartament();
  const [isEditing, setIsEditing] = useState(false);
  const [departamentName, setDepartamentName] = useState(data?.name || '');
  const [companyId, setCompanyId] = useState<number>(data?.company.id || 0);

  const handleEdit = () => {
    editDepartament({
      id: Number(id),
      name: departamentName,
      company: companyId
    });
  };

  useEffect(() => {
    if (successEdit || successDelete) {
      router.push('/departaments');
    }
  }, [router, successEdit, successDelete]);

  const handleDelete = () => {
    deleteDepartament({ id: Number(id) });
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
          {isEditing ? <>
            <Input
              onChange={(e) => setDepartamentName(e.target.value)}
              placeholder="Введите название департамента"
              value={departamentName}
              className="w-full mb-4"
            />
            <CompanySelect onChange={setCompanyId}/>
          </> : <>
            <h1 className='text-xl font-semibold mb-2'>{data.company.name}</h1>
            <h2 className='text-xl font-semibold mb-2'>{data.name}</h2>
          </>}
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
