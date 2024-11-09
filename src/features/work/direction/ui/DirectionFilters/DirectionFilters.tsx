import { useState } from 'react';
import { TGetJobsReqDto } from '@/entities/job/api';
import { useGetWorkDirection } from '@/entities/work/direction/hooks';
import { FilterCheckboxGroup } from '@/shared/ui';

type TProps = {
  setFilters: (filters: TGetJobsReqDto) => void;
};

export function DirectionFilters({ setFilters }: TProps) {
  const { data } = useGetWorkDirection();
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
      data={data?.map((item) => ({
        id: item.id,
        name: item.name_ru,
        sub_items: item.sub_work_directions?.map((sub) => ({
          id: sub.id,
          name: sub.name_ru,
        })),
      })) || []}
      selectedMainItems={selectedMainDirections}
      selectedSubItems={selectedSubDirections}
      setFilters={updateFilters}
      label="Направления"
    />
  );
}
