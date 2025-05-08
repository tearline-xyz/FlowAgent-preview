
import './index.css'

interface SpinnerProps {
  size?: number;
  color?: string;
}

export default function Spinner({ size = 16, color = 'black' }: SpinnerProps) {
  return (
    <svg
      className={'spinnerRoot'}
      width={16}
      height={16}
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.08144 1.53873C2.93755 2.07214 2.01192 2.98273 1.45986 4.11774C0.907802 5.25274 0.762909 6.54309 1.04949 7.77226C1.33608 9.00144 2.0367 10.0946 3.0338 10.8685C4.0309 11.6423 5.2638 12.0496 6.52565 12.0221C7.78749 11.9946 9.00148 11.534 9.96393 10.7175C10.9264 9.90095 11.5787 8.77826 11.8115 7.53777C12.0443 6.29727 11.8433 5.01447 11.2423 3.90459C10.6414 2.79471 9.67694 1.92529 8.51091 1.44222"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="square"
      />
    </svg>
  );
}
