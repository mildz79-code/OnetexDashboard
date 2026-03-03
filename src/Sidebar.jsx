import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { menuItems, pieColors } from "./constants";

const profitSparkline = [
  { m: "S", v: 14 }, { m: "O", v: 19 }, { m: "N", v: 24 },
  { m: "D", v: 27 }, { m: "J", v: 25 }, { m: "F", v: 31 },
];

export default function Sidebar({ activeMenu, setActiveMenu, dbStatus, poData, totalUnits, totalLines, customers }) {
  return (
    <aside style={{
      width: 260, background: "#FFFEF9", borderRight: "1px solid #E8E4DC",
      display: "flex", flexDirection: "column", flexShrink: 0,
      position: "sticky", top: 0, height: "100vh", overflowY: "auto",
    }}>
      {/* Logo */}
      <div style={{ padding: "28px 24px 20px", borderBottom: "1px solid #E8E4DC" }}>
        <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.5, fontFamily: "'Source Serif 4', Georgia, serif" }}>
          One<span style={{ color: "#6B8F71" }}>Textile</span>
        </div>
        <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: "#A09B93", marginTop: 4, letterSpacing: 0.5 }}>
          Production Studio · Guatemala
        </div>
      </div>

      {/* ORDER TRACKER */}
      <div style={{
        margin: "20px 14px 8px", padding: "18px",
        background: "linear-gradient(135deg, #F7F5F0, #EDE9E0)",
        borderRadius: 14, border: "1px solid #E8E4DC",
      }}>
        <div style={{
          fontFamily: "'DM Sans'", fontSize: 10, fontWeight: 600, color: "#C4956A",
          letterSpacing: 1.5, marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span>ORDER TRACKER · WIP</span>
          <span style={{
            width: 6, height: 6, borderRadius: "50%",
            background: dbStatus === "live" ? "#22C55E" : dbStatus === "connecting" ? "#F59E0B" : "#EF4444",
            display: "inline-block",
            boxShadow: dbStatus === "live" ? "0 0 6px #22C55E" : "none",
          }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ fontSize: 36, fontWeight: 700, lineHeight: 1, fontFamily: "'Source Serif 4', Georgia, serif" }}>
              {dbStatus === "connecting" ? "…" : poData.length}
            </div>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: "#A09B93", marginTop: 4 }}>active POs</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#6B8F71", fontFamily: "'Source Serif 4'" }}>{totalLines}</div>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: "#A09B93" }}>line items</div>
          </div>
        </div>
        {poData.length > 0 && (
          <>
            <div style={{ display: "flex", gap: 4, marginTop: 14 }}>
              {poData.map((p, i) => (
                <div key={i} style={{
                  flex: Math.max(p.totalQty, 1), height: 5, borderRadius: 4,
                  background: pieColors[i % pieColors.length], opacity: 0.7,
                }} />
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontFamily: "'DM Sans'", fontSize: 9, color: "#A09B93" }}>
              <span>{totalUnits.toLocaleString()} units</span>
              <span>{customers.length} customers</span>
            </div>
          </>
        )}
      </div>

      {/* PROFIT TRACKER */}
      <div style={{
        margin: "8px 14px 20px", padding: "18px",
        background: "linear-gradient(135deg, #6B8F7112, #6B8F7108)",
        borderRadius: 14, border: "1px solid #6B8F7130",
      }}>
        <div style={{ fontFamily: "'DM Sans'", fontSize: 10, fontWeight: 600, color: "#6B8F71", letterSpacing: 1.5, marginBottom: 8 }}>
          PROFIT TRACKER
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span style={{ fontSize: 28, fontWeight: 700, lineHeight: 1, fontFamily: "'Source Serif 4'" }}>$31K</span>
          <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: "#6B8F71", fontWeight: 500 }}>↑ 24%</span>
        </div>
        <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: "#A09B93", marginTop: 6 }}>46.3% margin · Feb 2026</div>
        <div style={{ marginTop: 10, height: 32 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={profitSparkline}>
              <defs>
                <linearGradient id="mg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6B8F71" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#6B8F71" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="v" stroke="#6B8F71" fill="url(#mg)" strokeWidth={1.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* NAV */}
      <nav style={{ flex: 1, padding: "4px 10px" }}>
        {menuItems.map((item) => (
          <button key={item.key} onClick={() => setActiveMenu(item.key)} style={{
            display: "flex", alignItems: "center", gap: 14, width: "100%", padding: "11px 14px",
            background: activeMenu === item.key ? "#6B8F7112" : "transparent",
            border: "none", borderRadius: 10,
            color: activeMenu === item.key ? "#6B8F71" : "#8A857D",
            fontSize: 14, fontFamily: "'DM Sans'", fontWeight: activeMenu === item.key ? 600 : 400,
            cursor: "pointer", marginBottom: 2, transition: "all 0.2s",
          }}>
            <span style={{ fontSize: 12, opacity: 0.6 }}>{item.icon}</span>{item.label}
          </button>
        ))}
      </nav>

      <div style={{ padding: "14px 24px", borderTop: "1px solid #E8E4DC", fontFamily: "'DM Sans'", fontSize: 10, color: "#C4C0B8" }}>
        OneTextile v2.5 · Supabase Live
      </div>
    </aside>
  );
}
