import { useTranslation } from "@/app/i18n";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { couldStartTrivia } from "typescript";

const CountDown = ({date, translate} : any) => {

    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
 
    useEffect( () => {
        let targetDate = moment(date);
        let todayDate = moment();
        let interval: any = null;

        if(targetDate.isAfter(todayDate)){
            interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = date.getTime() - now;
        
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
            setCountdown({ days, hours, minutes, seconds });
            }, 1000);
        }
      
        return () => clearInterval(interval);
        
    }, [date])

    return (
        <div className="w-full flex justify-center py-8 px-9">
            <div className="grid grid-flow-col gap-10 text-center auto-cols-max">
                <div className="flex flex-col">
                    <span className="countdown lg:text-7xl text-4xl">
                    <span style={{"--value": countdown.days} as React.CSSProperties}>
                        { countdown.days }
                    </span>
                    </span>
                    { translate('days') }
                </div> 
                <div className="flex flex-col">
                    <span className="countdown lg:text-7xl text-4xl">
                    <span style={{"--value": countdown.hours} as React.CSSProperties}>
                        { countdown.hours }
                    </span>
                    </span>
                    { translate('hours') }
                </div> 
                <div className="flex flex-col">
                    <span className="countdown lg:text-7xl text-4xl">
                    <span style={{"--value": countdown.minutes} as React.CSSProperties}>
                        { countdown.minutes }
                    </span>
                    </span>
                    { translate('min') }
                </div> 
                <div className="flex flex-col">
                    <span className="countdown lg:text-7xl text-4xl">
                    <span style={{"--value": countdown.seconds} as React.CSSProperties}>
                        { countdown.seconds }
                    </span>
                    </span>
                    { translate('sec') }
                </div>
            </div>
        </div>
    )
}

CountDown.prototype = {
    date: Date
}

export default CountDown;