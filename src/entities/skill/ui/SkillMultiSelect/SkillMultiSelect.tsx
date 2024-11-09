import { TGetSkillsResDto } from '@/entities/skill/api';
import { useGetSkills } from '@/entities/skill/hooks';
import { MultiSelect } from '@/shared/ui/multi-select';
import { SelectTrigger, SelectContent, SelectValue, SelectItem } from '@/shared/ui/select';

export function SkillMultiSelect({ onChange }: { onChange: (ids: number[]) => void }) {
  const { data: skills } = useGetSkills();

  const handleChange = (selectedIds: string[]) => {
    const updatedSkills = selectedIds.map((id) => parseInt(id, 10));
    onChange(updatedSkills);
  };

  const skillOptions = skills?.map((skill: TGetSkillsResDto[0]) => ({
    value: skill.id?.toString() || '',
    label: skill.name_ru,
  })) || [];

  return (
    <MultiSelect onValueChange={handleChange} options={skillOptions}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Выберите навыки" />
      </SelectTrigger>
      <SelectContent>
        {skillOptions.map((skill) => (
          <SelectItem value={skill.value} key={skill.value}>
            {skill.label}
          </SelectItem>
        ))}
      </SelectContent>
    </MultiSelect>
  );
}
