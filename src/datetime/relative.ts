import RelativeTime from '@yaireo/relative-time';

const CALCULATOR = new RelativeTime();

// We inject the calculator for easy mocking/testing
export function relativeFn(calculator = CALCULATOR) {
  return (targetDateString: Date): string => {
    const targetDate = new Date(targetDateString);
    return calculator.from(targetDate);
  };
}

// default export is the default relativeFn
const relative = relativeFn();
export default relative;
