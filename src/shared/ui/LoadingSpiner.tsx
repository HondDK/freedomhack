import { cn } from '@/shared/lib/utils';

export interface ISVGProps extends React.SVGProps<SVGSVGElement> {
	className?: string;
	size?: number;
}

export const LoadingSpinner = ({
	                               size = 24,
	                               className,
	                               ...props
}: ISVGProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      width={size}
      {...props}
      className={cn('animate-spin', className)}
      strokeLinejoin="round"
      stroke="currentColor"
      strokeLinecap="round"
      viewBox="0 0 24 24"
      strokeWidth="2"
      fill="none"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
};