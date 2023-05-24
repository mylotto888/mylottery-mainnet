//import Head from "next/head"
//import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useEffect, useState } from "react"
import {
  CandyMachine,
  Metaplex,
  Nft,
  NftWithToken,
  PublicKey,
  Sft,
  SftWithToken,
  walletAdapterIdentity,
} from "@metaplex-foundation/js"
import { Keypair, Transaction } from "@solana/web3.js"

import {
  getRemainingAccountsForCandyGuard,
  mintV2Instruction,
} from "@/utils/mintV2"
import { fromTxError } from "@/utils/errors"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';



export default function Home() {
  const wallet = useWallet()
  const { publicKey } = wallet
  // console.log(publicKey)
  const { connection } = useConnection()
  const [metaplex, setMetaplex] = useState<Metaplex | null>(null)
  const [candyMachine, setCandyMachine] = useState<CandyMachine | null>(null)
  const [collection, setCollection] = useState<
    Sft | SftWithToken | Nft | NftWithToken | null
  >(null)
  const [formMessage, setFormMessage] = useState<string | null>(null)
  const [mintCount, setMintCount] = useState(1);

  useEffect(() => {
    ;(async () => {
      if (wallet && connection && !collection && !candyMachine) {
        if (!process.env.NEXT_PUBLIC_CANDY_MACHINE_ID) {
          throw new Error("Please provide a candy machine id")
        }
        const metaplex = new Metaplex(connection).use(
          walletAdapterIdentity(wallet)
        )
        setMetaplex(metaplex)

        const candyMachine = await metaplex.candyMachines().findByAddress({
          address: new PublicKey(process.env.NEXT_PUBLIC_CANDY_MACHINE_ID),
        })

        setCandyMachine(candyMachine)

        const collection = await metaplex
          .nfts()
          .findByMint({ mintAddress: candyMachine.collectionMintAddress })

        setCollection(collection)

      }
    })()
  }, [wallet, connection])

  function updateAmount(qty: number) {
    setMintCount(qty);
  }

  function increaseValue(){
    var numericField = document.querySelector(".mint-qty") as HTMLInputElement;
    if (numericField) {
      var value = parseInt(numericField.value);
      if(!isNaN(value) && value < 10) {
        value++;
        numericField.value = "" + value;
        updateAmount(value);
      }
    }
  }

  function decreaseValue(){
    var numericField = document.querySelector(".mint-qty") as HTMLInputElement;
    if (numericField) {
      var value = parseInt(numericField.value);
      if(!isNaN(value) && value > 1) {
        value--;
        numericField.value = "" + value;
        updateAmount(value);
      }
    }
  }

  function UpdateMintCount(target: any){
    var value = parseInt(target.value);
    if(!isNaN(value)){
      if(value > 10) {
        value = 10;
        target.value = "" + value;
      }
      else if (value < 1){
        value = 1;
        target.value = "" + value;
      }
      updateAmount(value);
    }
  }

  /** Mints NFTs through a Candy Machine using Candy Guards */
  const handleMintV2 = async () => {
    if (!metaplex || !candyMachine || !publicKey || !candyMachine.candyGuard) {
      if (!candyMachine?.candyGuard)
        throw new Error(
          "This app only works with Candy Guards. Please setup your Guards through Sugar."
        )

      throw new Error(
        "Couldn't find the Candy Machine or the connection is not defined."
      )
    }

    try {
      const { remainingAccounts, additionalIxs } =
        getRemainingAccountsForCandyGuard(candyMachine, publicKey)

      const mint = Keypair.generate()
      const { instructions } = await mintV2Instruction(
        candyMachine.candyGuard?.address,
        candyMachine.address,
        publicKey,
        publicKey,
        mint,
        connection,
        metaplex,
        remainingAccounts
      )
      const tx = new Transaction()

      if (additionalIxs?.length) {
        tx.add(...additionalIxs)
      }

      tx.add(...instructions)

      tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash

      const txid = await wallet.sendTransaction(tx, connection, {
        signers: [mint],
      })

      const latest = await connection.getLatestBlockhash()
      await connection.confirmTransaction({
        blockhash: latest.blockhash,
        lastValidBlockHeight: latest.lastValidBlockHeight,
        signature: txid,
      }).then( res => {
          toast.success('Mint Successful!', {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
      })
    } catch (e) {
      const msg = fromTxError(e)

      if (msg) {
        toast.warn(msg.message, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  }

  const cost = candyMachine
    ? candyMachine.candyGuard?.guards.solPayment
      ? Number(candyMachine.candyGuard?.guards.solPayment?.amount.basisPoints) /
          1e9 +
        " ◎"
      : "Free"
    : "..."

  return (
    <>
      <ToastContainer />
      <div className="text-gray-900 h-full flex justify-center p-5">
            <div className="card w-lg-[30%] w-sm-[10%] rounded-md bg-white shadow-lg">
                <figure className="flex items-center justify-center h-full p-2 border-2 border-red-500 bg-white">
                    <img style={{ width : '200px'}} src={collection?.json?.image} className="boarder border-red-500 w-20" alt="MyLottery" />
                </figure>
                <div className="card-body flex justify-center gap-8">
                    <div className="flex px-5 gap-10">
                        <div className="flex flex-col tracking-wider gap-1">
                            <span className="text-gray-400">Remaining</span>
                            <span className="">{candyMachine?.itemsRemaining.toNumber()}</span>
                        </div>
                        <div className="flex flex-col tracking-wider gap-1">
                            <span className="text-gray-400">Price</span>
                            <span>{cost}</span>
                        </div>
                        <div className="py-2 flex item-center">
                            <button className="btn btn-sm bg-white border-none hover:bg-gray-300">
                                <span className="text-red-500 animate-pulse">LIVE</span>
                            </button>
                        </div>
                    </div>
                    <div className="w-full flex justify-center">
                    <button onClick={() => decreaseValue()} className="px-3 rounded-lg text-white bg-red-500 hover:bg-red-600 border-none">-</button>
                    <input className="mint-qty text-center w-10" onChange={(e) => UpdateMintCount(e.target as any)} value={mintCount}></input>
                    <button onClick={() => increaseValue()} className="px-3 rounded-lg text-white bg-red-500 hover:bg-red-600 border-none">+</button>
                    </div>
                    <div className="w-full flex justify-center">
                        <button disabled={!publicKey} onClick={handleMintV2} className="btn btn-block text-white bg-red-500 hover:bg-red-600 border-none">mint</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
