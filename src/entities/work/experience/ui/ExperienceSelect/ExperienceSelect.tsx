import { TGetWorkExperienceResDto } from '@/entities/work/experience';
import { useGetWorkExperience } from '@/entities/work/experience/hooks';
import { SelectContent, SelectTrigger, SelectValue, SelectItem, Select } from '@/shared/ui/select';

export function ExperienceSelect({ onChange }: { onChange: (id: number) => void }) {
  const { data } = useGetWorkExperience();
  const handleChange = (id: string) => {
    onChange(parseInt(id, 10));
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Выберите требуемый опыт" />
      </SelectTrigger>
      <SelectContent>
        {data?.map((exp: TGetWorkExperienceResDto[0]) => (
          <SelectItem value={exp.id?.toString() || ''} key={exp.id}>
            {exp.name_ru}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}