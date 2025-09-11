import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Results from "./pages/Results";
import Patients from "./pages/Patients";
import Reports from "./pages/Reports";

const queryClient = new QueryClient();

import { useState, useEffect } from "react";
import Placeholder from "./pages/Placeholder";

function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : false;
  });
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);
  return (
    <button
      onClick={() => setIsDark((v) => !v)}
      className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm hover:bg-secondary transition-colors"
      aria-pressed={isDark}
      aria-label="Toggle dark mode"
      title={isDark ? "Switch to light" : "Switch to dark"}
    >
      <span className="text-base">{isDark ? "🌙" : "🌞"}</span>
      <span className="hidden sm:inline">{isDark ? "Dark" : "Light"}</span>
    </button>
  );
}

function Layout() {
  const [open, setOpen] = useState(true);
  const nav = [
    { to: "/", label: "Dashboard" },
    { to: "/patients", label: "Patients" },
    { to: "/diet", label: "Diet" },
    { to: "/reports", label: "Reports" },
    { to: "/settings", label: "Settings" },
  ];
  return (
    <div className="min-h-screen flex flex-col soft-green-bg">
      <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))]" />
            <span className="text-xl font-semibold heading-serif text-primary">
              DigiVaidya
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-muted-foreground hover:text-foreground"
              >
                {n.label}
              </Link>
            ))}
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <div className="flex-1 container grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 py-6">
        <aside
          className={`${open ? "w-60" : "w-16"} transition-all hidden lg:block`}
        >
          <div className="rounded-xl border bg-card shadow-sm p-3">
            <button
              onClick={() => setOpen((v) => !v)}
              className="mb-3 text-xs text-muted-foreground hover:text-foreground"
            >
              {open ? "Collapse" : "Expand"}
            </button>
            <div className="grid gap-2">
              <Link to="#" className="rounded-md px-3 py-2 hover:bg-secondary">
                Add Patient
              </Link>
              <Link to="#" className="rounded-md px-3 py-2 hover:bg-secondary">
                Appointments
              </Link>
              <Link to="#" className="rounded-md px-3 py-2 hover:bg-secondary">
                Notifications
              </Link>
            </div>
          </div>
        </aside>
        <main>
          <Outlet />
        </main>
      </div>

      <footer className="border-t">
        <div className="container py-6 text-center text-sm text-muted-foreground">
          Powered by DigiVaidya | Ayurveda meets AI
        </div>
      </footer>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/diet" element={<Results />} />
            <Route path="/results" element={<Results />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/reports" element={<Reports />} />
            <Route
              path="/settings"
              element={<Placeholder title="Settings" />}
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

const container = document.getElementById("root");
if (container) {
  const w = window as any;
  if (!w.__DIGIVAIDYA_ROOT) {
    w.__DIGIVAIDYA_ROOT = createRoot(container);
  }
  w.__DIGIVAIDYA_ROOT.render(<App />);
}
