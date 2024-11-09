import { useGetCountry } from '@/entities/location/hooks';
import { SelectContent, SelectTrigger, SelectValue, SelectItem, Select } from '@/shared/ui/select';

type CountrySelectProps = {
  onChange: (id: number) => void;
  type: 'country' | 'city'; // New prop to determine selection type
};

export function CountrySelect({ onChange, type }: CountrySelectProps) {
  const { data } = useGetCountry();
  const handleChange = (id: string) => {
    onChange(parseInt(id, 10));
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={type === 'country' ? 'Выберите страну' : 'Выберите город'} />
      </SelectTrigger>
      <SelectContent>
        {data?.map((country) => (
          type === 'country' ? (
            <SelectItem value={country.id?.toString() || ''} key={country.id}>
              {country.name_ru}
            </SelectItem>
          ) : (
            country.cities.map((city) => (
              <SelectItem value={city.id?.toString() || ''} key={city.id}>
                {city.name_ru}
              </SelectItem>
            ))
          )
        ))}
      </SelectContent>
    </Select>
  );
}
