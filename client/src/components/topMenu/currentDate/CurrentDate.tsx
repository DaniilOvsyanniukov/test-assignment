import { useEffect, useState } from 'react';

function CurrentDate() {
  const [currentDate, setCurrentDate] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
        <div>{currentDate.toLocaleString()}</div>
  );
}

export default CurrentDate;
