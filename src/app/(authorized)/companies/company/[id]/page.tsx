'use client'

import { CompanyPage } from '@/app-pages/(authorized)/companies';

export default function Company({ params }: { params: { id: string } }) {

  return <CompanyPage id={params.id}/>
}
