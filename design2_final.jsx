import { useState, useEffect } from "react";
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadialBarChart, RadialBar } from "recharts";

const profitData = [
  { month: "Aug", revenue: 42000, cost: 28000, profit: 14000 },
  { month: "Sep", revenue: 48000, cost: 30000, profit: 18000 },
  { month: "Oct", revenue: 51000, cost: 32000, profit: 19000 },
  { month: "Nov", revenue: 55000, cost: 31000, profit: 24000 },
  { month: "Dec", revenue: 62000, cost: 35000, profit: 27000 },
  { month: "Jan", revenue: 58000, cost: 33000, profit: 25000 },
  { month: "Feb", revenue: 67000, cost: 36000, profit: 31000 },
];

const orderData = [
  { id: "OT-4821", client: "Zara EU", style: "Linen Blazer", qty: 2400, status: "Cutting", progress: 35, due: "Mar 12" },
  { id: "OT-4822", client: "H&M Asia", style: "Cotton Tee V2", qty: 8000, status: "Sewing", progress: 62, due: "Mar 05" },
  { id: "OT-4823", client: "Uniqlo JP", style: "Fleece Pullover", qty: 5500, status: "QC", progress: 88, due: "Feb 28" },
  { id: "OT-4824", client: "Gap NA", style: "Denim Jacket", qty: 3200, status: "Packing", progress: 95, due: "Feb 27" },
  { id: "OT-4825", client: "Nike SG", style: "DryFit Polo", qty: 6000, status: "Fabric Prep", progress: 12, due: "Mar 22" },
];

const radialData = [
  { name: "On Time", value: 82, fill: "#6B8F71" },
  { name: "Efficiency", value: 91, fill: "#C4956A" },
  { name: "Quality", value: 97, fill: "#8B7355" },
];

const statusColors = {
  "Fabric Prep": { bg: "#F3E8FF", text: "#7C3AED" },
  "Cutting": { bg: "#FEF3C7", text: "#D97706" },
  "Sewing": { bg: "#DBEAFE", text: "#2563EB" },
  "QC": { bg: "#D1FAE5", text: "#059669" },
  "Packing": { bg: "#FCE7F3", text: "#DB2777" },
};

const menuItems = [
  { icon: "◈", label: "Overview", active: true },
  { icon: "◇", label: "Orders" },
  { icon: "○", label: "Production" },
  { icon: "△", label: "Patterns" },
  { icon: "□", label: "Inventory" },
  { icon: "◎", label: "Team" },
  { icon: "▷", label: "Shipping" },
  { icon: "⬡", label: "Reports" },
  { icon: "✧", label: "Settings" },
];

