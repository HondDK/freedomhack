'use client';

import { useState } from 'react';
import { useLanguage } from '@/core/providers/I18nextProvider/LanguageContext/LanguageContext';
import { TGetJobsReqDto } from '@/entities/job/api';
import { useGetWorkDirection } from '@/entities/work/direction/hooks';
import { useScopedI18n } from '@/shared/config';
import { FilterCheckboxGroup } from '@/shared/ui';

type TProps = {
  setFilters: (filters: TGetJobsReqDto) => void;
};

export function DirectionFilters({ setFilters }: TProps) {
  const t = useScopedI18n('base.direction_filters');
  const { data } = useGetWorkDirection();
  const { language } = useLanguage(); // Get the selected language
  const [selectedMainDirections, setSelectedMainDirections] = useState<number[]>([]);
  const [selectedSubDirections, setSelectedSubDirections] = useState<number[]>([]);

  const updateFilters = ({ main, sub }: { main: number[]; sub?: number[] }) => {
    setSelectedMainDirections(main);
    setSelectedSubDirections(sub ?? []);
    setFilters({
      work_direction: main,
      sub_work_direction: sub,
    });
  };

  return (
    <FilterCheckboxGroup
      data={
        data?.map((item) => ({
          id: item.id,
          name: item[`name_${language}` as keyof typeof item] as string, // Access name dynamically based on language
          sub_items: item.sub_work_directions?.map((sub) => ({
            id: sub.id,
            name: sub[`name_${language}` as keyof typeof sub] as string, // Access sub-direction name dynamically
          })),
        })) || []
      }
      selectedMainItems={selectedMainDirections}
      selectedSubItems={selectedSubDirections}
      setFilters={updateFilters}
      label={t('label')}
    />
  );
}
