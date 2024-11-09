import { CountryFilters } from '@/features/location/ui';
import { SkillFilters } from '@/features/skill/ui';
import { DirectionFilters } from '@/features/work/direction/ui/DirectionFilters';
import { ExperienceFilters } from '@/features/work/experience/ui';
import { FormatFilters } from '@/features/work/format/ui';
import { TGetJobsReqDto } from '@/entities/job/api';

type TProps = {
  setFilters: (filters: TGetJobsReqDto) => void;
}

export function FiltrationJobs(props: TProps){
  const { setFilters } = props

  return <>
    <CountryFilters setFilters={setFilters}/>
    <ExperienceFilters setFilters={setFilters}/>
    <FormatFilters setFilters={setFilters}/>
    <DirectionFilters setFilters={setFilters}/>
    <SkillFilters setFilters={setFilters}/>
  </>
}