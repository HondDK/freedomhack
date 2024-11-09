import { TGetWorkFormatResDto } from '@/entities/work/format';
import { useGetWorkFormat } from '@/entities/work/format/hooks';
import { SelectContent, SelectTrigger, SelectValue, SelectItem, Select } from '@/shared/ui/select';

export function FormatSelect({ onChange }: { onChange: (id: number) => void }) {
  const { data } = useGetWorkFormat();
  const handleChange = (id: string) => {
    onChange(parseInt(id, 10));
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Выберите формат работы" />
      </SelectTrigger>
      <SelectContent>
        {data?.map((format: TGetWorkFormatResDto[0]) => (
          <SelectItem value={format.id?.toString() || ''} key={format.id}>
            {format.name_ru}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}