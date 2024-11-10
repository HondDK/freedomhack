'use client';

import { useState } from 'react';
import { useLanguage } from '@/core/providers/I18nextProvider/LanguageContext/LanguageContext';
import { TGetJobsReqDto } from '@/entities/job/api';
import { TGetJobCandidatesReqDto } from '@/entities/job-candidate/api';
import { useGetWorkExperience } from '@/entities/work/experience/hooks';
import { useScopedI18n } from '@/shared/config';
import { FilterCheckboxGroup } from '@/shared/ui';

type TProps = {
  setFilters: (filters: TGetJobsReqDto | TGetJobCandidatesReqDto) => void;
  isResume?: boolean;
};

export function ExperienceFilters({ setFilters, isResume }: TProps) {
  const t = useScopedI18n('base.experience_filters');
  const { data } = useGetWorkExperience();
  const { language } = useLanguage(); // Get the selected language
  const [selectedMainExperience, setSelectedMainExperience] = useState<number[]>([]);

  const updateFilters = ({ main }: { main: number[] }) => {
    setSelectedMainExperience(main);

    if (isResume) {
      setFilters({
        work_experiences: main,
      });
    } else {
      setFilters({
        work_experience: main,
      });
    }
  };

  return (
    <FilterCheckboxGroup
      data={
        data?.map((item) => ({
          id: item.id,
          name: item[`name_${language}` as keyof typeof item] as string, // Dynamic name based on language
        })) || []
      }
      selectedMainItems={selectedMainExperience}
      setFilters={updateFilters}
      label={t('label')}
    />
  );
}
