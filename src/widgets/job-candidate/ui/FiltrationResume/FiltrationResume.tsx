import { CountryFilters } from '@/features/location/ui';
import { SkillFilters } from '@/features/skill/ui';
import { DirectionFilters } from '@/features/work/direction/ui/DirectionFilters';
import { ExperienceFilters } from '@/features/work/experience/ui';
import { FormatFilters } from '@/features/work/format/ui';
import { TGetJobCandidatesReqDto } from '@/entities/job-candidate/api';

type TProps = {
  setFilters: (filters: TGetJobCandidatesReqDto) => void;
}

export function FiltrationResume(props: TProps){
  const { setFilters } = props

  return <>
    <CountryFilters setFilters={setFilters}/>
    <ExperienceFilters setFilters={setFilters}/>
    <FormatFilters setFilters={setFilters}/>
    <DirectionFilters setFilters={setFilters}/>
    <SkillFilters setFilters={setFilters}/>
  </>
}