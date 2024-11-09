import { TGetCompaniesResDto } from '@/entities/company/api';
import { useGetCompanies } from '@/entities/company/hooks/useGetCompanies';
import { SelectContent, SelectTrigger, SelectValue, SelectItem, Select } from '@/shared/ui/select';

export function CompanySelect({ onChange }: { onChange: (id: number) => void }) {
  const { data: companies } = useGetCompanies();
  const handleChange = (id: string) => {
    onChange(parseInt(id, 10));
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Выберите компанию" />
      </SelectTrigger>
      <SelectContent>
        {companies?.map((company: TGetCompaniesResDto[0]) => (
          <SelectItem value={company.id?.toString() || ''} key={company.id}>
            {company.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}