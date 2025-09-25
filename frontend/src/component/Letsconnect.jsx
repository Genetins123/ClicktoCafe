import banner2 from '../assets/banner2.jpg'
import { ArrowRight } from "lucide-react";



function Letsconnet() {
    return (
        <>
            <section className="bg-gradient-to-r from-brown-600 to-brown-800 py-10 px-4 text-white relative">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40"
                    style={{ backgroundImage: `url(${banner2})` }}
                ></div>

                <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center relative gap-6">
                    {/* Left Text */}
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Lets Connect !</h2>
                        <p className="text-sm sm:text-md">Stay up to date with restaurants around you.</p>
                        <p className="text-xs sm:text-sm text-gray-300">Subscribe with email.</p>
                    </div>

                    {/* Email Input */}
                    <div className="flex items-center bg-[#1e1e1e] rounded-xl p-1 w-full sm:w-[400px]">
                        <input
                            type="email"
                            placeholder="Your Email Address"
                            className="flex-1 bg-transparent text-gray-300 placeholder-gray-400 outline-none px-3 py-2 text-sm sm:text-base"
                        />
                        <button className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg p-3 flex items-center justify-center shadow-md hover:opacity-90 transition">
                            <ArrowRight className="text-black w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                    </div>
                </div>
            </section>

        </>
    )

}
export default Letsconnet
