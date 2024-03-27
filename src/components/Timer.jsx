import React, { useEffect, useState, useRef } from 'react'


function Timer( {duration, onTimeUp}) {

  const [counter, setCounter] = useState(0)
  const [progressLoading, setProgressLoading] = useState(0);
  const intervalref = useRef()

  useEffect(() => {
    intervalref.current = setInterval(() => {
      setCounter((cur) => cur + 1)
    }, 1000);

    return () => {
      clearInterval(intervalref.current)
    }
  }, []);

  useEffect(() => {
    setProgressLoading(100 * (counter / duration));

    if (counter === duration) {
      clearInterval(intervalref.current);

      setTimeout(() => {
        onTimeUp();
      }, 1000);
    }
  },[counter])

  return (
    <div className="timer-container">
      <div className='progress'
      style={{
        width: `${progressLoading}%`,
        backgroundColor: `${
          progressLoading <40 ? "green" : progressLoading < 70 ? "yellow" : "red"
        }`
      }}>
      </div>
    </div>
  )
}

export default Timer