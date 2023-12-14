"use client"

import React, { useState, useRef } from 'react';


export default function StopWatch(){

    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [milliseconds, setMilliseconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [timestamps, setTimestamps] = useState([]);
    const timerRef = useRef(null);
    const startTimeRef = useRef(null);

    const startStopwatch = () => {
        if (!isRunning) {
          startTimeRef.current = Date.now() - milliseconds;
          timerRef.current = setInterval(updateStopwatch, 10);
          setIsRunning(true);
        }
      };

      const updateStopwatch = () => {
        const currentTime = Date.now();
        const runningTime = currentTime - startTimeRef.current;
        calculateTime(runningTime);
      };

      const calculateTime = (runningTime) => {
        let hours = Math.floor((runningTime / (1000 * 60 * 60)) % 24);
        let minutes = Math.floor((runningTime / (1000 * 60)) % 60);
        let seconds = Math.floor((runningTime / 1000) % 60);
        let milliseconds = Math.floor((runningTime % 1000) / 10);
    
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
        setMilliseconds(milliseconds);
      };

      const stopStopwatch = () => {
        clearInterval(timerRef.current);
        setIsRunning(false);
        if (milliseconds !== 0) {
          const timestamp = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
          setTimestamps([...timestamps, timestamp]);
        }
      };

      const resetStopwatch = () => {
        clearInterval(timerRef.current);
        setIsRunning(false);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        setMilliseconds(0);
        setTimestamps([]);
      };


    return(
        <main className='bg-slate-400 w-96'>
            <div className='flex flex-col items-center justify-center shadow-sm shadow-black'>
                <div className='bg-black text-blue-600 font-bold mt-6 flex items-center justify-center w-80 text-4xl p-6 m-2'>
                    {`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`}
                </div>
                <div className='flex flex-row mt-2 gap-4 mb-6'>
                    <div className='flex flex-col gap-8'>
                        <button 
                        className='flex bg-blue-400 items-center justify-center text-4xl py-4 px-8 text-white shadow-sm shadow-black'
                        onClick={startStopwatch}>Tap</button>
                        <button 
                        className='flex bg-pink-300 items-center justify-center text-4xl py-4 px-8 text-white shadow-sm shadow-black'
                        onClick={stopStopwatch}>Stop</button>
                        <button 
                        className='flex bg-yellow-200 items-center justify-center text-4xl py-4 px-8 text-white shadow-sm shadow-black'
                        onClick={resetStopwatch}>Reset</button>
                    </div>
                    <div>
                        <ol>
                            {timestamps.map((timestamp, index) => (
                            <li key={index}>{index+1}. {timestamp}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </main>
    )
}