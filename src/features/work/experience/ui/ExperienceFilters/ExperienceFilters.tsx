import { useState } from 'react';
import { TGetJobsReqDto } from '@/entities/job/api';
import { useGetWorkExperience } from '@/entities/work/experience/hooks';
import { FilterCheckboxGroup } from '@/shared/ui';

type TProps = {
  setFilters: (filters: TGetJobsReqDto) => void;
};

export function ExperienceFilters({ setFilters }: TProps) {
  const { data } = useGetWorkExperience();
  const [selectedMainExperience, setSelectedMainExperience] = useState<number[]>([]);

  const updateFilters = ({ main }: { main: number[] }) => {
    setSelectedMainExperience(main);
    setFilters({
      work_experience: main,
    });
  };

  return (
    <FilterCheckboxGroup
      data={data?.map((item) => ({
        id: item.id,
        name: item.name_ru,
      })) || []}
      selectedMainItems={selectedMainExperience}
      setFilters={updateFilters}
      label="Опыт"
    />
  );
}
