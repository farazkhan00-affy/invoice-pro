"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { TrendingUp, DollarSign, Users, AlertCircle } from "lucide-react";

const revenueData = [
  { month: "Feb", revenue: 3200 },
  { month: "Mar", revenue: 4100 },
  { month: "Apr", revenue: 3800 },
  { month: "May", revenue: 5200 },
  { month: "Jun", revenue: 4900 },
  { month: "Jul", revenue: 6100 },
  { month: "Aug", revenue: 5800 },
];

const topClients = [
  { name: "Acme Corp", amount: 9600 },
  { name: "Nova Tech", amount: 7200 },
  { name: "Bright Studio", amount: 4250 },
  { name: "Orbit Digital", amount: 1800 },
  { name: "Pixel Labs", amount: 3600 },
];

const stats = [
  { label: "This Month", value: "$5,800", icon: DollarSign, change: "+18%" },
  { label: "Growth Rate", value: "12.5%", icon: TrendingUp, change: "vs last month" },
  { label: "Active Clients", value: "18", icon: Users, change: "+2 new" },
  { label: "Overdue Amount", value: "$2,400", icon: AlertCircle, change: "1 invoice" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Analytics</h1>
        <p className="text-sm text-[var(--muted)] mt-1">Track your business performance</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)]"
          >
            <div className="w-9 h-9 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center mb-3">
              <stat.icon size={17} className="text-[var(--primary)]" />
            </div>
            <p className="text-2xl font-bold text-[var(--foreground)]">{stat.value}</p>
            <p className="text-xs text-[var(--muted)] mt-1">{stat.label}</p>
            <p className="text-xs text-[var(--muted)] mt-2">{stat.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Revenue trend chart */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]"
      >
        <h3 className="font-semibold text-[var(--foreground)] mb-1">Revenue Trend</h3>
        <p className="text-sm text-[var(--muted)] mb-6">Last 7 months</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" stroke="var(--muted)" fontSize={12} />
              <YAxis stroke="var(--muted)" fontSize={12} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  fontSize: "13px",
                }}
                formatter={(value) => value ? [`$${value}`, "Revenue"] : null}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="var(--primary)"
                strokeWidth={2.5}
                dot={{ fill: "var(--primary)", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Top clients chart */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]"
      >
        <h3 className="font-semibold text-[var(--foreground)] mb-1">Top Clients by Revenue</h3>
        <p className="text-sm text-[var(--muted)] mb-6">Total billed amount</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topClients} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" stroke="var(--muted)" fontSize={12} tickFormatter={(v) => `$${v / 1000}k`} />
              <YAxis dataKey="name" type="category" stroke="var(--muted)" fontSize={12} width={90} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  fontSize: "13px",
                }}
                formatter={(value) => value ? [`$${value}`, "Billed"] : null}
              />
              <Bar dataKey="amount" fill="var(--primary)" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}