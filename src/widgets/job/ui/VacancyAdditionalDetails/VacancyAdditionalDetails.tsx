import { useLanguage } from '@/core/providers/I18nextProvider/LanguageContext/LanguageContext';
import { IJobModel } from '@/entities/job/api';
import { useScopedI18n } from '@/shared/config';
import { Badge } from '@/shared/ui/badge';

type TProps = {
  data: IJobModel;
};

export function VacancyAdditionalDetails(props: TProps) {
  const { data } = props;
  const { language } = useLanguage();
  const t = useScopedI18n('base.vacancy_additional_details');

  const workFormat = data.work_format[`name_${language}` as keyof typeof data.work_format];
  const workExperience = data.work_experience[`name_${language}` as keyof typeof data.work_experience];
  const workDirection = data.work_direction[`name_${language}` as keyof typeof data.work_direction];
  const subWorkDirection = data.sub_work_direction[`name_${language}` as keyof typeof data.sub_work_direction];

  return (
    <div className="lg:w-1/3">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">{t('work_format')}</h3>
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-blue-500 text-white">{workFormat}</Badge>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">{t('work_experience')}</h3>
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-blue-500 text-white">{workExperience}</Badge>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">{t('work_direction')}</h3>
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-blue-500 text-white">{workDirection}</Badge>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">{t('sub_work_direction')}</h3>
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-blue-500 text-white">{subWorkDirection}</Badge>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">{t('job_search_status')}</h3>
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-blue-500 text-white">{data.job_search_status.name}</Badge>
        </div>
      </div>
      {data.skills.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{t('skills')}</h3>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <Badge className="bg-blue-500 text-white" key={skill.id}>
                {skill[`name_${language}` as keyof typeof skill]}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
