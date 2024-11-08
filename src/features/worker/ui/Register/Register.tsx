'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/shared/ui/button';
import { FormControl, FormMessage, FormField, FormLabel, FormItem, Form } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { TRegisterUserInitReqDto } from '@/entities/worker/api';

const FormSchema = z.object({
  email: z.string().email({
    message: 'Введите корректный адрес электронной почты.',
  }).min(1, {
    message: 'Электронная почта обязательна.',
  }),
  full_name: z.string().min(1, {
    message: 'ФИО обязательно.',
  }),
  tg_username: z.string().min(1, {
    message: 'Имя в тг обязательно.',
  }),
});


export function Register(props : {  registerUserInit: (payload: TRegisterUserInitReqDto) => void; loading: boolean }) {
  const { registerUserInit, loading } = props

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      full_name: '',
      tg_username: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    registerUserInit({
      email: data.email,
      full_name: data.full_name,
      tg_username: data.tg_username
    })
  }

  return (
    <Form {...form}>
      <form className="w-full max-w-sm space-y-3 p-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя в телеграмме</FormLabel>
              <FormControl>
                <Input placeholder="@honddk" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          control={form.control}
          name="tg_username"
        />
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ваша почта</FormLabel>
              <FormControl>
                <Input placeholder="Email" type="email" {...field} />
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
              <FormLabel>Ваше ФИО</FormLabel>
              <FormControl>
                <Input placeholder="Бобер Боберович Бобрик" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          control={form.control}
          name="full_name"
        />
        <div className="flex justify-between">
          <Button disabled={loading} type="submit">Зарегистрироваться</Button>
          <Link href="/auth">
            <Button variant="ghost">Войти</Button>
          </Link>
        </div>
      </form>
    </Form>
  );
}


