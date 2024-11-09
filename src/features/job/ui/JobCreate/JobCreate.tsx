import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { getQueryClient } from '@/app/get-query-client';
import { CompanySelect } from '@/entities/company/ui';
import { DepartamentSelect } from '@/entities/departament/ui';
import { JobSearchStatusSelect } from '@/entities/job';
import { TCreateJobReqDto, TGetJobsReqDto, GET_JOBS } from '@/entities/job/api';
import { useCreateJob } from '@/entities/job/hooks/useCreateJob';
import { CountrySelect } from '@/entities/location/ui';
import { SkillMultiSelect } from '@/entities/skill';
import { FormatSelect } from '@/entities/work/format/ui';
import { Button } from '@/shared/ui/button';
import { FormControl, FormMessage, FormField, FormLabel, FormItem, Form } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Textarea } from "@/shared/ui/textarea";
import { DialogTrigger, DialogContent, DialogFooter, DialogHeader, DialogClose, Dialog } from '@/shared/ui/dialog';
import { ExperienceSelect } from '@/entities/work/experience/ui';
import { DirectionSelect } from '@/entities/work/direction/ui/DirectionSelect';

const JobFormSchema = z.object({
  name_kz: z.string().min(1, 'Название на казахском обязательно').max(255),
  name_ru: z.string().min(1, 'Название на русском обязательно').max(255),
  name_en: z.string().min(1, 'Название на английском обязательно').max(255),
  description_kz: z.string().optional().nullable(),
  description_ru: z.string().optional().nullable(),
  description_en: z.string().optional().nullable(),
  requirements_kz: z.string().min(1, 'Требования к кандидату на казахском обязательны'),
  requirements_ru: z.string().min(1, 'Требования к кандидату на русском обязательны'),
  requirements_en: z.string().min(1, 'Требования к кандидату на английском обязательны'),
  work_format: z.number().optional().nullable(),
  work_experience: z.number().optional().nullable(),
  work_direction: z.number().optional().nullable(),
  sub_work_direction: z.number().optional().nullable(),
  company: z.number().min(1, 'Компания обязательна'),
  department: z.number().optional().nullable(),
  job_search_status: z.number().optional().nullable(),
  country: z.number().optional().nullable(),
  city: z.number().optional().nullable(),
  skills: z.array(z.number()).min(1, 'Навыки обязательны').optional(),
});

const fieldsConfig = [
  { name: 'name_kz', label: 'Қазақша атауы', placeholder: 'Вакансияның атауы', component: Input },
  { name: 'name_ru', label: 'Название на русском', placeholder: 'Название', component: Input },
  { name: 'name_en', label: 'Name in English', placeholder: 'Job name in English', component: Input },
  { name: 'description_kz', label: 'Қазақша сипаттама', placeholder: 'Сипаттама', component: Textarea },
  { name: 'description_ru', label: 'Описание на русском', placeholder: 'Описание', component: Textarea },
  { name: 'description_en', label: 'Description in English', placeholder: 'Description', component: Textarea },
  { name: 'requirements_kz', label: 'Талаптар (Қазақша)', placeholder: 'Кандидатқа қойылатын талаптар', component: Textarea },
  { name: 'requirements_ru', label: 'Требования на русском', placeholder: 'Требования', component: Textarea },
  { name: 'requirements_en', label: 'Requirements in English', placeholder: 'Requirements', component: Textarea },
  { name: 'work_format', label: 'Формат работы', placeholder: 'Work Format', component: FormatSelect },
  { name: 'work_experience', label: 'Опыт работы', placeholder: 'Work Experience', component: ExperienceSelect },
  { name: 'work_direction', label: 'Направление', placeholder: 'Work Direction', component: DirectionSelect },
  { name: 'sub_work_direction', label: 'Под направление', placeholder: 'Sub Work Direction', component: DirectionSelect },
  { name: 'company', label: 'Компания', placeholder: 'Company ID', component: CompanySelect },
  { name: 'department', label: 'Департамент', placeholder: 'Department ID', component: DepartamentSelect },
  { name: 'job_search_status', label: 'Статус поиска кандидата', placeholder: 'Статус поиска кандидата', component: JobSearchStatusSelect },
  { name: 'country', label: 'Страна', placeholder: 'Country ID', component: CountrySelect },
  { name: 'city', label: 'Город', placeholder: 'City ID', component: CountrySelect },
  { name: 'skills', label: 'Навыки', placeholder: 'Необходимые навыки', component: SkillMultiSelect },
];

export function JobCreate({ filters }: TProps) {
  const { mutate, isSuccess } = useCreateJob();
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = getQueryClient();

  const form = useForm<z.infer<typeof JobFormSchema>>({
    resolver: zodResolver(JobFormSchema),
    defaultValues: {
      name_kz: '',
      name_ru: '',
      name_en: '',
      description_kz: '',
      description_ru: '',
      description_en: '',
      requirements_kz: '',
      requirements_ru: '',
      requirements_en: '',
      company: 0,
      skills: [],
    },
  });

  const onSubmit = (values: TCreateJobReqDto) => {
    mutate(values);
  };

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: [GET_JOBS, filters], type: 'all' });
    }
  }, [isSuccess]);

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)} className={'mt-3 mb-3'}>Создать вакансию</Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-lg sm:max-w-2xl h-full max-h-screen sm:h-[90vh] overflow-y-auto rounded-lg p-4 sm:p-6">
        <DialogHeader>
          <h2 className="text-xl font-semibold mb-2">Создание вакансии</h2>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {fieldsConfig.map(({ name, label, placeholder, component: Component }) => (
              <FormField
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Component placeholder={placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name={name as keyof TCreateJobReqDto}
                control={form.control}
                key={name}
              />
            ))}
            <DialogFooter >
              <Button className={'mb-3'} type="submit">Создать вакансию</Button>
              <DialogClose asChild>
                <Button className={'mb-3'} variant="outline">Закрыть</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
