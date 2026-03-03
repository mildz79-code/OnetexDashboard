export const stageColors = {
  "Pre-Production": { bg: "#F3E8FF", text: "#7C3AED" },
  "Color Approved": { bg: "#FEF3C7", text: "#D97706" },
  "Sampling Approved": { bg: "#E0F2FE", text: "#0284C7" },
  "Material In": { bg: "#DCFCE7", text: "#16A34A" },
  "Cutting": { bg: "#FEF3C7", text: "#D97706" },
  "Sewing": { bg: "#DBEAFE", text: "#2563EB" },
  "Packing": { bg: "#FCE7F3", text: "#DB2777" },
  "Shipped": { bg: "#D1FAE5", text: "#059669" },
};

export const stageIcon = {
  "Pre-Production": "◇", "Color Approved": "◈", "Sampling Approved": "△",
  "Material In": "□", "Cutting": "✂", "Sewing": "◎", "Packing": "▣", "Shipped": "▷",
};

export const pieColors = ["#6B8F71", "#C4956A", "#7C8DBF", "#D4836D", "#8B7355", "#A0845C"];

export const menuItems = [
  { icon: "◈", label: "Overview", key: "overview" },
  { icon: "◇", label: "WIP Tracker", key: "wip" },
  { icon: "○", label: "Production", key: "production" },
  { icon: "△", label: "Patterns", key: "patterns" },
  { icon: "□", label: "Inventory", key: "inventory" },
  { icon: "◎", label: "Team", key: "team" },
  { icon: "▷", label: "Shipping", key: "shipping" },
  { icon: "⬡", label: "Reports", key: "reports" },
  { icon: "✧", label: "Settings", key: "settings" },
];

export const fmt = (d) => {
  if (!d) return "—";
  const dt = new Date(d + "T00:00:00");
  return dt.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export const daysFrom = (d, ref = "2026-02-27") => {
  if (!d) return null;
  return Math.ceil((new Date(d) - new Date(ref)) / 86400000);
};
