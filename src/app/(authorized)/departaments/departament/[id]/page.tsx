'use client'

import { DepartamentPage } from '@/app-pages/(authorized)/departaments';

export default function Departament({ params }: { params: { id: string } }) {

  return <DepartamentPage id={params.id}/>
}
