// import { FaWallet, FaArrowUp, FaArrowDown } from "react-icons/fa"



// function StatCard({ title, amount, change }) {

//     return (

//         <div className="bg-gradient-to-br from-[#111827] to-[#0B0F19] p-6 rounded-2xl border border-gray-800 hover:border-indigo-500 hover:shadow-lg hover:scale-105 transition-all duration-300">
//             <div className="flex justify-between items-center">
//                 <h3 className="text-gray-400 text-sm">
//                     {title}
//                 </h3>
//                 <FaWallet className="text-indigo-400" size={24} />
//             </div>

//             <h2 className="text-2xl font-bold mt-2 tracking-wide">
//                 {amount}
//             </h2>

//             <p className={`text-sm mt-2 ${change.includes("-")
//                 ? "text-red-400"
//                 : "text-green-400"
//                 }`}>
//                 {change}
//             </p>

//         </div>

//     )

// }

// export default StatCard;


import { FaWallet, FaArrowUp, FaArrowDown, FaPiggyBank } from "react-icons/fa"

function StatCard({ title, amount, change }) {

    const getIcon = () => {
        if (title === "Total Balance" || title === "Liquid Capital")
            return <FaWallet className="text-[var(--teal-accent)]" size={22} />

        if (title === "Incoming Flux" || title === "Income")
            return <FaArrowUp className="text-[var(--teal-accent)]" size={22} />

        if (title === "Total Expenses" || title === "Total Outflow")
            return <FaArrowDown className="text-red-500" size={22} />

        if (title === "Savings" || title === "Retained Assets")
            return <FaPiggyBank className="text-[var(--teal-accent)]" size={22} />

        return <FaWallet />
    }

    return (
        <div className="glass-card p-6 rounded-[2rem] hover-lift transition-all duration-500 flex flex-col justify-between group active-press">
            <div>
                <div className="flex justify-between items-center mb-6">
                    <div className="p-3 bg-[var(--bg-glass)] rounded-2xl border border-[var(--border-main)]">
                        {getIcon()}
                    </div>
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${change.includes("-")
                        ? "bg-red-500/10 text-red-500"
                        : "bg-[var(--teal-accent)]/10 text-[var(--teal-accent)]"
                    }`}>
                        {change}
                    </span>
                </div>

                <h3 className="text-[var(--text-muted)] text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                    {title}
                </h3>
                <h2 className="text-3xl font-black tracking-tighter text-[var(--text-main)]">
                    {amount}
                </h2>
            </div>
            
            <div className="mt-8 flex items-center gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--teal-accent)]"></div>
                <div className="w-12 h-1 rounded-full bg-[var(--border-main)]"></div>
            </div>
        </div>
    )
}

export default StatCard;