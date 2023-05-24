import Link from "next/link";

const Mint = ({ transalte } : any) => {
    return  (
        <div className="flex flex-col lg:text-base justify-center text-sm text-center py-4 gap-5 text-gray-800 tracking-wider mb-14">
            <p>
            <a href="#" className="text-red-500 hover:text-red-600 leading-9">1.5 $SOL</a> { transalte('grand-price-info') } <br/>
            { transalte('the-last-chance') }
            </p>
            <div>
                <Link href={"/mint"} className="btn bg-red-500 text-white hover:bg-red-600 border-none">
                    Mint Now
                </Link>
            </div>
            <div className="w-1/2 leading-7 self-center">
            { transalte('winning-time') }
            </div>

            {/* <hr class="h-1 rounded-full bg-gradient-to-r from-red-500 to-pink-500 animate-pulse" /> */}
            
        </div>
    )
}

export default Mint;