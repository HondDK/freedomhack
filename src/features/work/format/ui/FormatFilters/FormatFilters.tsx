'use client';

import { useState } from 'react';
import { useLanguage } from '@/core/providers/I18nextProvider/LanguageContext/LanguageContext';
import { TGetJobsReqDto } from '@/entities/job/api';
import { useGetWorkFormat } from '@/entities/work/format/hooks';
import { FilterCheckboxGroup } from '@/shared/ui';

type TProps = {
  setFilters: (filters: TGetJobsReqDto) => void;
};

export function FormatFilters({ setFilters }: TProps) {
  const { data } = useGetWorkFormat();
  const { language } = useLanguage(); // Get the selected language
  const [selectedMainFormat, setSelectedMainFormat] = useState<number[]>([]);

  const updateFilters = ({ main }: { main: number[] }) => {
    setSelectedMainFormat(main);
    setFilters({
      work_format: main,
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
      selectedMainItems={selectedMainFormat}
      setFilters={updateFilters}
      label="Формат работы"
    />
  );
}
