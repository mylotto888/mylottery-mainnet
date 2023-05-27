import moment from "moment-timezone";
import HeaderText from "./components/HeaderText";
import CountDown from "./components/countdown";

// const BG = require('/images/background.png')/

const headerBgStyle = {
    backgroundImage: 'url(/images/bg.png)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

const Header = ({ translate } : any) => {


    return (
        <div id="header" style={headerBgStyle} className="text-gray-800 max-w-full">
            <HeaderText translate={translate} />
            <CountDown
                translate={translate}
                date={moment('2023-05-22T06:30:30').tz('Asia/Yangon').toDate()}
            />
            <hr className="h-1 my-4 rounded-full bg-gradient-to-r from-red-500 to-pink-500 animate-pulse" />
        </div>
    )
}

export default Header;