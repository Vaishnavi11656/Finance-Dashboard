import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, PieChart, Pie, Legend, Tooltip, Cell } from "recharts"
import { useState, useMemo, useEffect, useRef, useLayoutEffect } from "react"
import { useAppContext } from "../context/AppContext"

function Charts({ transactions, setActiveCategory }) {
    const { theme } = useAppContext();
    const [hasMounted, setHasMounted] = useState(false);
    
    // Dimension Tracking Refs & State
    const areaContainerRef = useRef(null);
    const pieContainerRef = useRef(null);
    const [areaDim, setAreaDim] = useState({ width: 0, height: 300 });
    const [pieDim, setPieDim] = useState({ width: 0, height: 340 });

    useEffect(() => {
        setHasMounted(true);
    }, []);

    useLayoutEffect(() => {
        if (!hasMounted) return;

        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                if (entry.target === areaContainerRef.current) {
                    setAreaDim({ 
                        width: entry.contentRect.width, 
                        height: 300 
                    });
                } else if (entry.target === pieContainerRef.current) {
                    setPieDim({ 
                        width: entry.contentRect.width, 
                        height: 340 
                    });
                }
            }
        });

        if (areaContainerRef.current) observer.observe(areaContainerRef.current);
        if (pieContainerRef.current) observer.observe(pieContainerRef.current);

        return () => observer.disconnect();
    }, [hasMounted]);

    const chartData = useMemo(() => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const currentMonth = new Date().getMonth();
        const last6Months = [];
        
        for (let i = 5; i >= 0; i--) {
            const m = (currentMonth - i + 12) % 12;
            last6Months.push({ month: months[m], income: 0, expense: 0, sortKey: m });
        }

        transactions.forEach(t => {
            const date = new Date(t.date);
            const mName = months[date.getMonth()];
            const found = last6Months.find(item => item.month === mName);
            if (found) {
                if (t.type === 'income') found.income += parseFloat(t.amount);
                else found.expense += parseFloat(t.amount);
            }
        });

        return last6Months;
    }, [transactions]);

    const pieData = useMemo(() => {
        const categories = {};
        transactions.forEach(t => {
            if (t.type === 'expense') {
                categories[t.category] = (categories[t.category] || 0) + parseFloat(t.amount);
            }
        });
        return Object.keys(categories).map(cat => ({
            name: cat,
            value: categories[cat]
        })).sort((a, b) => b.value - a.value).slice(0, 5);
    }, [transactions]);

    const COLORS = ["#14B8A6", "#6366F1", "#F59E0B", "#EF4444", "#EC4899", "#8B5CF6"]

    const totalExpense = useMemo(() => pieData.reduce((sum, item) => sum + item.value, 0), [pieData]);
    const [selectedCategory, setSelectedCategory] = useState(null)

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[var(--bg-secondary)] backdrop-blur-xl border border-[var(--border-main)] p-4 rounded-2xl shadow-2xl">
                    <p className="text-[var(--text-dim)] text-[10px] font-black uppercase tracking-[0.2em] mb-3">{label}</p>
                    {payload.map((entry, index) => (
                        <div key={index} className="flex items-center gap-3 mt-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
                            <span className="text-[var(--text-main)] font-black text-sm">₹{entry.value.toLocaleString()}</span>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    if (!hasMounted) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-card p-10 rounded-[3rem] border border-[var(--border-main)]" style={{ height: '400px' }}></div>
                <div className="glass-card p-10 rounded-[3rem] border border-[var(--border-main)]" style={{ height: '400px' }}></div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Primary Analysis: Area Chart */}
            <div className="glass-card p-10 rounded-[3rem] border border-[var(--border-main)] transition-all duration-700">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h3 className="text-2xl font-black text-[var(--text-main)] tracking-tight">Cashflow Trends</h3>
                        <p className="text-[var(--text-muted)] text-[10px] font-black uppercase tracking-[0.2em] mt-1">6-Month Snapshot</p>
                    </div>
                </div>

                <div ref={areaContainerRef} className="w-full" style={{ minHeight: '300px', position: 'relative' }}>
                    {areaDim.width > 0 && (
                        <AreaChart width={areaDim.width} height={areaDim.height} data={chartData}>
                            <defs>
                                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--teal-accent)" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="var(--teal-accent)" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#F43F5E" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-main)" vertical={false} opacity={0.3} />
                            <XAxis
                                dataKey="month"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: 'var(--text-dim)', fontSize: 10, fontWeight: 900 }}
                                dy={10}
                            />
                            <YAxis hide />
                            <Tooltip content={<CustomTooltip />} />
                            <Area
                                type="monotone"
                                dataKey="income"
                                stroke="#14B8A6"
                                strokeWidth={4}
                                fillOpacity={1}
                                fill="url(#colorIncome)"
                                isAnimationActive={false} // Prevent animation-based measurement issues
                            />
                            <Area
                                type="monotone"
                                dataKey="expense"
                                stroke="#F43F5E"
                                strokeWidth={4}
                                fillOpacity={1}
                                fill="url(#colorExpense)"
                                isAnimationActive={false}
                            />
                        </AreaChart>
                    )}
                </div>
            </div>

            {/* Asset Allocation: Pie Chart */}
            <div className="glass-card p-10 rounded-[3rem] border border-[var(--border-main)] transition-all duration-700">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-2xl font-black text-[var(--text-main)] tracking-tight">Expense Breakdown</h3>
                        <p className="text-[var(--text-muted)] text-[10px] font-black uppercase tracking-[0.2em] mt-1">Top Sector Summary</p>
                    </div>
                    <button
                        onClick={() => { setSelectedCategory(null); setActiveCategory(null); }}
                        className="text-[10px] font-black text-[var(--teal-accent)]/60 hover:text-[var(--teal-accent)] uppercase tracking-widest transition-colors"
                    >
                        Reset Scope
                    </button>
                </div>

                <div ref={pieContainerRef} className="w-full" style={{ minHeight: '340px', position: 'relative' }}>
                    {pieDim.width > 0 && (
                        <PieChart width={pieDim.width} height={pieDim.height}>
                            <Pie
                                data={pieData}
                                innerRadius={80}
                                outerRadius={110}
                                paddingAngle={10}
                                dataKey="value"
                                stroke="none"
                                isAnimationActive={false}
                                onClick={(data) => {
                                    setSelectedCategory(data.name);
                                    setActiveCategory(data.name);
                                }}
                            >
                                {pieData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={selectedCategory === entry.name ? 'var(--text-main)' : COLORS[index % COLORS.length]}
                                        className="outline-none cursor-pointer hover:opacity-80 transition-opacity"
                                    />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <text
                                x="50%"
                                y="50%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="fill-[var(--text-main)] text-3xl font-black italic tracking-tighter"
                            >
                                ₹{(totalExpense / 1000).toFixed(1)}K
                            </text>
                            <Legend
                                verticalAlign="bottom"
                                align="center"
                                iconType="circle"
                                wrapperStyle={{ paddingTop: '30px', fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-muted)' }}
                            />
                        </PieChart>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Charts;
