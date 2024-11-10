'use client';

import { useRouter } from 'next/navigation';
import { useLanguage } from '@/core/providers/I18nextProvider/LanguageContext/LanguageContext';
import { IJobModel } from '@/entities/job/api';

type LanguageKey = 'kz' | 'ru' | 'en';

type TProps = {
  data: IJobModel;
};

export function JobCard(props: TProps) {
  const { data } = props;
  const router = useRouter();
  const { language } = useLanguage(); // Get the current language

  const handleClickOnCard = () => {
    router.push(`/vacancy/${data.id}`);
  };

  // Access language-specific fields dynamically using the current language
  const city = data.city[`name_${language as LanguageKey}`];
  const workFormat = data.work_format[`name_${language as LanguageKey}`];
  const workExperience = data.work_experience[`name_${language as LanguageKey}`];
  const description = data[`description_${language as LanguageKey}`];
  const jobTitle = data[`name_${language as LanguageKey}`];

  return (
    <div
      className="p-3 sm:p-4 bg-white border rounded-lg shadow-md flex flex-col gap-3 sm:gap-4 mt-3 mb-3 hover:cursor-pointer"
      onClick={handleClickOnCard}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <div>
          <p className="text-gray-600 text-xs sm:text-sm">{data.company.name}</p>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">
            {jobTitle}
          </h3>
        </div>
      </div>
      <div>
        <p className="text-gray-500 text-xs sm:text-sm">
          Город: {city}
        </p>
        <p className="text-gray-500 text-xs sm:text-sm">
          Формат работы: {workFormat}
        </p>
        <p className="text-gray-500 text-xs sm:text-sm">
          Опыт: {workExperience}
        </p>
      </div>
      <div>
        <h4 className="text-gray-800 font-medium text-xs sm:text-sm">
          Описание
        </h4>
        <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
          {description}
        </p>
      </div>
      <div className="flex flex-wrap gap-1 sm:gap-2 mt-3 sm:mt-4">
        {data.skills.map((skill) => (
          <span
            className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 sm:px-2.5 rounded"
            key={skill.id}
          >
            {skill[`name_${language as LanguageKey}`]}
          </span>
        ))}
      </div>
    </div>
  );
}
