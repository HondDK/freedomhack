'use client'

import { IJobCandidateModel } from '@/entities/job-candidate/api';

type TProps = {
  data: IJobCandidateModel;
};

export function ResumeCard(props: TProps) {
  const { data } = props;


  return (
    <div
      className="p-4 bg-white border rounded-lg shadow-sm flex flex-col gap-4 hover:shadow-lg transition-shadow duration-200 ease-in-out cursor-pointer"
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          {data.full_name || 'Имя кандидата не указано'}
        </h3>
        {data.email && (
          <p className="text-sm text-gray-600">Email: {data.email}</p>
        )}
        {data.phone_number && (
          <p className="text-sm text-gray-600">Телефон: {data.phone_number}</p>
        )}
      </div>

      <div className="text-gray-500 text-sm space-y-1">
        {data.work_direction?.name_ru && (
          <p>Направление работы: {data.work_direction.name_ru}</p>
        )}
        {data.sub_work_directions?.name_ru && (
          <p>Поднаправление: {data.sub_work_directions.name_ru}</p>
        )}
      </div>

      {data.cities.length > 0 && (
        <div className="text-gray-500 text-sm">
          <p>Города: {data.cities.map((city) => city.name_ru).join(', ')}</p>
        </div>
      )}

      {data.skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {data.skills.map((skill) => (
            <span
              className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
              key={skill.id}
            >
              {skill.name_ru}
            </span>
          ))}
        </div>
      )}

      {data.cv_file && (
        <div className="mt-3">
          <a
            className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200 inline-block text-center"
            rel="noopener noreferrer"
            href={data.cv_file}
            target="_blank"
          >
            Открыть резюме
          </a>
        </div>
      )}
    </div>
  );
}
