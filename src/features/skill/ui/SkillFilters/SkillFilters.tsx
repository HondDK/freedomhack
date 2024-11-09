import { useState } from 'react';
import { TGetJobsReqDto } from '@/entities/job/api';
import { useGetSkills } from '@/entities/skill/hooks';
import { FilterCheckboxGroup } from '@/shared/ui';

type TProps = {
  setFilters: (filters: TGetJobsReqDto) => void;
};

export function SkillFilters({ setFilters }: TProps) {
  const { data } = useGetSkills();
  const [selectedMainSkills, setSelectedMainSkills] = useState<number[]>([]);

  const updateFilters = ({ main }: { main: number[] }) => {
    setSelectedMainSkills(main);
    setFilters({
      skills: main,
    });
  };

  return (
    <FilterCheckboxGroup
      data={data?.map((item) => ({
        id: item.id,
        name: item.name_ru,
      })) || []}
      selectedMainItems={selectedMainSkills}
      setFilters={updateFilters}
      label="Навыки"
    />
  );
}
