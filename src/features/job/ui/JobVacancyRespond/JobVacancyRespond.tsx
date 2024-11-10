'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useScopedI18n } from '@/shared/config';
import { Button } from '@/shared/ui/button';
import { FormControl, FormMessage, FormField, FormItem, Form } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

const FormSchema = z.object({
  full_name: z.string().min(1, { message: 'ФИО обязательно.' }),
  email: z.string().email({ message: 'Введите корректный адрес электронной почты.' }).min(1, { message: 'Email обязателен.' }),
  phone_number: z.string().min(1, { message: 'Номер телефона обязателен.' }),
  cv_file: z.any().refine((fileList) => fileList && fileList.length > 0, { message: 'Резюме обязательно.' }),
});

type FormData = z.infer<typeof FormSchema>;

type TJobApplicationFormProps = {
  jobId: number;
};

const HOST = 'https://dudeonthecam.online/freedom_back/api/';

export function JobVacancyRespond({ jobId }: TJobApplicationFormProps) {
  const t = useScopedI18n('base.job_create_form');
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      full_name: '',
      email: '',
      phone_number: '',
      cv_file: null,
    },
  });

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append('job', jobId.toString());
    formData.append('full_name', data.full_name);
    formData.append('email', data.email);
    formData.append('phone_number', data.phone_number);
    if (data.cv_file && data.cv_file[0]) {
      formData.append('cv_file', data.cv_file[0]);
    }

    try {
      const response = await fetch(`${HOST}job-candidate/create-job-candidate/`, {
        method: 'POST',
        body: formData,
      });

      setSubmissionStatus(response.ok ? t('messages.success') : t('messages.error'));
    } catch (error) {
      console.error('Ошибка отправки резюме:', error);
      setSubmissionStatus(t('messages.error'));
    }
  };

  return (
    <div className="w-full sm:w-3/4 lg:w-3/5 mt-6 space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="full_name">{t('form_labels.full_name')}</Label>
                <FormControl>
                  <Input {...field} placeholder={t('placeholders.full_name')} id="full_name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            control={form.control}
            name="full_name"
          />
          <FormField
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="email">{t('form_labels.email')}</Label>
                <FormControl>
                  <Input {...field} placeholder={t('placeholders.email')} type="email" id="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            control={form.control}
            name="email"
          />
          <FormField
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="phone_number">{t('form_labels.phone_number')}</Label>
                <FormControl>
                  <Input {...field} placeholder={t('placeholders.phone_number')} id="phone_number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            control={form.control}
            name="phone_number"
          />
          <FormField
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="cv_file">{t('form_labels.cv_file')}</Label>
                <FormControl>
                  <Input
                    onChange={(e) => field.onChange(e.target.files)}
                    accept=".pdf,.doc,.docx"
                    id="cv_file"
                    type="file"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            control={form.control}
            name="cv_file"
          />
          <Button disabled={form.formState.isSubmitting} type="submit">
            {form.formState.isSubmitting ? t('messages.sending') : t('apply_now')}
          </Button>
          {submissionStatus && (
            <p className={`mt-2 text-sm ${submissionStatus === t('messages.success') ? 'text-green-600' : 'text-red-600'}`}>
              {submissionStatus}
            </p>
          )}
        </form>
      </Form>
    </div>
  );
}
