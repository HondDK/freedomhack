'use client';

import { useState } from 'react';
import { useLanguage } from '@/core/providers/I18nextProvider/LanguageContext/LanguageContext';
import { TGetJobsReqDto } from '@/entities/job/api';
import { useGetSkills } from '@/entities/skill/hooks';
import { useScopedI18n } from '@/shared/config';
import { FilterCheckboxGroup } from '@/shared/ui';

type TProps = {
  setFilters: (filters: TGetJobsReqDto) => void;
};

export function SkillFilters({ setFilters }: TProps) {
  const t = useScopedI18n('base.skill_filters');
  const { data } = useGetSkills();
  const { language } = useLanguage(); // Get the selected language
  const [selectedMainSkills, setSelectedMainSkills] = useState<number[]>([]);

  const updateFilters = ({ main }: { main: number[] }) => {
    setSelectedMainSkills(main);
    setFilters({
      skills: main,
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
      selectedMainItems={selectedMainSkills}
      setFilters={updateFilters}
      label={t('label')}
    />
  );
}
