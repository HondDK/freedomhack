import { TCompareJobCandidateReqDto } from '@/entities/company/api';
import { useCompareJobCandidate } from '@/entities/company/hooks/useCompareJobCandidate';
import { Button } from '@/shared/ui/button';

type TProps = TCompareJobCandidateReqDto;

export function CompareJobCandidate(props: TProps) {
  const { job_id, job_candidate_id } = props;
  const { mutate, data } = useCompareJobCandidate();

  const handleClick = () => {
    mutate({
      job_id,
      job_candidate_id,
    });
  };

  return (
    data ? (
      <div>{data.similarity}% совместимость</div>
    ) : (
      <Button onClick={handleClick} variant="outline" size="sm">
        Сравнить совместимость
      </Button>
    )
  );
}
