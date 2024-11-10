'use client';

import { CreateCompany } from '@/features/companies/ui';
import { CompanyCard } from '@/entities/company';
import { useGetCompanies } from '@/entities/company/hooks/useGetCompanies';
import { useScopedI18n } from '@/shared/config';

export function CompaniesPage() {
  const t = useScopedI18n('base.companies_page');
  const { data, isPending } = useGetCompanies();

  return (
    <div className="w-full px-4 mt-3 flex flex-col items-center">
      <div className="flex w-full flex-col lg:flex-row justify-between">
        <h1 className="text-3xl font-extrabold tracking-tight text-center lg:text-5xl">
          {t('title')} ({Array.isArray(data) ? data.length : 0})
        </h1>
        <CreateCompany />
      </div>
      {isPending && <p className="text-center mt-4">{t('loading')}</p>}
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((company) => <CompanyCard key={company.id} data={company} />)
        ) : (
          !isPending && <p className="text-center mt-4">{t('no_companies')}</p>
        )}
      </div>
    </div>
  );
}
