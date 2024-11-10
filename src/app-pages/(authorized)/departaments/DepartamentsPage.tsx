'use client';

import { CreateDepartament } from '@/features/departaments/ui';
import { useGetDepartaments } from '@/entities/departament/hooks/useGetDepartaments';
import { DepartamentCard } from '@/entities/departament/ui';
import { useScopedI18n } from '@/shared/config';

export function DepartamentsPage() {
  const t = useScopedI18n('base.departaments_page');
  const { data, isPending } = useGetDepartaments();

  return (
    <div className="w-full px-4 mt-3 flex flex-col items-center">
      <div className="flex w-full flex-col lg:flex-row justify-between">
        <h1 className="text-3xl font-extrabold tracking-tight lg:text-5xl text-center">
          {t('title')} ({Array.isArray(data) ? data.length : 0})
        </h1>
        <CreateDepartament />
      </div>
      {isPending && <p className="text-center mt-4">{t('loading')}</p>}
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((departament) => <DepartamentCard key={departament.id} data={departament} />)
        ) : (
          !isPending && <p className="text-center mt-4">{t('no_departaments')}</p>
        )}
      </div>
    </div>
  );
}
