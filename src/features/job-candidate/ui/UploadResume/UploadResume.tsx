import { Form, FormControl, FormField, FormItem, FormMessage } from '@/shared/ui/form';
import { Label } from '@/shared/ui/label';
import { Input } from '@/shared/ui/input';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getCookie } from 'cookies-next';
import { getQueryClient } from '@/app/get-query-client';
import { GET_JOB_CANDIDATES, TGetJobCandidatesReqDto } from '@/entities/job-candidate/api';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';

const FormSchema = z.object({
  file: z.any().refine((fileList) => fileList && fileList.length > 0, { message: 'Архив обязателен.' }),
});

type FormData = z.infer<typeof FormSchema>;

const HOST = process.env.NEXT_PUBLIC_HOST;
const token = getCookie('authToken');

type TProps = {
  filters: TGetJobCandidatesReqDto
}

export function UploadResume(props: TProps) {
  const { filters } = props;
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
        }
      });

      if (response.ok) {
        setSubmissionStatus('Резюме успешно загружены.');
        setIsDialogOpen(false); // Close the dialog on successful upload
      } else {
        setSubmissionStatus('Ошибка при загрузке резюме.');
      }
    } catch (error) {
      console.error('Ошибка отправки резюме:', error);
      setSubmissionStatus('Ошибка при отправке резюме.');
    } finally {
      await queryClient.invalidateQueries({ queryKey: [GET_JOB_CANDIDATES, filters], type: 'all' });
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsDialogOpen(true)} className="mt-4">Загрузка резюме</Button>
      </DialogTrigger>
      <DialogContent className="p-6 bg-white shadow-lg rounded-lg w-96">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Загрузить новые резюме</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-6">
            <FormField
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="file">Выберите архив с резюме (CV)</Label>
                  <FormControl>
                    <Input
                      onChange={(e) => {
                        const files = e.target.files;
                        field.onChange(files);
                        handleFileUpload(files);
                      }}
                      accept=".zip"
                      id="file"
                      type="file"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              control={form.control}
              name="file"
            />
            {isLoading && <p>Загрузка...</p>}
            {submissionStatus && <p>{submissionStatus}</p>}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
