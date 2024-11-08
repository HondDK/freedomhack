'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { TRegisterUserCodeReqDto } from '@/entities/worker/api';
import { Button } from '@/shared/ui/button';
import { FormDescription, FormControl, FormMessage, FormField, FormLabel, FormItem, Form } from '@/shared/ui/form';
import { InputOTPGroup, InputOTPSlot, InputOTP } from '@/shared/ui/input-otp';

const FormSchema = z.object({
  code: z.string().min(6, {
    message: 'Введите все 6 символов',
  }),
})

export function RegisterOTP(props: { registerUserCode: (payload: TRegisterUserCodeReqDto) => void;  loading: boolean}) {
  const { registerUserCode, loading } = props
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      code: '',
    },
  })


  function onSubmit(data: z.infer<typeof FormSchema>) {
    registerUserCode(data)
  }

  return (
    <Form {...form}>
      <form className="w-full max-w-sm space-y-3 p-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>Код с почты</FormLabel>
              <FormControl>
                <InputOTP className={'w-full'} maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Введите одноразовый код с почты
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
          control={form.control}
          name="code"
        />
        <div className="flex justify-between">
          <Button disabled={loading} type="submit">Подтвердить</Button>
          <Link href={'/'}>
            <Button variant={'ghost'}>Отмена</Button>
          </Link>
        </div>
      </form>
    </Form>
  );
}


