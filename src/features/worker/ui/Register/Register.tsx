'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/shared/ui/button';
import { FormControl, FormMessage, FormField, FormLabel, FormItem, Form } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import useRegisterUserInit from '@/entities/worker/hooks/useRegisterUserInit/useRegisterUserInit';
import { TRegisterUserInitReqDto } from '@/entities/worker/api';

const FormSchema = z.object({
  email: z.string().email({
    message: 'Введите корректный адрес электронной почты.',
  }).min(1, {
    message: 'Электронная почта обязательна.',
  }),
  name: z.string().min(1, {
    message: 'ФИО обязательно.',
  }),
  phone_number: z.string().min(10, {
    message: 'Номер телефона должен содержать минимум 10 символов.',
  }).regex(/^\+?\d{10,15}$/, {
    message: 'Введите корректный номер телефона.',
  }),
  address: z.string().min(1, {
    message: 'Адрес обязателен.',
  }),
});


export function Register(props : {  registerUserInit: (payload: TRegisterUserInitReqDto) => void; loading: boolean }) {
  const { registerUserInit, loading } = props

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      name: '',
      phone_number: '',
      address: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    registerUserInit(data)
  }

  return (
    <Form {...form}>
      <form className="w-full max-w-sm space-y-3 p-6" onSubmit={form.handleSubmit(onSubmit)}>
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
          name="name"
        />
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ваш номер телефона</FormLabel>
              <FormControl>
                <Input placeholder="+77055553535" type="phone" {...field} />
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
              <FormLabel>Адрес</FormLabel>
              <FormControl>
                <Input placeholder="12 12 15" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          control={form.control}
          name="address"
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


