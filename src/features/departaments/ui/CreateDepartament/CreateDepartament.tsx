'use client';

import { useState } from 'react';
import { CompanySelect } from '@/entities/company/ui';
import { useCreateDepartament } from '@/entities/departament/hooks/useCreateDepartament';
import { useScopedI18n } from '@/shared/config';
import { Button } from '@/shared/ui/button';
import { DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, Dialog } from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';

export function CreateDepartament() {
  const t = useScopedI18n('base.create_departament');
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
      <DialogTrigger className="mt-4" asChild>
        <Button>{t('button')}</Button>
      </DialogTrigger>
      <DialogContent className="p-6 bg-white shadow-lg rounded-lg w-96">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">{t('dialog_title')}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Input
            onChange={(e) => setName(e.target.value)}
            placeholder={t('input_placeholder')}
            className="w-full mb-4"
            value={name}
            type="text"
          />
          <CompanySelect onChange={setCompanyId} />
        </div>
        <DialogFooter>
          <Button disabled={isPending || companyId === null} onClick={handleSubmit} className="w-full">
            {isPending ? t('creating') : t('create_button')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
