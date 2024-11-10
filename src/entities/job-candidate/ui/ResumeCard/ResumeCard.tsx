'use client';

import { useLanguage } from '@/core/providers/I18nextProvider/LanguageContext/LanguageContext';
import { CompareJobCandidate } from '@/features/job/ui';
import { IJobCandidateModel } from '@/entities/job-candidate/api';
import { useScopedI18n } from '@/shared/config';

type TProps = {
  data: IJobCandidateModel;
  inVacancy?: boolean;
  jobId?: number;
};

export function ResumeCard(props: TProps) {
  const { data, inVacancy, jobId } = props;
  const { language } = useLanguage();
  const t = useScopedI18n('base.resume_card');

  const workDirection = data.work_direction ? data.work_direction[`name_${language}` as keyof typeof data.work_direction] : null;
  const subWorkDirection = data.sub_work_directions ? data.sub_work_directions[`name_${language}` as keyof typeof data.sub_work_directions] : null;
  const cities = data.cities.map((city) => city[`name_${language}` as keyof typeof city]).join(', ');
  const skills = data.skills.map((skill) => skill[`name_${language}` as keyof typeof skill]);

  return (
    <div className="p-4 bg-white border rounded-lg shadow-sm flex flex-col gap-4 hover:shadow-lg transition-shadow duration-200 ease-in-out cursor-pointer">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          {data.full_name || t('no_name')}
        </h3>
        {data.email && <p className="text-sm text-gray-600">{t('email')}: {data.email}</p>}
        {data.phone_number && <p className="text-sm text-gray-600">{t('phone')}: {data.phone_number}</p>}
      </div>

      <div className="text-gray-500 text-sm space-y-1">
        {workDirection && <p>{t('work_direction')}: {workDirection}</p>}
        {subWorkDirection && <p>{t('sub_work_direction')}: {subWorkDirection}</p>}
      </div>

      {data.cities.length > 0 && (
        <div className="text-gray-500 text-sm">
          <p>{t('cities')}: {cities}</p>
        </div>
      )}

      {data.skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {skills.map((skill, index) => (
            <span
              className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
              key={data.skills[index].id}
            >
              {skill}
            </span>
          ))}
        </div>
      )}
      {inVacancy && <CompareJobCandidate job_candidate_id={data.id} job_id={jobId!} />}

      {data.cv_file && (
        <div className="mt-3">
          <a
            className="bg-green-500 text-white text-sm font-medium px-4 py-2 rounded hover:bg-green-700 transition-colors duration-200 inline-block text-center mt-auto"
            rel="noopener noreferrer"
            href={data.cv_file}
            target="_blank"
          >
            {t('open_resume')}
          </a>
        </div>
      )}
    </div>
  );
}
