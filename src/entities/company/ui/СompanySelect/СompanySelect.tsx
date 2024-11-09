import { useGetCompanies } from '@/entities/company/hooks/useGetCompanies';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { TGetCompaniesResDto } from '@/entities/company/api';

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
          <SelectItem key={company.id} value={company.id?.toString() || ''}>
            {company.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}