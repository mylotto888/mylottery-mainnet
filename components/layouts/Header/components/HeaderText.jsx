import { useTranslation } from "@/app/i18n";
import { useEffect, useState } from "react";
import defaultLanguage from '@/app/i18n/locales/en/client-page.json';


const HeaderText = ({ translate }) => {
    
    return (
        <div className="flex flex-col text-center gap-8 py-10">;
            <span className="lg:text-2xl text-xl uppercase text-gray-800">{ translate('very-first') }</span>
            <span className="lg:text-8xl text-5xl uppercase text-gray-900">{ translate('nft-lottery')}</span>
            <span className="text-2xl uppercase text-gray-800">{ translate('for-myanmar') }</span>
            <span className="lg:text-lg text-base px-4 tracking-wider text-gray-800">
                { translate('how-this-build') } <br/>
                { translate('purpose-note') }
            </span>
        </div>
    )
}

export default HeaderText;