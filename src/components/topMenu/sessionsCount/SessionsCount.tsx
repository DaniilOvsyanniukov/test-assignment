import { useEffect, useState } from 'react';
import io from 'socket.io-client';

function SessionCount() {
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_SERVER_URL as string);
    socket.on('sessionCount', (count) => {
      setSessionCount(count);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
        <div>
          Sessions:
          {sessionCount}
        </div>
  );
}

export default SessionCount;
