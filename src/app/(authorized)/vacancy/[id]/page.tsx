'use client'

import { VacancyPage } from '@/app-pages/(authorized)';

export default function Vacancy({ params }: { params: { id: string } }) {

  return <VacancyPage id={params.id}/>
}
