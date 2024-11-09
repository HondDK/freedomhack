import { Search } from 'lucide-react';
import { ChangeEvent, useEffect, useState } from 'react';
import { TGetJobCandidatesReqDto } from '@/entities/job-candidate/api';
import { Input } from '@/shared/ui/input';

type TProps = {
  filters: TGetJobCandidatesReqDto,
  setFilters: (filters: TGetJobCandidatesReqDto) => void
}

export function ResumeSearch(props: TProps){
  const { setFilters, filters } = props
  const [debouncedSearch, setDebouncedSearch] = useState<string | undefined>();
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setDebouncedSearch(event.target.value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilters({ ...filters, search: debouncedSearch });
    }, 1500);

    return () => clearTimeout(handler);
  }, [debouncedSearch, filters, setFilters]);

  return <form className="ml-auto flex-1 sm:flex-initial mt-6">
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
      <Input
        className="pl-8 sm:w-[600px] md:w-[300px] lg:w-[600px]"
        placeholder="Поиск резюме..."
        onChange={handleSearchChange}
        value={debouncedSearch}
        type="search"
      />
    </div>
  </form>
}