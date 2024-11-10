'use client';

import { useState } from 'react';
import { useLanguage } from '@/core/providers/I18nextProvider/LanguageContext/LanguageContext';
import { TGetJobsReqDto } from '@/entities/job/api';
import { useGetCountry } from '@/entities/location/hooks';
import { useScopedI18n } from '@/shared/config';
import { FilterCheckboxGroup } from '@/shared/ui';

type TProps = {
  setFilters: (filters: TGetJobsReqDto) => void;
};

export function CountryFilters({ setFilters }: TProps) {
  const t = useScopedI18n('base.country_filters');
  const { data } = useGetCountry();
  const { language } = useLanguage();
  const [selectedMainCountry, setSelectedMainCountry] = useState<number[]>([]);

  const updateFilters = ({ main }: { main: number[] }) => {
    setSelectedMainCountry(main);
    setFilters({
      country: main,
    });
  };

  return (
    <FilterCheckboxGroup
      data={
        data?.map((item) => ({
          id: item.id,
          name: item[`name_${language}` as keyof typeof item] as string,
        })) || []
      }
      selectedMainItems={selectedMainCountry}
      setFilters={updateFilters}
      label={t('label')}
    />
  );
}
