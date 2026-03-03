import { useState, useEffect, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import Sidebar from "./Sidebar";
import { useWIPData } from "./useWIPData";
import { stageColors, stageIcon, pieColors, fmt, daysFrom } from "./constants";

function Card({ children, style: s = {} }) {
  return (
    <div style={{
      background: "#FFFFFF", borderRadius: 16, padding: 24,
      boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)", ...s,
    }}>{children}</div>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [activeMenu, setActiveMenu] = useState("overview");
  const [expandedPO, setExpandedPO] = useState(null);
  const [filterCustomer, setFilterCustomer] = useState("All");
  const { poData, dbStatus, error, fetchData } = useWIPData();

  useEffect(() => { fetchData(); setLoaded(true); }, [fetchData]);

  const totalUnits = poData.reduce((s, p) => s + p.totalQty, 0);
  const totalLines = poData.reduce((s, p) => s + p.lines.length, 0);
  const customers = [...new Set(poData.map(p => p.customer))];
  const filteredPOs = filterCustomer === "All" ? poData : poData.filter(p => p.customer === filterCustomer);

  const qtyByCustomer = customers.map(c => ({
    name: c, qty: poData.filter(p => p.customer === c).reduce((s, p) => s + p.totalQty, 0),
  }));

  const allLines = poData.flatMap(p => p.lines);
  const stageBreakdown = {};
  allLines.forEach(li => { stageBreakdown[li.stage] = (stageBreakdown[li.stage] || 0) + 1; });
  const stageData = Object.entries(stageBreakdown).map(([name, count]) => ({ name, count }));

  const timeline = poData
    .filter(p => p.exFactory)
    .map(p => ({ po: `#${p.po}`, customer: p.customer, qty: p.totalQty, days: daysFrom(p.exFactory), shipMode: p.shipMode }))
    .sort((a, b) => (a.days || 999) - (b.days || 999));

  const nextShip = timeline[0] || null;

  return (
    <div style={{ fontFamily: "'Source Serif 4', Georgia, serif", background: "#F7F5F0", color: "#2D2A26", minHeight: "100vh", display: "flex" }}>
      <link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

      <Sidebar
        activeMenu={activeMenu} setActiveMenu={setActiveMenu}
        dbStatus={dbStatus} poData={poData}
        totalUnits={totalUnits} totalLines={totalLines} customers={customers}
      />

      <main style={{ flex: 1, padding: "28px 32px", overflow: "auto" }}>
        {/* Error Banner */}
        {dbStatus === "fallback" && (
          <div style={{
            marginBottom: 16, padding: "10px 16px", background: "#FEF2F2", border: "1px solid #FECACA",
            borderRadius: 10, fontFamily: "'DM Sans'", fontSize: 12, color: "#DC2626",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span>⚠ Could not connect to Supabase.{error ? ` (${error.substring(0, 80)})` : ""} Run the SQL schema first.</span>
            <button onClick={fetchData} style={{
              background: "#DC2626", color: "#fff", border: "none", borderRadius: 6,
              padding: "4px 12px", fontSize: 11, cursor: "pointer", fontFamily: "'DM Sans'",
            }}>Retry</button>
          </div>
        )}

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, opacity: loaded ? 1 : 0, transition: "opacity 0.5s" }}>
          <div>
            <h1 style={{ fontSize: 30, fontWeight: 700, margin: 0, letterSpacing: -0.5 }}>WIP Dashboard</h1>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: "#8A857D", marginTop: 4 }}>
              Alpha Custom Apparel · February 27, 2026
              <span style={{
                marginLeft: 10, fontSize: 10, padding: "2px 8px", borderRadius: 10, fontWeight: 600,
                background: dbStatus === "live" ? "#D1FAE5" : "#FEF3C7",
                color: dbStatus === "live" ? "#059669" : "#D97706",
              }}>
                {dbStatus === "live" ? "● LIVE" : dbStatus === "connecting" ? "● CONNECTING" : "● OFFLINE"}
              </span>
            </p>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {["All", ...customers].map(c => (
              <button key={c} onClick={() => setFilterCustomer(c)} style={{
                fontFamily: "'DM Sans'", fontSize: 12, fontWeight: filterCustomer === c ? 600 : 400,
                padding: "6px 14px", borderRadius: 20, border: "1px solid #E8E4DC", cursor: "pointer",
                background: filterCustomer === c ? "#6B8F71" : "#FFFEF9",
                color: filterCustomer === c ? "#fff" : "#8A857D", transition: "all 0.2s",
              }}>{c}</button>
            ))}
            <button onClick={fetchData} title="Refresh" style={{
              fontFamily: "'DM Sans'", fontSize: 14, padding: "5px 10px", borderRadius: 20,
              border: "1px solid #E8E4DC", cursor: "pointer", background: "#FFFEF9", color: "#6B8F71",
            }}>↻</button>
          </div>
        </div>

        {/* Loading */}
        {dbStatus === "connecting" && poData.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0", fontFamily: "'DM Sans'", color: "#A09B93" }}>
            <div style={{ fontSize: 32, marginBottom: 12, animation: "spin 2s linear infinite" }}>◎</div>
            <div style={{ fontSize: 14 }}>Connecting to Supabase…</div>
          </div>
        )}

        {poData.length > 0 && (
          <>
            {/* KPI Row */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24,
              opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(10px)", transition: "all 0.6s ease 0.1s",
            }}>
              {[
                { label: "Active POs", value: filteredPOs.length, sub: `${filteredPOs.reduce((s, p) => s + p.lines.length, 0)} line items`, accent: "#C4956A" },
                { label: "Total Units", value: filteredPOs.reduce((s, p) => s + p.totalQty, 0).toLocaleString(), sub: "on order", accent: "#6B8F71" },
                { label: "Next Ex-Factory", value: nextShip ? fmt(nextShip.exFactory) : "—", sub: nextShip ? `PO ${nextShip.po} · ${nextShip.shipMode}` : "", accent: "#7C8DBF" },
                { label: "Customers", value: [...new Set(filteredPOs.map(p => p.customer))].length, sub: customers.join(", "), accent: "#D4836D" },
              ].map((k, i) => (
                <Card key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "#A09B93", marginBottom: 8 }}>{k.label}</div>
                      <div style={{ fontSize: 30, fontWeight: 700, lineHeight: 1, letterSpacing: -1 }}>{k.value}</div>
                    </div>
                    <span style={{
                      width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
                      background: `${k.accent}14`, borderRadius: 10, fontSize: 16, color: k.accent,
                    }}>●</span>
                  </div>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: "#A09B93", marginTop: 10 }}>{k.sub}</div>
                </Card>
              ))}
            </div>

            {/* Charts Row */}
            <div style={{
              display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 14, marginBottom: 24,
              opacity: loaded ? 1 : 0, transition: "all 0.7s ease 0.2s",
            }}>
              {/* Timeline */}
              <Card>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 600, marginBottom: 16 }}>Days to Ex-Factory</div>
                {timeline.length > 0 ? (
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={timeline} layout="vertical">
                      <XAxis type="number" tick={{ fill: "#A09B93", fontSize: 10, fontFamily: "DM Sans" }} axisLine={false} tickLine={false} tickFormatter={v => `${v}d`} />
                      <YAxis type="category" dataKey="po" width={55} tick={{ fill: "#8A857D", fontSize: 11, fontFamily: "DM Sans" }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E8E4DC", borderRadius: 10, fontSize: 12, fontFamily: "DM Sans" }}
                        formatter={(v, n, props) => [`${v} days · ${props.payload.customer} · ${props.payload.qty.toLocaleString()} pcs`, ""]} />
                      <Bar dataKey="days" radius={[0, 6, 6, 0]}>
                        {timeline.map((_, i) => <Cell key={i} fill={pieColors[i % pieColors.length]} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "#A09B93", padding: 20 }}>No ship dates</div>}
              </Card>

              {/* Donut */}
              <Card style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Units by Customer</div>
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <ResponsiveContainer width="100%" height={120}>
                    <PieChart>
                      <Pie data={qtyByCustomer} dataKey="qty" cx="50%" cy="50%" innerRadius={32} outerRadius={50} strokeWidth={0}>
                        {qtyByCustomer.map((_, i) => <Cell key={i} fill={pieColors[i]} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 4 }}>
                  {qtyByCustomer.map((c, i) => (
                    <span key={c.name} style={{ fontFamily: "'DM Sans'", fontSize: 11, color: pieColors[i], fontWeight: 500 }}>
                      ● {c.name} — {c.qty.toLocaleString()}
                    </span>
                  ))}
                </div>
              </Card>

              {/* Stage Breakdown */}
              <Card style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 600, marginBottom: 14 }}>Production Stage</div>
                {stageData.map((s, i) => {
                  const sc = stageColors[s.name] || { bg: "#F0ECE4", text: "#8A857D" };
                  const pct = allLines.length > 0 ? (s.count / allLines.length) * 100 : 0;
                  return (
                    <div key={i} style={{ marginBottom: 10 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'DM Sans'", fontSize: 11, marginBottom: 4 }}>
                        <span style={{ color: sc.text, fontWeight: 500 }}>{stageIcon[s.name] || "○"} {s.name}</span>
                        <span style={{ color: "#A09B93" }}>{s.count}</span>
                      </div>
                      <div style={{ height: 6, background: "#F0ECE4", borderRadius: 6, overflow: "hidden" }}>
                        <div style={{
                          width: loaded ? `${pct}%` : "0%", height: "100%", background: sc.text, borderRadius: 6,
                          transition: `width 0.8s ease ${0.3 + i * 0.1}s`,
                        }} />
                      </div>
                    </div>
                  );
                })}
              </Card>
            </div>

            {/* PO Cards */}
            <div style={{ opacity: loaded ? 1 : 0, transition: "all 0.8s ease 0.3s" }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 600, marginBottom: 14, display: "flex", justifyContent: "space-between" }}>
                <span>Purchase Orders — WIP Tracker</span>
                <span style={{
                  fontSize: 10, padding: "4px 12px", borderRadius: 16, letterSpacing: 0.5,
                  color: dbStatus === "live" ? "#059669" : "#C4956A",
                  background: dbStatus === "live" ? "#D1FAE514" : "#C4956A14",
                }}>
                  {dbStatus === "live" ? "● SUPABASE LIVE" : "● CACHED"}
                </span>
              </div>

              {filteredPOs.map(po => {
                const isExp = expandedPO === po.po;
                const daysOut = daysFrom(po.exFactory);
                return (
                  <Card key={po.po} style={{ marginBottom: 12, padding: 0, overflow: "hidden" }}>
                    <div onClick={() => setExpandedPO(isExp ? null : po.po)}
                      style={{
                        display: "grid", gridTemplateColumns: "70px 90px 1fr 90px 80px 70px 50px 26px",
                        alignItems: "center", padding: "16px 20px", cursor: "pointer",
                        fontFamily: "'DM Sans'", fontSize: 13,
                        borderBottom: isExp ? "1px solid #F0ECE4" : "none", transition: "background 0.2s",
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = "#FAFAF6"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      <span style={{ fontWeight: 600, color: "#C4956A" }}>#{po.po}</span>
                      <span style={{ fontWeight: 500 }}>{po.customer}</span>
                      <span style={{ color: "#8A857D", fontSize: 12 }}>{po.lines.length} items · {po.lines[0]?.desc || "—"}</span>
                      <span style={{ fontWeight: 600 }}>{po.totalQty.toLocaleString()} pcs</span>
                      <span style={{ fontSize: 12, color: "#8A857D" }}>{fmt(po.exFactory)}</span>
                      <span style={{
                        display: "inline-block", textAlign: "center", padding: "3px 10px", borderRadius: 6, fontSize: 10, fontWeight: 600,
                        background: po.shipMode === "Air" ? "#DBEAFE" : po.shipMode === "Vessel" ? "#D1FAE5" : "#F0ECE4",
                        color: po.shipMode === "Air" ? "#2563EB" : po.shipMode === "Vessel" ? "#059669" : "#8A857D",
                      }}>{po.shipMode}</span>
                      <span style={{ fontSize: 11, fontWeight: 600, color: daysOut && daysOut < 14 ? "#D97706" : "#6B8F71" }}>
                        {daysOut !== null ? `${daysOut}d` : "—"}
                      </span>
                      <span style={{ fontSize: 16, color: "#A09B93", transition: "transform 0.2s", transform: isExp ? "rotate(90deg)" : "none" }}>›</span>
                    </div>

                    {isExp && (
                      <div style={{ background: "#FAFAF8" }}>
                        <div style={{
                          display: "grid", gridTemplateColumns: "95px 140px 1fr 55px 80px 75px 75px 70px",
                          padding: "10px 20px", fontFamily: "'DM Sans'", fontSize: 9, fontWeight: 600,
                          color: "#A09B93", letterSpacing: 0.5, borderBottom: "1px solid #F0ECE4",
                        }}>
                          <span>STYLE</span><span>DESCRIPTION</span><span>COLOR / GRAPHIC</span>
                          <span>QTY</span><span>STAGE</span><span>CUT DATE</span><span>EX-FACTORY</span><span>SHIP</span>
                        </div>
                        {po.lines.map((li, idx) => {
                          const sc = stageColors[li.stage] || { bg: "#F0ECE4", text: "#8A857D" };
                          return (
                            <div key={li.id || idx} style={{
                              display: "grid", gridTemplateColumns: "95px 140px 1fr 55px 80px 75px 75px 70px",
                              padding: "10px 20px", fontFamily: "'DM Sans'", fontSize: 12, alignItems: "center",
                              borderBottom: idx < po.lines.length - 1 ? "1px solid #F5F2EC" : "none",
                            }}>
                              <span style={{ fontWeight: 500, color: "#C4956A" }}>{li.style}</span>
                              <span>{li.desc}</span>
                              <span style={{ color: "#8A857D", fontSize: 11 }}>{li.color}</span>
                              <span style={{ fontWeight: 500 }}>{li.qty.toLocaleString()}</span>
                              <span style={{
                                display: "inline-block", padding: "2px 8px", borderRadius: 5, fontSize: 9, fontWeight: 600,
                                background: sc.bg, color: sc.text, textAlign: "center", whiteSpace: "nowrap",
                              }}>{li.stage}</span>
                              <span style={{ color: "#8A857D", fontSize: 11 }}>{fmt(li.cutPlan)}</span>
                              <span style={{ color: "#8A857D", fontSize: 11 }}>{fmt(li.exFactory)}</span>
                              <span style={{ color: "#8A857D", fontSize: 11 }}>{li.shipMode || "—"}</span>
                            </div>
                          );
                        })}
                        <div style={{
                          display: "grid", gridTemplateColumns: "95px 140px 1fr 55px 80px 75px 75px 70px",
                          padding: "12px 20px", fontFamily: "'DM Sans'", fontSize: 12, fontWeight: 600,
                          borderTop: "1px solid #E8E4DC", background: "#F5F2EC",
                        }}>
                          <span /><span /><span style={{ color: "#8A857D" }}>TOTAL</span>
                          <span>{po.totalQty.toLocaleString()}</span>
                          <span /><span /><span /><span />
                        </div>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
