"use client";

import { useState, useRef, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  required?: boolean;
}

export function DatePicker({ value, onChange, required }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(value ? new Date(value) : new Date());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthLabel = viewDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const selectedDate = value ? new Date(value + "T00:00:00") : null;

  const isSameDay = (d: number) =>
    selectedDate &&
    selectedDate.getFullYear() === year &&
    selectedDate.getMonth() === month &&
    selectedDate.getDate() === d;

  const pickDay = (d: number) => {
    const picked = new Date(year, month, d);
    const iso = `${picked.getFullYear()}-${String(picked.getMonth() + 1).padStart(2, "0")}-${String(picked.getDate()).padStart(2, "0")}`;
    onChange(iso);
    setOpen(false);
  };

  const displayValue = selectedDate
    ? selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "";

  const days: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm text-left focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 transition-all"
      >
        <span className={displayValue ? "text-[var(--foreground)]" : "text-[var(--muted)]"}>
          {displayValue || "Select a date"}
        </span>
        <Calendar size={15} className="text-[var(--muted)] shrink-0" />
      </button>

      {/* Hidden required field to hook into native form validation */}
      {required && <input type="text" value={value} required onChange={() => {}} className="sr-only" tabIndex={-1} />}

      {open && (
        <div className="absolute left-0 top-full mt-1.5 w-72 rounded-lg border border-[var(--border)] bg-[var(--card)] shadow-lg z-50 p-3">
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={() => setViewDate(new Date(year, month - 1, 1))}
              className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[var(--border)]/40 text-[var(--muted)]"
            >
              <ChevronLeft size={15} />
            </button>
            <span className="text-sm font-medium text-[var(--foreground)]">{monthLabel}</span>
            <button
              type="button"
              onClick={() => setViewDate(new Date(year, month + 1, 1))}
              className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[var(--border)]/40 text-[var(--muted)]"
            >
              <ChevronRight size={15} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-1">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <div key={d} className="text-center text-xs text-[var(--muted)] py-1">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((d, i) =>
              d === null ? (
                <div key={i} />
              ) : (
                <button
                  key={i}
                  type="button"
                  onClick={() => pickDay(d)}
                  className={`w-8 h-8 flex items-center justify-center rounded-md text-sm transition-colors ${
                    isSameDay(d)
                      ? "bg-[var(--primary)] text-white"
                      : "text-[var(--foreground)] hover:bg-[var(--border)]/40"
                  }`}
                >
                  {d}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}