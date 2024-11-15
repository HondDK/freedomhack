'use client'

import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RegisterFinish, RegisterOTP, Register } from '@/features/worker/ui';
import { useRegisterUserFinish, useRegisterUserCode, useRegisterUserInit } from '@/entities/worker/hooks';
import { CardDescription, CardHeader, CardTitle, Card } from '@/shared/ui/card';
import { LoadingSpinner } from '@/shared/ui/LoadingSpiner';

export function RegisterCard(){
  const router = useRouter()
  const authToken = getCookie('authToken')

  if(authToken) {
    router.push('/')
  }

  const [step, setStep] = useState(0);
  const { mutate: registerUserInit, data, isPending: initLoading, isSuccess: initSuccess }  = useRegisterUserInit()
  const { mutate: registerUserCode, isPending: codeLoading, isSuccess: codeSuccess } = useRegisterUserCode(data?.uuid!)
  const { mutate: registerUserFinish, isPending: finishLoading, isSuccess: finishSuccess } = useRegisterUserFinish(data?.uuid!)

  useEffect(() => {
    if(initSuccess){
      setStep(1)
    }
    if(codeSuccess){
      setStep(2)
    }
    if(finishSuccess){
      router.replace('/auth')
    }
    if(data?.status === 1){
      setStep(1)
    }
  }, [initSuccess, codeSuccess, finishSuccess, data?.status]);

  const isLoading = initLoading || finishLoading || codeLoading

  return <Card className="w-full max-w-sm">
    <CardHeader>
      <CardTitle className="text-2xl">Регистрация</CardTitle>
      {step === 0 &&
      <CardDescription>
        Введите все данные чтобы зарегистрироваться
      </CardDescription>}
    </CardHeader>
    {isLoading && <LoadingSpinner className={'w-full max-w-sm space-y-3 p-6'} size={108} />}
    {step === 0 && !isLoading && <Register registerUserInit={registerUserInit} loading={initLoading}/>}
    {step === 1 && !isLoading && <RegisterOTP registerUserCode={registerUserCode} loading={codeLoading} />}
    {step === 2 && !isLoading && <RegisterFinish registerUserFinish={registerUserFinish} loading={finishLoading}/>}
  </Card>
}