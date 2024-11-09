import { useGetWorkDirection } from '@/entities/work/direction/hooks';
import { SelectContent, SelectTrigger, SelectValue, SelectItem, Select } from '@/shared/ui/select';

type DirectionSelectProps = {
  onChange: (id: number) => void;
  type: 'work_direction' | 'sub_work_direction';
};

export function DirectionSelect({ onChange, type }: DirectionSelectProps) {
  const { data: workDirections } = useGetWorkDirection();
  const handleChange = (id: string) => {
    onChange(parseInt(id, 10));
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={type === 'work_direction' ? 'Выберите направление' : 'Выберите поднаправление'} />
      </SelectTrigger>
      <SelectContent>
        {workDirections?.map((direction) => (
          type === 'work_direction' ? (
            <SelectItem value={direction.id?.toString() || ''} key={direction.id}>
              {direction.name_ru}
            </SelectItem>
          ) : (
            direction.sub_work_directions?.map((subDirection) => (
              <SelectItem value={subDirection.id?.toString() || ''} key={subDirection.id}>
                {subDirection.name_ru}
              </SelectItem>
            ))
          )
        ))}
      </SelectContent>
    </Select>
  );
}
