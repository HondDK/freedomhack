'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { getCookie } from 'cookies-next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { getQueryClient } from '@/core/providers/QueryProvider/QueryProvider';
import { TGetJobCandidatesReqDto, GET_JOB_CANDIDATES } from '@/entities/job-candidate/api';
import { useScopedI18n } from '@/shared/config';
import { Button } from '@/shared/ui/button';
import { DialogContent, DialogTrigger, DialogHeader, DialogTitle, Dialog } from '@/shared/ui/dialog';
import { FormControl, FormMessage, FormField, FormItem, Form } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

const FormSchema = z.object({
  file: z.any().refine((fileList) => fileList && fileList.length > 0, { message: 'Архив обязателен.' }),
});

type FormData = z.infer<typeof FormSchema>;

const HOST = 'https://dudeonthecam.online/freedom_back/api/';
const token = getCookie('authToken');

type TProps = {
  filters: TGetJobCandidatesReqDto;
};

export function UploadResume(props: TProps) {
  const { filters } = props;
  const t = useScopedI18n('base.resume_upload');
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = getQueryClient();

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      file: null,
    },
  });

  const handleFileUpload = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', fileList[0]);

    try {
      const response = await fetch(`${HOST}job-candidate/job-candidate/upload-cv-files/`, {
        method: 'POST',
        body: formData,
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (response.ok) {
        setSubmissionStatus(t('success'));
        setIsDialogOpen(false); // Close the dialog on successful upload
      } else {
        setSubmissionStatus(t('error'));
      }
    } catch (error) {
      console.error('Ошибка отправки резюме:', error);
      setSubmissionStatus(t('error'));
    } finally {
      await queryClient.invalidateQueries({ queryKey: [GET_JOB_CANDIDATES, filters], type: 'all' });
      setIsLoading(false);
    }
  };

  return (
    <Dialog onOpenChange={setIsDialogOpen} open={isDialogOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsDialogOpen(true)} className="mt-4">
          {t('button')}
        </Button>
      </DialogTrigger>
      <DialogContent className="p-6 bg-white shadow-lg rounded-lg w-96">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">{t('dialog_title')}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-6">
            <FormField
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="file">{t('select_file')}</Label>
                  <FormControl>
                    <Input
                      onChange={(e) => {
                        const files = e.target.files;
                        field.onChange(files);
                        handleFileUpload(files);
                      }}
                      accept=".zip"
                      type="file"
                      id="file"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              control={form.control}
              name="file"
            />
            {isLoading && <p>{t('loading')}</p>}
            {submissionStatus && <p>{submissionStatus}</p>}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
