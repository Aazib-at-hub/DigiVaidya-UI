import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ToastProvider } from "@/components/ui/toast-provider";
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
  const nav = [
    { to: "/", label: "Dashboard" },
    { to: "/patients", label: "Patients" },
    { to: "/diet", label: "Diet" },
    { to: "/reports", label: "Reports" },
    { to: "/settings", label: "Settings" },
  ];
  return (
    <div className="min-h-screen flex flex-col soft-green-bg">
            <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="content-container flex h-16 items-center justify-between">
          <Link
            to="/"
            className="heading-serif text-xl font-bold gradient-text hover:scale-105 transition-transform"
          >
            DigiVaidya
          </Link>
          <nav className="flex items-center gap-8 text-sm">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-muted-foreground hover:text-foreground font-medium transition-colors relative group"
              >
                {n.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-200"></span>
              </Link>
            ))}
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <div className="flex-1">
        <main>
          <Outlet />
        </main>
      </div>

      <footer className="border-t bg-secondary/30">
        <div className="content-container py-8 text-center">
          <div className="space-y-2">
            <div className="heading-serif text-lg font-semibold gradient-text">
              DigiVaidya
            </div>
            <div className="text-sm text-muted-foreground">
              Ayurveda meets AI • Transforming Healthcare with Ancient Wisdom
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ToastProvider>
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
    </ToastProvider>
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
