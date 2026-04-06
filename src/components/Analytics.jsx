import { useState, useEffect, useRef, useLayoutEffect } from "react"
import { FaFileCsv, FaChartLine, FaLayerGroup, FaArrowTrendUp, FaArrowTrendDown, FaCompass } from "react-icons/fa6"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts"

function Analytics({ transactions }) {
    const [view, setView] = useState("performance");
    const [hasMounted, setHasMounted] = useState(false);

    // Dimension Tracking Refs & State
    const barContainerRef = useRef(null);
    const [barDim, setBarDim] = useState({ width: 0, height: 350 });

    useEffect(() => {
        setHasMounted(true);
    }, []);

    useLayoutEffect(() => {
        if (!hasMounted) return;

        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                if (entry.target === barContainerRef.current) {
                    setBarDim({
                        width: entry.contentRect.width,
                        height: 350
                    });
                }
            }
        });

        if (barContainerRef.current) observer.observe(barContainerRef.current);

        return () => observer.disconnect();
    }, [hasMounted]);

    // Process data for charts
    const categoryData = transactions.reduce((acc, curr) => {
        const found = acc.find(item => item.name === curr.category);
        if (found) {
            found.value += parseFloat(curr.amount);
        } else {
            acc.push({ name: curr.category, value: parseFloat(curr.amount) });
        }
        return acc;
    }, []);

    const exportToCSV = () => {
        const headers = ["ID", "Name", "Date", "Category", "Amount", "Type", "Status"];
        const rows = transactions.map(t => [
            t.id, 
            t.name, 
            t.date, 
            t.category, 
            t.amount, 
            t.type, 
            t.status
        ]);

        const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `finance_report_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const COLORS = ['#14B8A6', '#6366F1', '#3382F6', '#8B5CF6', '#EC4899', '#06B6D4'];

    return (
        <div className="space-y-8 animate-in fade-in zoom-in-95 duration-700">
            {/* Control Header */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 glass-card p-6 rounded-[2.5rem]">
                <div className="flex bg-[var(--bg-glass)] p-1.5 rounded-2xl border border-[var(--border-main)]">
                    <button 
                        onClick={() => setView("performance")}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === "performance" ? "bg-[var(--teal-accent)] text-black shadow-lg" : "text-[var(--text-muted)] hover:text-[var(--text-main)]"}`}
                    >
                        <FaChartLine /> Performance
                    </button>
                    <button 
                        onClick={() => setView("distribution")}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === "distribution" ? "bg-[var(--teal-accent)] text-black shadow-lg" : "text-[var(--text-muted)] hover:text-[var(--text-main)]"}`}
                    >
                        <FaLayerGroup /> Allocation
                    </button>
                </div>

                <button 
                    onClick={exportToCSV}
                    className="flex items-center gap-3 bg-[var(--text-main)] text-[var(--bg-primary)] px-8 py-3 rounded-2xl font-black text-xs hover:opacity-90 transition-all shadow-xl active-press"
                >
                    <FaFileCsv size={18} /> Export Registry
                </button>
            </div>

            {view === "performance" ? (
                <div className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 glass-card p-10 rounded-[3rem]">
                            <h3 className="text-2xl font-black mb-8 text-[var(--text-main)] tracking-tight">Monthly Performance</h3>
                            <div ref={barContainerRef} className="w-full" style={{ minHeight: '350px', position: 'relative' }}>
                                {hasMounted && barDim.width > 0 && (
                                    <BarChart width={barDim.width} height={barDim.height} data={categoryData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-main)" vertical={false} opacity={0.5} />
                                        <XAxis 
                                            dataKey="name" 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{fill: 'var(--text-muted)', fontSize: 10, fontWeight: 900}} 
                                            dy={10} 
                                        />
                                        <YAxis hide />
                                        <Tooltip 
                                            cursor={{fill: 'var(--bg-glass)'}}
                                            contentStyle={{
                                                backgroundColor: 'var(--bg-secondary)', 
                                                borderRadius: '24px', 
                                                border: '1px solid var(--border-main)', 
                                                boxShadow: 'var(--shadow-main)',
                                                padding: '16px'
                                            }}
                                            itemStyle={{fontWeight: 900, fontSize: '12px'}}
                                        />
                                        <Bar dataKey="value" radius={[12, 12, 0, 0]} isAnimationActive={false}>
                                            {categoryData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                )}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-gradient-to-br from-[var(--teal-accent)]/10 to-cyan-500/5 p-8 rounded-[3rem] border border-[var(--teal-accent)]/20 shadow-sm">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 bg-[var(--teal-accent)]/10 rounded-2xl flex items-center justify-center border border-[var(--teal-accent)]/20">
                                        <FaArrowTrendUp className="text-[var(--teal-accent)]" />
                                    </div>
                                    <span className="text-[10px] font-black text-[var(--teal-accent)] px-3 py-1 bg-[var(--teal-accent)]/10 rounded-full tracking-widest">+18.2%</span>
                                </div>
                                <p className="text-[var(--text-muted)] text-[10px] font-black uppercase tracking-[0.2em]">Active Growth</p>
                                <h4 className="text-3xl font-black text-[var(--text-main)] mt-2 tracking-tighter">Capital Expansion</h4>
                            </div>

                            <div className="bg-gradient-to-br from-[var(--indigo-accent)]/10 to-blue-500/5 p-8 rounded-[3rem] border border-[var(--indigo-accent)]/20 shadow-sm">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 bg-[var(--indigo-accent)]/10 rounded-2xl flex items-center justify-center border border-[var(--indigo-accent)]/20">
                                        <FaLayerGroup className="text-[var(--indigo-accent)]" />
                                    </div>
                                    <span className="text-[10px] font-black text-[var(--indigo-accent)] px-3 py-1 bg-[var(--indigo-accent)]/10 rounded-full tracking-widest uppercase">Optimal</span>
                                </div>
                                <p className="text-[var(--text-muted)] text-[10px] font-black uppercase tracking-[0.2em]">Risk Index</p>
                                <h4 className="text-3xl font-black text-[var(--text-main)] mt-2 tracking-tighter">Diversified</h4>
                            </div>
                        </div>
                    </div>

                    {/* Strategic Outlook Section */}
                    <div className="glass-card p-12 rounded-[3.5rem] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                            <FaCompass size={140} className="text-[var(--teal-accent)]" />
                        </div>
                        
                        <div className="relative z-10">
                            <h3 className="text-4xl font-black text-[var(--text-main)] tracking-tighter mb-12 flex items-center gap-6">
                                <span className="w-16 h-1.5 bg-[var(--teal-accent)] rounded-full"></span>
                                Strategic Outlook
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                <div className="space-y-4">
                                    <p className="text-[var(--teal-accent)] font-black uppercase tracking-[0.2em] text-[10px]">Efficiency Index</p>
                                    <h4 className="text-[var(--text-main)] text-xl font-black">94.2% Savings Rate</h4>
                                    <p className="text-[var(--text-muted)] text-sm leading-relaxed font-medium">Your current capital retention is in the top 5% of elite portfolios. Consider reallocating 15% to liquid assets.</p>
                                </div>
                                
                                <div className="space-y-4">
                                    <p className="text-cyan-500 font-black uppercase tracking-[0.2em] text-[10px]">Sector Warnings</p>
                                    <h4 className="text-[var(--text-main)] text-xl font-black">Unusual Activity</h4>
                                    <p className="text-[var(--text-muted)] text-sm leading-relaxed font-medium">Food and Entertainment sectors are 12% above your average. Optimization advised in the next cycle.</p>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-[var(--indigo-accent)] font-black uppercase tracking-[0.2em] text-[10px]">Investment Opportunity</p>
                                    <h4 className="text-[var(--text-main)] text-xl font-black">Liquidity Reserve</h4>
                                    <p className="text-[var(--text-muted)] text-sm leading-relaxed font-medium">A ₹45,000 idle surplus identified. Recommended: Low-risk index positioning to hedge against inflation.</p>
                                </div>
                            </div>

                            <button className="mt-12 bg-[var(--text-main)] text-[var(--bg-primary)] px-10 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-xl hover:opacity-90 transition-all active-press">
                                Implement Strategy
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="glass-card p-12 rounded-[3.5rem]">
                    <h3 className="text-3xl font-black mb-12 text-[var(--text-main)] tracking-tighter">Portfolio Allocation</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categoryData.sort((a,b) => b.value - a.value).map((cat, idx) => (
                            <div key={idx} className="flex items-center gap-6 bg-[var(--bg-glass)] p-6 rounded-3xl border border-[var(--border-main)] hover:border-[var(--teal-accent)]/30 transition-all group active-press">
                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black text-white shadow-lg" style={{backgroundColor: COLORS[idx % COLORS.length]}}>
                                    {cat.name.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <h5 className="font-black text-[var(--text-main)] text-lg tracking-tight">{cat.name}</h5>
                                    <div className="w-full bg-[var(--border-main)] h-2 rounded-full mt-3 overflow-hidden">
                                        <div 
                                            className="h-full rounded-full group-hover:animate-pulse" 
                                            style={{backgroundColor: COLORS[idx % COLORS.length], width: `${Math.min((cat.value / 100000) * 100, 100)}%`}}
                                        ></div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="block font-black text-[var(--text-main)]">₹{cat.value.toLocaleString()}</span>
                                    <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Mark-Val</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Analytics;
