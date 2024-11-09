import { ChevronRightIcon } from '@radix-ui/react-icons';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';
import { Checkbox } from '@/shared/ui/checkbox';
import { Label } from '@/shared/ui/label';

type FilterItem = {
  id: number;
  name: string;
  sub_items?: FilterItem[];
};

type TProps = {
  data: FilterItem[];
  label: string;
  selectedMainItems: number[];
  selectedSubItems?: number[];
  setFilters: (filters: { main: number[]; sub?: number[] }) => void;
};

export function FilterCheckboxGroup({
  data,
  label,
  selectedMainItems,
  selectedSubItems = [],
  setFilters,
}: TProps) {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const handleMainItemChange = (id: number, subItems: number[] = []) => {
    const isSelected = selectedMainItems.includes(id);
    const updatedMainItems = isSelected
      ? selectedMainItems.filter((item) => item !== id)
      : [...selectedMainItems, id];

    // If subItems exist, update selectedSubItems accordingly
    const updatedSubItems = isSelected
      ? selectedSubItems.filter((subId) => !subItems.includes(subId))
      : [...selectedSubItems, ...subItems];

    // Pass sub only if sub_items exist
    setFilters({ main: updatedMainItems, ...(subItems.length > 0 && { sub: updatedSubItems }) });
  };

  const handleSubItemChange = (subId: number) => {
    const isSelected = selectedSubItems.includes(subId);
    const updatedSubItems = isSelected
      ? selectedSubItems.filter((item) => item !== subId)
      : [...selectedSubItems, subId];

    setFilters({ main: selectedMainItems, sub: updatedSubItems });
  };

  const toggleExpand = (id: number) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-4 mb-4">
      <h3 className="text-lg font-semibold">{label}</h3>
      {data.map((item) => (
        <div className="space-y-1" key={item.id}>
          <div className="flex items-center">
            {item.sub_items && item.sub_items.length > 0 && (
              <button onClick={() => toggleExpand(item.id)} className="mr-2 focus:outline-none">
                {expandedItems.includes(item.id) ? (
                  <ChevronDownIcon className="h-4 w-4" />
                ) : (
                  <ChevronRightIcon className="h-4 w-4" />
                )}
              </button>
            )}
            <Checkbox
              onCheckedChange={() =>
                handleMainItemChange(
                  item.id,
                  item.sub_items?.map((sub) => sub.id) || []
                )
              }
              checked={selectedMainItems.includes(item.id)}
              id={`item-${item.id}`}
            />
            <Label className="ml-2 text-sm font-medium" htmlFor={`item-${item.id}`}>
              {item.name}
            </Label>
          </div>
          {item.sub_items && expandedItems.includes(item.id) && (
            <div className="pl-6 space-y-1">
              {item.sub_items.map((subItem) => (
                <div className="flex items-center space-x-2" key={subItem.id}>
                  <Checkbox
                    onCheckedChange={() => handleSubItemChange(subItem.id)}
                    checked={selectedSubItems.includes(subItem.id)}
                    id={`sub-item-${subItem.id}`}
                  />
                  <Label htmlFor={`sub-item-${subItem.id}`} className="text-sm">
                    {subItem.name}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
