import { TGetDepartamentsResDto } from '@/entities/departament/api';
import { useGetDepartaments } from '@/entities/departament/hooks/useGetDepartaments';
import { SelectContent, SelectTrigger, SelectValue, SelectItem, Select } from '@/shared/ui/select';

export function DepartamentSelect({ onChange }: { onChange: (id: number) => void }) {
  const { data } = useGetDepartaments();
  const handleChange = (id: string) => {
    onChange(parseInt(id, 10));
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Выберите департамент" />
      </SelectTrigger>
      <SelectContent>
        {data?.map((departament: TGetDepartamentsResDto[0]) => (
          <SelectItem value={departament.id?.toString() || ''} key={departament.id}>
            {departament.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}