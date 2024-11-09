import { IJobModel } from '@/entities/job/api';

type TProps = {
  data: IJobModel;
};

export function JobCard(props: TProps) {
  const { data } = props;

  return (
    <div className="p-3 sm:p-4 bg-white border rounded-lg shadow-md flex flex-col gap-3 sm:gap-4 mt-3 mb-3">
      <div className="flex items-center gap-3 sm:gap-4">
        {data.company.logo && (
          <img
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
            alt={`${data.company.name} logo`}
            src={data.company.logo}
          />
        )}
        <div>
          <p className="text-gray-600 text-xs sm:text-sm">{data.company.name}</p>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">
            {data.title}
          </h3>
        </div>
      </div>
      <div>
        <p className="text-gray-500 text-xs sm:text-sm">
          Город: {data.city.name_ru}
        </p>
        <p className="text-gray-500 text-xs sm:text-sm">
          Формат работы: {data.work_format.name_ru}
        </p>
        <p className="text-gray-500 text-xs sm:text-sm">
          Опыт: {data.work_experience.name_ru}
        </p>
      </div>
      <div>
        <h4 className="text-gray-800 font-medium text-xs sm:text-sm">
          Описание
        </h4>
        <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
          {data.description_ru}
        </p>
      </div>
      <div className="flex flex-wrap gap-1 sm:gap-2 mt-3 sm:mt-4">
        {data.skills.map((skill) => (
          <span
            className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 sm:px-2.5 rounded"
            key={skill.id}
          >
            {skill.name_ru}
          </span>
        ))}
      </div>
    </div>
  );
}
