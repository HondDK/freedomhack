import { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { useCreateDepartament } from '@/entities/departament/hooks/useCreateDepartament';
import { CompanySelect } from '@/entities/company/ui';

export function CreateDepartament() {
  const { mutate, isPending } = useCreateDepartament();
  const [name, setName] = useState('');
  const [companyId, setCompanyId] = useState<number | null>(null);

  const handleSubmit = () => {
    if (companyId !== null) {
      mutate({
        name: name,
        company: companyId,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger className={'mt-4'} asChild>
        <Button>Создание департамента</Button>
      </DialogTrigger>
      <DialogContent className="p-6 bg-white shadow-lg rounded-lg w-96">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Создать новый департамент</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Input
            type="text"
            placeholder="Название департамента"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-4"
          />
          <CompanySelect onChange={setCompanyId} />
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isPending || companyId === null} className="w-full">
            {isPending ? 'Создание...' : 'Создать департамент'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
