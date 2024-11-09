import { useState } from 'react';
import { useCreateCompany } from '@/entities/company/hooks/useCreateCompany';
import { Button } from '@/shared/ui/button';
import { DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, Dialog } from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';

export function CreateCompany() {
  const { mutate, isPending } = useCreateCompany();
  const [name, setName] = useState('');

  const handleSubmit = () => {
    mutate({ name });
  };

  return (
    <Dialog>
      <DialogTrigger className={'mt-4'} asChild>
        <Button>Cоздание компании</Button>
      </DialogTrigger>
      <DialogContent className="p-6 bg-white shadow-lg rounded-lg w-96">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Создать новую компанию</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Input
            onChange={(e) => setName(e.target.value)}
            placeholder="Название компании"
            className="w-full mb-4"
            value={name}
            type="text"
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isPending} className="w-full">
            {isPending ? 'Создание...' : 'Создать компанию'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
