'use client';

import { useGetJob } from '@/entities/job/hooks/useGetJob';

type TProps = {
  id: string
}

export function VacancyPage(props: TProps) {
  const { id } = props

  const { data, isPending } = useGetJob(Number(id));

  console.log(data);

  return (
    <div className="w-full px-4 mt-3 flex flex-col lg:flex-row justify-between gap-4">

    </div>
  );
}
