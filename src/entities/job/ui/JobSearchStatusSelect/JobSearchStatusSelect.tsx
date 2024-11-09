import { TGetJobStatusResDto } from '@/entities/job/api';
import { useGetSearchStatus } from '@/entities/job/hooks/useGetSearchStatus';
import { SelectContent, SelectTrigger, SelectValue, SelectItem, Select } from '@/shared/ui/select';

export function JobSearchStatusSelect({ onChange }: { onChange: (id: number) => void }) {
  const { data } = useGetSearchStatus();
  const handleChange = (id: string) => {
    onChange(parseInt(id, 10));
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Выберите cтатус" />
      </SelectTrigger>
      <SelectContent>
        {data?.map((job: TGetJobStatusResDto[0]) => (
          <SelectItem value={job.id?.toString() || ''} key={job.id}>
            {job.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}