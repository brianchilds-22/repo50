import React, { useState, useEffect, useRef } from "react";

const Stopwatch = () => {
  // State variables to manage stopwatch functionality
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  // Effect to start or stop the stopwatch based on isRunning changes
  useEffect(() => {
    if (isRunning) {
      // If stopwatch is running, start the interval to update elapsed time
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }
    // Clean-up function to clear interval when component unmounts or isRunning changes
    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  // Function to start the stopwatch
  function start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
    // console.log(startTimeRef);
  }
  // Function to stop the stopwatch
  function stop() {
    setIsRunning(false);
  }
  // Function to reset the stopwatch
  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
  }
  // Function to format the elapsed time in hours, minutes, seconds, and milliseconds
  function formatTime() {
    // let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);
    // Pad single digit minutes, seconds, and milliseconds with leading zeros
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    return `${minutes}:${seconds}:${milliseconds}`;
  }

  // JSX for stopwatch display and control buttons
  return (
    <div className="stopwatch">
      <div className="display">{formatTime()}</div>
      <div className="controls">
        <button onClick={start} className="start-button">
          Start
        </button>
        <button onClick={stop} className="stop-button">
          Stop
        </button>
        <button onClick={reset} className="reset-button">
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
