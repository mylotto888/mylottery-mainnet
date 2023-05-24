'use client';

import MintBox from "@/components/MintBox";
import Footer from "@/components/layouts/Footer";
import NavBar from "@/components/layouts/NavBar";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import dynamic from "next/dynamic";


const WalletProvider = dynamic(() => import("@/components/WalletProvider"), {
    ssr: false,
  })
  

const Mint = () => {
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
                    rightButton={connectButton}
                />
                <div className="">
                    <MintBox />
                </div>
                <Footer />
            </div>
        </WalletProvider>
    )
}


export default Mint;