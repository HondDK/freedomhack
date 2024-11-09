import { IJobModel } from '@/entities/job/api';
import { Badge } from '@/shared/ui/badge';

type TProps = {
  data: IJobModel
}

export function VacancyAdditionalDetails(props: TProps) {
  const { data } = props


  return <div className="lg:w-1/3">
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Формат работы</h3>
      <div className="flex flex-wrap gap-2">
        <Badge className="bg-blue-500 text-white">{data.work_format.name_ru}</Badge>
      </div>
    </div>
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Опыт</h3>
      <div className="flex flex-wrap gap-2">
        <Badge className="bg-blue-500 text-white">{data.work_experience.name_ru}</Badge>
      </div>
    </div>
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Направление работы</h3>
      <div className="flex flex-wrap gap-2">
        <Badge className="bg-blue-500 text-white">{data.work_direction.name_ru}</Badge>
      </div>
    </div>
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Поднаправление работы</h3>
      <div className="flex flex-wrap gap-2">
        <Badge className="bg-blue-500 text-white">{data.sub_work_direction.name_ru}</Badge>
      </div>
    </div>
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Статус поиска</h3>
      <div className="flex flex-wrap gap-2">
        <Badge className="bg-blue-500 text-white">{data.job_search_status.name}</Badge>
      </div>
    </div>
    {data.skills.length > 0 && (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Навыки</h3>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill) => (
            <Badge className="bg-blue-500 text-white" key={skill.id}>
              {skill.name_ru}
            </Badge>
          ))}
        </div>
      </div>
    )}
  </div>
}