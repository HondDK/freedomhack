'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/shared/ui/button';
import { FormDescription, FormControl, FormMessage, FormField, FormLabel, FormItem, Form } from '@/shared/ui/form';
import { InputOTPGroup, InputOTPSlot, InputOTP } from '@/shared/ui/input-otp';
import { TRegisterUserCodeReqDto, TRegisterUserFinishReqDto } from '@/entities/worker/api';
import { Input } from '@/shared/ui/input';

const FormSchema = z.object({
	password: z.string().min(8, {
		message: 'Пароль должен содержать не менее 8 символов.',
	}).regex(/[A-Z]/, {
		message: 'Пароль должен содержать хотя бы одну заглавную букву.',
	}).regex(/[a-z]/, {
		message: 'Пароль должен содержать хотя бы одну строчную букву.',
	}).regex(/[0-9]/, {
		message: 'Пароль должен содержать хотя бы одну цифру.',
	}),
})

export function RegisterFinish(props: { registerUserFinish: (payload: TRegisterUserFinishReqDto) => void;  loading: boolean}) {
	const { registerUserFinish, loading } = props
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			password: '',
		},
	})


	function onSubmit(data: z.infer<typeof FormSchema>) {
		registerUserFinish(data)
	}

	return (
		<Form {...form}>
			<form className="w-full max-w-sm space-y-3 p-6" onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					render={({ field }) => (
						<FormItem>
							<FormLabel>Пароль</FormLabel>
							<FormControl>
								<Input placeholder="Введите пароль" type="password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
					control={form.control}
					name="password"
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


