import { useState } from "react";
import { FaShoppingCart, FaBolt, FaMoneyBill, FaTrash, FaEdit } from "react-icons/fa"

function TransactionTable({ role, transactions, categoryFilter, deleteTransaction, editTransaction, setConfirmDelete, setShowModal }) {

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all")

    const getIcon = (category) => {
        if (category === "Food")
            return <FaShoppingCart className="text-orange-500" />
        if (category === "Bills" || category === "Utilities")
            return <FaBolt className="text-yellow-500" />
        if (category === "Income" || category === "Salary" || category === "Freelance")
            return <FaMoneyBill className="text-[var(--teal-accent)]" />
        if (category === "Investment")
            return <FaMoneyBill className="text-indigo-500" />
        if (category === "Rent")
            return <FaMoneyBill className="text-rose-500" />
        return <FaShoppingCart />
    }

    return (
        <div className="glass-card p-8 rounded-[2.5rem] transition-all duration-500 border border-[var(--border-main)]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
                <div>
                    <h2 className="text-3xl font-black text-[var(--text-main)] tracking-tight">Ledger Records</h2>
                    <p className="text-[var(--text-muted)] text-[10px] font-black uppercase tracking-[0.2em] mt-1">Real-time Transaction Stream</p>
                </div>
                
                <div className="flex gap-4 w-full md:w-auto">
                    <button 
                         onClick={() => setShowModal(true)}
                         className="flex-1 md:flex-none bg-[var(--teal-accent)] text-black px-6 py-3 rounded-2xl font-black text-xs hover:opacity-90 transition-all active-press shadow-lg shadow-[var(--teal-accent)]/20"
                    >
                        Log Capital
                    </button>
                    <div className="flex-1 md:flex-none bg-[var(--bg-glass)] border border-[var(--border-main)] px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] flex items-center justify-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[var(--teal-accent)] rounded-full animate-pulse"></span>
                        {categoryFilter || 'Global Scope'}
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex gap-2 bg-[var(--bg-glass)] p-1.5 rounded-2xl border border-[var(--border-main)]">
                    {["all", "income", "expense"].map((t) => (
                        <button
                            key={t}
                            onClick={() => setFilter(t)}
                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === t
                                ? "bg-[var(--teal-accent)] text-black shadow-lg"
                                : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                            }`}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                <div className="relative flex-1 group">
                    <input
                        type="text"
                        placeholder="Filter through records..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full p-4 pl-6 rounded-2xl bg-[var(--bg-glass)] border border-[var(--border-main)] text-[var(--text-main)] focus:outline-none focus:border-[var(--teal-accent)] focus:bg-[var(--bg-secondary)] transition-all font-medium placeholder:text-[var(--text-dim)]"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-100 transition-opacity">🔍</div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="text-[var(--text-dim)] text-left text-[10px] font-black uppercase tracking-[0.2em] border-b border-[var(--border-main)]">
                        <tr>
                            <th className="pb-4 px-2">Description</th>
                            <th className="pb-4 px-2">Date</th>
                            <th className="pb-4 px-2">Category</th>
                            <th className="pb-4 px-2 text-right">Value</th>
                            <th className="pb-4 px-2 text-center">Status</th>
                            <th className="pb-4 px-2 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-[var(--border-main)]/50">
                        {transactions
                            .filter(item =>
                                categoryFilter ? item.category === categoryFilter : true &&
                                    item.name.toLowerCase().includes(search.toLowerCase())
                            )
                            .filter(item =>
                                filter === "all" ? true : item.type === filter
                            )
                            .map((item) => (
                                <tr key={item.id} className="group hover:bg-[var(--bg-glass)] transition-colors">
                                    <td className="py-5 px-2">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-[var(--bg-glass)] rounded-xl flex items-center justify-center border border-[var(--border-main)] transition-transform group-hover:scale-110">
                                                {getIcon(item.category)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-[var(--text-main)] tracking-tight">{item.name}</p>
                                                <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">{item.category}</p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="py-5 px-2 text-[var(--text-muted)] text-sm font-medium">
                                        {item.date}
                                    </td>

                                    <td className="py-5 px-2">
                                        <span className="bg-[var(--bg-glass)] text-[var(--text-muted)] border border-[var(--border-main)] px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                                            {item.category}
                                        </span>
                                    </td>

                                    <td className={`py-5 px-2 text-right font-black tracking-tight text-lg ${item.type === "income"
                                        ? "text-[var(--teal-accent)]"
                                        : "text-rose-500"
                                        }`}>
                                        {item.type === "income" ? "+" : "-"}
                                        ₹{Number(item.amount).toLocaleString()}
                                    </td>

                                    <td className="py-5 px-2 text-center">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${item.status === "Completed"
                                            ? "bg-[var(--teal-accent)]/10 text-[var(--teal-accent)] border-[var(--teal-accent)]/20"
                                            : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                                            }`}>
                                            {item.status}
                                        </span>
                                    </td>

                                    <td className="py-5 px-2 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => editTransaction(item)}
                                                className="p-2 hover:bg-[var(--bg-secondary)] rounded-xl text-[var(--text-muted)] hover:text-[var(--teal-accent)] transition-all"
                                            >
                                                <FaEdit size={16} />
                                            </button>
                                            <button
                                                onClick={() => setConfirmDelete(item.id)}
                                                className="p-2 hover:bg-rose-500/10 rounded-xl text-[var(--text-muted)] hover:text-rose-500 transition-all"
                                            >
                                                <FaTrash size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                        {transactions.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center py-12 text-[var(--text-muted)] font-bold italic">
                                    No records found in the current scope 🔍
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TransactionTable;