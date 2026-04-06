import { FaChartBar, FaArrowUp, FaArrowDown, FaRegLightbulb } from "react-icons/fa"
import { useMemo } from "react";

function Insights({ transactions = [] }) {

    const insightsData = useMemo(() => {
        const expenses = transactions.filter(t => t.type === 'expense');
        const totalExpense = expenses.reduce((sum, t) => sum + parseFloat(t.amount), 0);

        const categoryMap = {};
        expenses.forEach(t => {
            categoryMap[t.category] = (categoryMap[t.category] || 0) + parseFloat(t.amount);
        });

        const sorted = Object.keys(categoryMap).map(cat => ({
            name: cat,
            amount: categoryMap[cat],
            progress: totalExpense > 0 ? Math.round((categoryMap[cat] / totalExpense) * 100) : 0
        })).sort((a, b) => b.amount - a.amount).slice(0, 8);

        return {
            categories: sorted,
            totalExpense
        };
    }, [transactions]);

    return (
        <div className="glass-card p-10 rounded-[3rem] border border-[var(--border-main)] sticky top-8 transition-all duration-700">
            <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-[var(--teal-accent)]/10 rounded-2xl flex items-center justify-center border border-[var(--teal-accent)]/20 shadow-xl shadow-[var(--teal-accent)]/5">
                    <FaRegLightbulb className="text-[var(--teal-accent)] text-xl" />
                </div>
                <div>
                    <h3 className="text-2xl font-black text-[var(--text-main)] tracking-tight">Finance Summary</h3>
                    <p className="text-[var(--text-muted)] text-[10px] font-black uppercase tracking-[0.2em] mt-1">Real-time Attribution</p>
                </div>
            </div>

            <div className="space-y-8">
                {insightsData.categories.length > 0 ? (
                    insightsData.categories.map((item, index) => (
                        <div key={index} className="group cursor-default">
                            <div className="flex justify-between items-end mb-3 px-1">
                                <div>
                                    <p className="text-[var(--text-muted)] text-[10px] font-black uppercase tracking-[0.2em] mb-1 group-hover:text-[var(--teal-accent)] transition-colors">
                                        {item.name}
                                    </p>
                                    <h4 className="text-[var(--text-main)] text-sm font-black tracking-tight flex items-center gap-2">
                                        ₹{Math.round(item.amount).toLocaleString()}
                                        <span className="text-[10px] text-[var(--teal-accent)] opacity-60">
                                            {item.progress}%
                                        </span>
                                    </h4>
                                </div>
                                <div className={`text-[10px] font-black px-3 py-1 rounded-full ${index < 3
                                    ? "bg-rose-500/10 text-rose-500"
                                    : "bg-teal-500/10 text-teal-500"}`}>
                                    {index < 3 ? "HIGH" : "NORMAL"}
                                </div>
                            </div>
                            <div className="h-2 w-full bg-[var(--bg-glass)] rounded-full overflow-hidden border border-[var(--border-main)]/30 p-[1px]">
                                <div
                                    className={`h-full rounded-full transition-all duration-1000 ease-out flex items-center px-1 ${index < 3
                                        ? "bg-gradient-to-r from-rose-500 to-orange-500"
                                        : "bg-gradient-to-r from-teal-500 to-emerald-500"}`}
                                    style={{ width: `${item.progress}%` }}
                                >
                                    <div className="h-[2px] w-full bg-white/20 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10">
                        <p className="text-[var(--text-muted)] text-sm italic font-medium">No expense data detected yet.</p>
                    </div>
                )}
            </div>

            <div className="mt-12 p-8 bg-[var(--bg-glass)] rounded-[2.5rem] border border-[var(--border-main)] group hover:border-[var(--teal-accent)] transition-all">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-1.5 h-10 bg-[var(--teal-accent)] rounded-full group-hover:scale-y-110 transition-transform"></div>
                    <div>
                        <p className="text-[var(--text-muted)] text-[10px] font-black uppercase tracking-widest">Efficiency Rating</p>
                        <h4 className="text-[var(--text-main)] text-xl font-black italic">Elite Status</h4>
                    </div>
                </div>
                <p className="text-[var(--text-dim)] text-xs leading-relaxed font-medium">
                    You are outperforming 85% of peers in capital retention this cycle.
                </p>
            </div>
        </div>
    )
}

export default Insights;