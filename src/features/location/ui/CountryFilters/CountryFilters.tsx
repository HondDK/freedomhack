import { useState } from 'react';
import { TGetJobsReqDto } from '@/entities/job/api';
import { useGetCountry } from '@/entities/location/hooks';
import { useGetSkills } from '@/entities/skill/hooks';
import { FilterCheckboxGroup } from '@/shared/ui';

type TProps = {
  setFilters: (filters: TGetJobsReqDto) => void;
};

export function CountryFilters({ setFilters }: TProps) {
  const { data } = useGetCountry();
  const [selectedMainCountry, setSelectedMainCountry] = useState<number[]>([]);

  const updateFilters = ({ main }: { main: number[] }) => {
    setSelectedMainCountry(main);
    setFilters({
      country: main,
    });
  };

  return (
    <FilterCheckboxGroup
      data={data?.map((item) => ({
        id: item.id,
        name: item.name_ru,
      })) || []}
      selectedMainItems={selectedMainCountry}
      setFilters={updateFilters}
      label="Локация"
    />
  );
}
