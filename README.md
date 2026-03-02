# OneTextile — WIP Production Dashboard

Real-time Work-In-Progress tracker for textile production, connected to Supabase.

![OneTextile Dashboard](https://img.shields.io/badge/status-live-22C55E) ![Supabase](https://img.shields.io/badge/database-Supabase-3ECF8E) ![React](https://img.shields.io/badge/frontend-React_+_Vite-61DAFB)

## Features

- **Live Supabase Connection** — Real-time data from `wip_purchase_orders` and `wip_line_items`
- **Order Tracker (WIP)** — Sidebar widget showing active POs, line items, and unit breakdown
- **Profit Tracker** — Monthly profit sparkline with margin tracking
- **Production Pipeline** — Visual stage breakdown (Pre-Production → Cutting → Sewing → Packing → Shipped)
- **Expandable PO Cards** — Click to drill into line-item detail per purchase order
- **Customer Filtering** — Filter dashboard by Giltee, Zuern, or BSF
- **Shipping Timeline** — Days-to-ex-factory bar chart

## Quick Start

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

Push to `main` — GitHub Actions auto-builds and deploys.

Or manually:
```bash
npm run deploy
```

## Database Setup

Run `supabase_wip_schema.sql` in your Supabase SQL Editor to create tables and seed data.

## Tech Stack

- **Frontend**: React 18 + Vite + Recharts
- **Database**: Supabase (PostgreSQL)
- **Hosting**: GitHub Pages
- **Design**: Warm Editorial (Source Serif 4 + DM Sans)
