'use client';

import { useTranslation } from "@/app/i18n";
import MintBox from "@/components/MintBox";
import Footer from "@/components/layouts/Footer";
import NavBar from "@/components/layouts/NavBar";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import dynamic from "next/dynamic";
import { useEffect } from "react";


const WalletProvider = dynamic(() => import("@/components/WalletProvider"), {
    ssr: false,
  })
  

export default async function Mint (params : any) {
    

    const lng = params?.params?.lng || 'en'
    let { t } = await useTranslation( lng, 'client-page');
    
    const BgStyle = {
        backgroundImage: 'url(/images/bg.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        // height: '100%',
        backgroundPosition: 'center',
    };

    const connectButton = (
        <WalletMultiButton
            className="btn"
            style={{
                height: "auto",
                marginTop: "8px",
                justifyContent: "center",
                fontSize: "13px",
                backgroundColor: "#ff003c",
                lineHeight: "1.7",
                borderRadius: "20px",
            }}
        />
    )


    return (
        <WalletProvider>
            <div style={BgStyle} className="bg-white h-screen">
                <NavBar 
                    lng={lng}
                    rightButton={connectButton}
                />
                <div className="">
                    <MintBox translate={t} />
                </div>
                <Footer />
            </div>
        </WalletProvider>
    )
}

