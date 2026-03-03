import { useState, useCallback } from "react";
import { sbFetch } from "./supabase";

export function useWIPData() {
  const [poData, setPoData] = useState([]);
  const [dbStatus, setDbStatus] = useState("connecting");
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setDbStatus("connecting");
      const [customers, pos, lineItems] = await Promise.all([
        sbFetch("wip_customers", "select=id,customer_name"),
        sbFetch("wip_purchase_orders", "select=id,po_number,customer_id,po_date,status,total_qty&status=eq.Active&order=po_number"),
        sbFetch("wip_line_items", "select=*&order=created_at"),
      ]);

      const custMap = {};
      customers.forEach((c) => (custMap[c.id] = c.customer_name));

      const grouped = pos.map((po) => {
        const lines = lineItems.filter((li) => li.po_id === po.id);
        const totalQty = lines.reduce((s, li) => s + (Number(li.po_qty) || 0), 0);
        const shipModes = [...new Set(lines.map((li) => li.ship_mode).filter(Boolean))];
        const exFactories = lines.map((li) => li.ex_factory_date).filter(Boolean).sort();

        return {
          id: po.id,
          po: po.po_number,
          customer: custMap[po.customer_id] || "Unknown",
          totalQty: totalQty || Number(po.total_qty) || 0,
          shipMode: shipModes[0] || "—",
          exFactory: exFactories[0] || null,
          poDate: po.po_date,
          lines: lines.map((li) => ({
            id: li.id,
            style: li.style_number,
            desc: li.style_description,
            color: li.color_graphic || "—",
            qty: Number(li.po_qty) || 0,
            stage: li.current_stage || "Pre-Production",
            cutPlan: li.cutting_planned_date,
            cutActual: li.cutting_actual_date,
            sewPlan: li.sewing_planned_start,
            packPlan: li.packing_planned_date,
            exFactory: li.ex_factory_date,
            inLA: li.in_la_date,
            inDC: li.in_dc_date,
            shipMode: li.ship_mode,
            finishedQty: li.finished_qty,
            shippedQty: li.shipped_qty,
          })),
        };
      });

      setPoData(grouped);
      setDbStatus("live");
      setError(null);
    } catch (err) {
      console.error("Supabase fetch error:", err);
      setError(err.message);
      setDbStatus("fallback");
    }
  }, []);

  return { poData, dbStatus, error, fetchData };
}
