import { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/shared/ui/dialog';
import { useCreateCompany } from '@/entities/company/hooks/useCreateCompany';
import { Button } from '@/shared/ui/button';
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
            type="text"
            placeholder="Название компании"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-4"
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
