import { useState } from 'react';
import { TGetJobsReqDto } from '@/entities/job/api';
import { TGetJobCandidatesReqDto } from '@/entities/job-candidate/api';
import { useGetWorkExperience } from '@/entities/work/experience/hooks';
import { FilterCheckboxGroup } from '@/shared/ui';

type TProps = {
  setFilters: (filters: TGetJobsReqDto | TGetJobCandidatesReqDto) => void,
  isResume?: boolean
};

export function ExperienceFilters({ setFilters, isResume }: TProps) {
  const { data } = useGetWorkExperience();
  const [selectedMainExperience, setSelectedMainExperience] = useState<number[]>([]);

  const updateFilters = ({ main }: { main: number[] }) => {
    setSelectedMainExperience(main);

    if (isResume){
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
