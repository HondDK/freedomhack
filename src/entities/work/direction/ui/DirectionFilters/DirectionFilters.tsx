import { useState } from 'react';
import { useGetWorkDirection } from '@/entities/work/direction/hooks';
import { TGetJobsReqDto } from '@/entities/job/api';
import { ChevronDownIcon } from 'lucide-react';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { Checkbox } from '@/shared/ui/checkbox';
import { Label } from '@/shared/ui/label';

type TProps = {
  setFilters: (filters: TGetJobsReqDto) => void;
};

export function DirectionFilters({ setFilters }: TProps) {
  const { data } = useGetWorkDirection();
  const [selectedMainDirections, setSelectedMainDirections] = useState<number[]>([]);
  const [selectedSubDirections, setSelectedSubDirections] = useState<number[]>([]);
  const [expandedDirections, setExpandedDirections] = useState<number[]>([]);

  const handleDirectionChange = (id: number, subDirections: number[] = []) => {
    setSelectedMainDirections((prev) => {
      const isSelected = prev.includes(id);
      let updatedMainSelections, updatedSubSelections;

      if (isSelected) {
        updatedMainSelections = prev.filter((item) => item !== id);
        updatedSubSelections = selectedSubDirections.filter((subId) => !subDirections.includes(subId));
      } else {
        updatedMainSelections = [...prev, id];
        updatedSubSelections = [...selectedSubDirections, ...subDirections];
      }

      setFilters({
        work_direction: updatedMainSelections,
        sub_work_direction: updatedSubSelections,
      });

      setSelectedSubDirections(updatedSubSelections);
      return updatedMainSelections;
    });
  };

  const handleSubDirectionChange = (mainId: number, subId: number) => {
    setSelectedSubDirections((prev) => {
      const isSelected = prev.includes(subId);
      const updatedSubSelections = isSelected ? prev.filter((item) => item !== subId) : [...prev, subId];

      setFilters({
        work_direction: selectedMainDirections,
        sub_work_direction: updatedSubSelections,
      });

      return updatedSubSelections;
    });
  };

  const toggleExpand = (id: number) => {
    setExpandedDirections((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Направления</h3>
      {data?.map((direction) => (
        <div key={direction.id} className="space-y-1">
          <div className="flex items-center">
            <button
              onClick={() => toggleExpand(direction.id)}
              className="mr-2 focus:outline-none"
            >
              {expandedDirections.includes(direction.id) ? (
                <ChevronDownIcon className="h-4 w-4" />
              ) : (
                <ChevronRightIcon className="h-4 w-4" />
              )}
            </button>
            <Checkbox
              id={`direction-${direction.id}`}
              checked={selectedMainDirections.includes(direction.id)}
              onCheckedChange={() =>
                handleDirectionChange(
                  direction.id,
                  direction.sub_work_directions?.map((sub) => sub.id) || []
                )
              }
            />
            <Label htmlFor={`direction-${direction.id}`} className="ml-2 text-sm font-medium">
              {direction.name_ru}
            </Label>
          </div>
          {expandedDirections.includes(direction.id) && (
            <div className="pl-6 space-y-1">
              {direction.sub_work_directions?.map((subDirection) => (
                <div key={subDirection.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`sub-direction-${subDirection.id}`}
                    checked={selectedSubDirections.includes(subDirection.id)}
                    onCheckedChange={() =>
                      handleSubDirectionChange(direction.id, subDirection.id)
                    }
                  />
                  <Label htmlFor={`sub-direction-${subDirection.id}`} className="text-sm">
                    {subDirection.name_ru}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
