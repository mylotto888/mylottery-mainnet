import { useEffect, useState } from "react";

const CountDown = ({date}) => {

    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });


    useEffect( () => {

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = date.getTime() - now;
      
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
            setCountdown({ days, hours, minutes, seconds });
          }, 1000);
      
        return () => clearInterval(interval);
        
    }, [date])

    return (
        <div className="w-screen flex justify-center py-8 px-9">
            <div className="grid grid-flow-col gap-10 text-center auto-cols-max">
                <div className="flex flex-col">
                    <span className="countdown font-mono lg:text-7xl text-4xl">
                    <span style={{"--value": countdown.days}}></span>
                    </span>
                    days
                </div> 
                <div className="flex flex-col">
                    <span className="countdown font-mono lg:text-7xl text-4xl">
                    <span style={{"--value": countdown.hours}}></span>
                    </span>
                    hours
                </div> 
                <div className="flex flex-col">
                    <span className="countdown font-mono lg:text-7xl text-4xl">
                    <span style={{"--value": countdown.minutes}}></span>
                    </span>
                    min
                </div> 
                <div className="flex flex-col">
                    <span className="countdown font-mono lg:text-7xl text-4xl">
                    <span style={{"--value": countdown.seconds}}></span>
                    </span>
                    sec
                </div>
            </div>
        </div>
    )
}

export default CountDown;