'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import { getCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuthUser } from '@/entities/worker';
import { Button } from '@/shared/ui/button';
import { FormControl, FormMessage, FormField, FormLabel, FormItem, Form } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';

const FormSchema = z.object({
  username: z.string().email({
    message: 'Введите корректный адрес электронной почты.',
  }).min(1, {
    message: 'Электронная почта обязательна.',
  }),
  password: z.string().min(8, {
    message: 'Пароль должен содержать не менее 8 символов.',
  }).regex(/[A-Z]/, {
    message: 'Пароль должен содержать хотя бы одну заглавную букву.',
  }).regex(/[a-z]/, {
    message: 'Пароль должен содержать хотя бы одну строчную букву.',
  }).regex(/[0-9]/, {
    message: 'Пароль должен содержать хотя бы одну цифру.',
  }),
});


export function Auth(){
  const router = useRouter()
  const authToken = getCookie('authToken')

  if(authToken) {
    router.push('/')
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      password: ''
    },
  })

  const { mutate: authUser  } = useAuthUser()


  function onSubmit(data: z.infer<typeof FormSchema>) {
    authUser(data)
  }

  return <Form {...form}>
    <form className="w-full max-w-sm space-y-3 p-6" onSubmit={form.handleSubmit(onSubmit)}>
      <FormField
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ваша почта</FormLabel>
            <FormControl>
              <Input placeholder="Email" type='email' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        control={form.control}
        name="username"
      />
      <FormField
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ваш пароль</FormLabel>
            <FormControl>
              <Input placeholder="1234querty" type={'password'} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        control={form.control}
        name="password"
      />
      <div className={'flex justify-between'}>
        <Button type="submit">Войти</Button>
        <Link href={'/registration'}>
          <Button variant="ghost">Не зарегистрированны?</Button>
        </Link>
      </div>
    </form>
  </Form>
}