export default function Design2() {
  const [loaded, setLoaded] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Overview");
  const [hoveredOrder, setHoveredOrder] = useState(null);

  useEffect(() => { setLoaded(true); }, []);

  const Card = ({ children, style: s = {} }) => (
    <div style={{
      background: "#FFFFFF",
      borderRadius: 16,
      padding: 24,
      boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)",
      ...s,
    }}>{children}</div>
  );

  return (
    <div style={{
      fontFamily: "'Source Serif 4', 'Georgia', serif",
      background: "#F7F5F0",
      color: "#2D2A26",
      minHeight: "100vh",
      display: "flex",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {/* SIDEBAR */}
      <aside style={{
        width: 240,
        background: "#FFFEF9",
        borderRight: "1px solid #E8E4DC",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}>
        <div style={{ padding: "28px 24px 20px", borderBottom: "1px solid #E8E4DC" }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#2D2A26", letterSpacing: -0.5 }}>
            One<span style={{ color: "#6B8F71" }}>Textile</span>
          </div>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: "#A09B93", marginTop: 4, letterSpacing: 0.5 }}>Production Studio</div>
        </div>

        {/* Order Tracker WIP */}
        <div style={{
          margin: "20px 16px 8px",
          padding: "16px 18px",
          background: "linear-gradient(135deg, #F7F5F0, #EDE9E0)",
          borderRadius: 14,
          border: "1px solid #E8E4DC",
        }}>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 10, fontWeight: 600, color: "#C4956A", letterSpacing: 1.5, marginBottom: 8 }}>ORDER TRACKER</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <span style={{ fontSize: 32, fontWeight: 700, color: "#2D2A26", lineHeight: 1 }}>24</span>
            <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "#A09B93" }}>active orders</span>
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 9, color: "#A09B93", marginBottom: 4 }}>On Track</div>
              <div style={{ height: 4, background: "#E8E4DC", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ width: "75%", height: "100%", background: "#6B8F71", borderRadius: 4 }} />
              </div>
            </div>
            <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: "#6B8F71", fontWeight: 600 }}>75%</span>
          </div>
        </div>

        {/* Profit Tracker Mini */}
        <div style={{
          margin: "8px 16px 16px",
          padding: "16px 18px",
          background: "linear-gradient(135deg, #6B8F7112, #6B8F7108)",
          borderRadius: 14,
          border: "1px solid #6B8F7130",
        }}>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 10, fontWeight: 600, color: "#6B8F71", letterSpacing: 1.5, marginBottom: 8 }}>PROFIT THIS MONTH</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
            <span style={{ fontSize: 28, fontWeight: 700, color: "#2D2A26", lineHeight: 1 }}>$31K</span>
            <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: "#6B8F71", fontWeight: 500 }}>↑ 24%</span>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "4px 12px" }}>
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveMenu(item.label)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                width: "100%",
                padding: "11px 14px",
                background: activeMenu === item.label ? "#6B8F7112" : "transparent",
                border: "none",
                borderRadius: 10,
                color: activeMenu === item.label ? "#6B8F71" : "#8A857D",
                fontSize: 14,
                fontFamily: "'DM Sans'",
                fontWeight: activeMenu === item.label ? 600 : 400,
                cursor: "pointer",
                marginBottom: 2,
                transition: "all 0.2s",
              }}
            >
              <span style={{ fontSize: 12, opacity: 0.7 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: "16px 24px", borderTop: "1px solid #E8E4DC", fontFamily: "'DM Sans'", fontSize: 10, color: "#C4C0B8" }}>
          Designed with care — v2.4
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, padding: 32, overflow: "auto" }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32,
          opacity: loaded ? 1 : 0, transition: "opacity 0.6s ease",
        }}>
          <div>
            <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0, letterSpacing: -0.5 }}>Good afternoon</h1>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: "#8A857D", marginTop: 6 }}>
              Here's your production overview for February 26, 2026
            </p>
          </div>
          <div style={{
            fontFamily: "'DM Sans'",
            fontSize: 12,
            color: "#6B8F71",
            background: "#6B8F7112",
            padding: "8px 16px",
            borderRadius: 24,
            fontWeight: 500,
          }}>
            ● Live Dashboard
          </div>
        </div>

        {/* KPI Cards */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28,
          opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(12px)", transition: "all 0.7s ease 0.15s",
        }}>
          {[
            { label: "Revenue", value: "$67,000", change: "+15.3%", icon: "◈", accent: "#C4956A" },
            { label: "Net Profit", value: "$31,000", change: "+24.0%", icon: "△", accent: "#6B8F71" },
            { label: "Units Made", value: "5,700", change: "+8.2%", icon: "○", accent: "#7C8DBF" },
            { label: "Defect Rate", value: "1.2%", change: "-0.3%", icon: "◇", accent: "#D4836D" },
          ].map((kpi, i) => (
            <Card key={i}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "#A09B93", marginBottom: 8 }}>{kpi.label}</div>
                  <div style={{ fontSize: 30, fontWeight: 700, lineHeight: 1, letterSpacing: -1 }}>{kpi.value}</div>
                </div>
                <span style={{
                  fontSize: 20, width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center",
                  background: `${kpi.accent}12`, borderRadius: 10, color: kpi.accent,
                }}>{kpi.icon}</span>
              </div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "#6B8F71", fontWeight: 500, marginTop: 12 }}>
                {kpi.change} <span style={{ color: "#C4C0B8", fontWeight: 400 }}>vs last month</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Chart Row */}
        <div style={{
          display: "grid", gridTemplateColumns: "5fr 2fr", gap: 16, marginBottom: 28,
          opacity: loaded ? 1 : 0, transition: "all 0.8s ease 0.25s",
        }}>
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 600, color: "#2D2A26" }}>Profit Trend</div>
              <div style={{ display: "flex", gap: 16, fontFamily: "'DM Sans'", fontSize: 11 }}>
                <span style={{ color: "#C4956A" }}>● Revenue</span>
                <span style={{ color: "#D4836D" }}>● Cost</span>
                <span style={{ color: "#6B8F71" }}>● Profit</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={230}>
              <LineChart data={profitData}>
                <XAxis dataKey="month" tick={{ fill: "#A09B93", fontSize: 11, fontFamily: "DM Sans" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#A09B93", fontSize: 11, fontFamily: "DM Sans" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E8E4DC", borderRadius: 10, fontSize: 12, fontFamily: "DM Sans", boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }} />
                <Line type="monotone" dataKey="revenue" stroke="#C4956A" strokeWidth={2.5} dot={{ r: 3, fill: "#C4956A" }} />
                <Line type="monotone" dataKey="cost" stroke="#D4836D" strokeWidth={1.5} strokeDasharray="6 3" dot={false} />
                <Line type="monotone" dataKey="profit" stroke="#6B8F71" strokeWidth={2.5} dot={{ r: 3, fill: "#6B8F71" }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 600, color: "#2D2A26", marginBottom: 16, alignSelf: "flex-start" }}>Performance</div>
            {radialData.map((d, i) => (
              <div key={i} style={{ width: "100%", marginBottom: i < 2 ? 16 : 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'DM Sans'", fontSize: 12, marginBottom: 6 }}>
                  <span style={{ color: "#8A857D" }}>{d.name}</span>
                  <span style={{ fontWeight: 600, color: d.fill }}>{d.value}%</span>
                </div>
                <div style={{ height: 8, background: "#F0ECE4", borderRadius: 8, overflow: "hidden" }}>
                  <div style={{
                    width: loaded ? `${d.value}%` : "0%",
                    height: "100%",
                    background: d.fill,
                    borderRadius: 8,
                    transition: `width 1.2s ease ${0.3 + i * 0.2}s`,
                  }} />
                </div>
              </div>
            ))}
          </Card>
        </div>

        {/* Order Tracker Table */}
        <Card style={{
          opacity: loaded ? 1 : 0, transition: "all 0.9s ease 0.35s",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 600, color: "#2D2A26" }}>Active Orders</div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: "#A09B93", marginTop: 2 }}>Work in progress tracker</div>
            </div>
            <span style={{
              fontFamily: "'DM Sans'", fontSize: 10, fontWeight: 600, color: "#C4956A",
              background: "#C4956A14", padding: "6px 14px", borderRadius: 20, letterSpacing: 0.5,
            }}>VIEW ALL →</span>
          </div>
          <div style={{ overflowX: "auto" }}>
            {orderData.map((o, idx) => (
              <div
                key={o.id}
                onMouseEnter={() => setHoveredOrder(o.id)}
                onMouseLeave={() => setHoveredOrder(null)}
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 100px 140px 70px 100px 1fr 70px",
                  alignItems: "center",
                  padding: "14px 8px",
                  borderBottom: idx < orderData.length - 1 ? "1px solid #F0ECE4" : "none",
                  background: hoveredOrder === o.id ? "#FAFAF6" : "transparent",
                  borderRadius: 8,
                  transition: "background 0.2s",
                  fontFamily: "'DM Sans'",
                  fontSize: 13,
                }}
              >
                <span style={{ fontWeight: 600, color: "#C4956A" }}>{o.id}</span>
                <span style={{ fontWeight: 500 }}>{o.client}</span>
                <span style={{ color: "#8A857D" }}>{o.style}</span>
                <span>{o.qty.toLocaleString()}</span>
                <span style={{
                  display: "inline-block",
                  padding: "4px 10px",
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 500,
                  background: statusColors[o.status]?.bg,
                  color: statusColors[o.status]?.text,
                  textAlign: "center",
                }}>{o.status}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 8px" }}>
                  <div style={{ flex: 1, height: 6, background: "#F0ECE4", borderRadius: 6, overflow: "hidden" }}>
                    <div style={{
                      width: loaded ? `${o.progress}%` : "0%",
                      height: "100%",
                      background: statusColors[o.status]?.text,
                      borderRadius: 6,
                      transition: `width 1s ease ${0.4 + idx * 0.1}s`,
                    }} />
                  </div>
                  <span style={{ fontSize: 11, color: "#A09B93", minWidth: 30, textAlign: "right" }}>{o.progress}%</span>
                </div>
                <span style={{ color: "#A09B93", fontSize: 12, textAlign: "right" }}>{o.due}</span>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
}
