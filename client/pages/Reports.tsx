import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  HealthStatus, 
  DoshaIndicator, 
  VitalSignsCard, 
  ConsultationBadge 
} from "@/components/ui/health-indicators";
import { 
  Breadcrumbs, 
  FloatingActionButton, 
  ModernSearch, 
  QuickActionPanel 
} from "@/components/ui/navigation";
import {
  LoadingSpinner,
  LoadingSkeleton,
  InteractiveButton,
  InteractiveCard,
  ProgressIndicator,
  HoverCard
} from "@/components/ui/interactive";
import { useToast } from "@/components/ui/toast-provider";

type Patient = {
  id: string;
  fullName: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  weight: number;
  height: number;
  bmi: number;
  conditions: string[];
  dosha: "Vata" | "Pitta" | "Kapha" | "Mixed";
};

type HistoryEntry = {
  id: string;
  date: string;
  weight: number;
  bmi: number;
  conditions: string[];
  planPreview: string;
  planFull: string[];
  consultationType: "consultation" | "follow-up" | "emergency" | "routine";
  healthStatus: "excellent" | "good" | "moderate" | "poor";
};

export default function Reports() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [tab, setTab] = useState<"history" | "charts" | "download">("history");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { showSuccess, showError, showInfo } = useToast();

  // Sample patient suggestions for search
  const patientSuggestions = useMemo(
    () => patients.map(p => p.fullName).filter(name => 
      name.toLowerCase().includes(query.toLowerCase())
    ),
    [patients, query]
  );

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/patients");
        const data = await res.json();
        const list: Patient[] = data?.patients ?? [];
        setPatients(list);
        if (!patient && list.length) setPatient(list[0]);
        showInfo("Patient data loaded successfully");
      } catch (err) {
        setError("Failed to load patients");
        showError("Failed to load patient data");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(
    () =>
      patients.filter((p) =>
        p.fullName.toLowerCase().includes(query.toLowerCase()),
      ),
    [patients, query],
  );

  const history: HistoryEntry[] = useMemo(() => {
    const baseWeight = patient?.weight ?? 70;
    const baseBMI = patient?.bmi ?? 24.2;
    const conds = patient?.conditions ?? ["None"];
    return [
      {
        id: "h3",
        date: "2025-02-15",
        weight: Number((baseWeight - 2.1).toFixed(1)),
        bmi: Number((baseBMI - 0.7).toFixed(1)),
        conditions: conds,
        planPreview:
          "Warm, grounding diet with Moong Dal Khichdi and herbal teas.",
        planFull: [
          "Breakfast: Moong Dal Khichdi with ghee",
          "Lunch: Steamed rice, veg curry, cumin buttermilk",
          "Dinner: Roti, dal, sautéed veggies",
          "Snacks: Soaked almonds, ginger tea",
        ],
        consultationType: "follow-up",
        healthStatus: "good",
      },
      {
        id: "h2",
        date: "2025-01-15",
        weight: Number((baseWeight - 1.0).toFixed(1)),
        bmi: Number((baseBMI - 0.3).toFixed(1)),
        conditions: conds,
        planPreview: "Pacifying Vata with warm soups and lightly spiced meals.",
        planFull: [
          "Breakfast: Oats with warm milk & dates",
          "Lunch: Khichdi, seasonal veg, ghee",
          "Dinner: Rice porridge, sautéed spinach",
          "Snacks: Nuts, golden milk",
        ],
        consultationType: "routine",
        healthStatus: "excellent",
      },
      {
        id: "h1",
        date: "2024-12-15",
        weight: Number(baseWeight.toFixed(1)),
        bmi: Number(baseBMI.toFixed(1)),
        conditions: conds,
        planPreview:
          "Baseline plan with gentle spices and easy-to-digest foods.",
        planFull: [
          "Breakfast: Poha with peanuts",
          "Lunch: Rice, dal, mixed veg",
          "Dinner: Chapati, dal",
          "Snacks: Fruit, herbal tea",
        ],
        consultationType: "consultation",
        healthStatus: "good",
      },
    ];
  }, [patient]);

  return (
    <div className="content-container section-spacing animate-fadein">
      {/* Breadcrumbs */}
      <Breadcrumbs 
        items={[
          { label: "Dashboard", href: "/", icon: "home" },
          { label: "Reports", icon: "chart" },
          ...(patient ? [{ label: patient.fullName, icon: "user" }] : [])
        ]}
        className="mb-6"
      />

      <div className="mx-auto max-w-6xl grid gap-8 md:grid-cols-[300px_1fr]">
        {/* Patients list */}
        <InteractiveCard hover glow className="h-fit">
          <CardHeader className="card-spacing">
            <CardTitle className="heading-secondary gradient-text">
              Patients
            </CardTitle>
          </CardHeader>
          <CardContent className="card-spacing space-y-4">
            <ModernSearch
              placeholder="Search patients by name..."
              value={query}
              onChange={setQuery}
              suggestions={patientSuggestions}
              icon="search"
              className="w-full"
            />
            
            {loading ? (
              <div className="space-y-3">
                <LoadingSkeleton lines={3} />
                <LoadingSkeleton lines={2} />
                <LoadingSkeleton lines={3} />
              </div>
            ) : error ? (
              <div className="state-error rounded-lg p-4 text-center">
                <span className="block mb-2">⚠️</span>
                <span>{error}</span>
                <InteractiveButton
                  variant="danger"
                  size="sm"
                  className="mt-2"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </InteractiveButton>
              </div>
            ) : (
              <div className="max-h-[480px] overflow-auto divide-y rounded-lg border border-border/50"
                style={{ scrollbarWidth: 'thin' }}
              >
              {filtered.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPatient(p)}
                  className={`w-full text-left px-4 py-3 hover:bg-secondary/70 transition-all duration-200 ${
                    patient?.id === p.id ? "bg-secondary shadow-soft" : ""
                  }`}
                >
                  <div className="font-semibold text-body flex items-center gap-2">
                    <span className="icon-doctor"></span>
                    {p.fullName}
                  </div>
                  <div className="text-subtle flex items-center gap-2 mt-1">
                    <span>{p.age} yrs • {p.gender}</span>
                    <DoshaIndicator dosha={p.dosha} />
                  </div>
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="text-subtle px-4 py-6 text-center">
                  No patients found
                </div>
              )}
            </div>
            )}
          </CardContent>
        </InteractiveCard>

        {/* Report content */}
        <div className="space-y-8">
          <div className="space-y-3">
            <h1 className="heading-serif text-4xl md:text-5xl font-extrabold gradient-text">
              Patient Report
            </h1>
            <p className="text-subtle text-lg">
              {patient ? (
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="flex items-center gap-2">
                    <span className="icon-doctor"></span>
                    {patient.fullName} • {patient.age} yrs • {patient.gender}
                  </span>
                  <DoshaIndicator dosha={patient.dosha} />
                </div>
              ) : (
                <span>Loading patient...</span>
              )}
            </p>
          </div>

          {/* Quick Actions */}
          <QuickActionPanel
            actions={[
              {
                icon: "add",
                label: "Add Patient",
                onClick: () => alert("Add Patient"),
                variant: "success"
              },
              {
                icon: "filter",
                label: "Filter",
                onClick: () => alert("Filter Reports"),
                variant: "primary"
              },
              {
                icon: "export",
                label: "Export All",
                onClick: () => alert("Export Reports"),
                variant: "secondary"
              }
            ]}
            className="mb-6"
          />

          {/* Vital Signs Overview */}
          {patient && (
            <InteractiveCard hover glow>
              <CardHeader className="card-spacing">
                <CardTitle className="heading-secondary gradient-text flex items-center gap-2">
                  <span className="icon-health"></span>
                  Current Vital Signs
                </CardTitle>
              </CardHeader>
              <CardContent className="card-spacing">
                <VitalSignsCard
                  weight={patient.weight}
                  height={patient.height}
                  bmi={patient.bmi}
                  heartRate={72}
                  bloodPressure="120/80"
                />
              </CardContent>
            </InteractiveCard>
          )}

          <div className="flex flex-wrap gap-3">
            <InteractiveButton
              variant={tab === "history" ? "primary" : "secondary"}
              size="sm"
              onClick={() => setTab("history")}
              className={tab === "history" ? "tab-active" : ""}
            >
              Diet History
            </InteractiveButton>
            <InteractiveButton
              variant={tab === "charts" ? "primary" : "secondary"}
              size="sm"
              onClick={() => setTab("charts")}
              className={tab === "charts" ? "tab-active" : ""}
            >
              Charts & Progress
            </InteractiveButton>
            <InteractiveButton
              variant={tab === "download" ? "primary" : "secondary"}
              size="sm"
              onClick={() => setTab("download")}
              className={tab === "download" ? "tab-active" : ""}
            >
              Download Report
            </InteractiveButton>
          </div>

          {tab === "history" && (
            <InteractiveCard hover glow>
              <CardHeader className="card-spacing">
                <CardTitle className="heading-secondary gradient-text">
                  Consultation Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="card-spacing">
                <div className="relative pl-12">
                  {/* Timeline line */}
                  <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/60 to-accent/40" />
                  
                  <div className="space-y-8">
                    {history.map((h, index) => (
                      <div key={h.id} className="relative">
                        {/* Timeline dot - perfectly aligned with the line */}
                        <div className="absolute -left-[7px] top-8 h-3.5 w-3.5 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg border-2 border-background z-10">
                          <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-primary/20 to-accent/20"></div>
                        </div>
                        
                        {/* Timeline connector for better visual flow */}
                        {index === 0 && (
                          <div className="absolute -left-[6px] top-0 h-8 w-px bg-gradient-to-b from-transparent to-primary/60"></div>
                        )}
                        
                        <div className="card-enhanced p-6 hover:shadow-deep transition-all duration-300 border-l-2 border-l-primary/20">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="heading-tertiary text-foreground flex items-center gap-2">
                                <span className="icon-calendar"></span>
                                {new Date(h.date).toLocaleDateString()}
                              </div>
                              <ConsultationBadge type={h.consultationType} />
                              <HealthStatus status={h.healthStatus}>
                                {h.healthStatus}
                              </HealthStatus>
                            </div>
                            <div className="text-subtle flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <span className="icon-weight"></span>
                                {h.weight} kg
                              </span>
                              <span className="flex items-center gap-1">
                                <span className="icon-pulse"></span>
                                BMI: {h.bmi}
                              </span>
                              <span>Conditions: {h.conditions.join(", ") || "None"}</span>
                            </div>
                          </div>
                          <div className="mt-4 text-body flex items-start gap-2">
                            <span className="icon-medicine"></span>
                            {h.planPreview}
                          </div>
                          <div className="mt-4">
                            <button
                              className="text-sm text-primary hover:underline font-medium transition-colors"
                              onClick={() =>
                                setExpanded((e) => ({ ...e, [h.id]: !e[h.id] }))
                              }
                            >
                              {expanded[h.id]
                                ? "Hide full diet plan"
                                : "Show full diet plan"}
                            </button>
                          </div>
                          {expanded[h.id] && (
                            <div className="mt-6 grid gap-3">
                              {h.planFull.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="rounded-lg border bg-secondary/30 p-4 text-body shadow-soft"
                                >
                                  {item}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {/* Timeline end cap */}
                    <div className="relative">
                      <div className="absolute -left-[6px] -top-4 h-3 w-3 rounded-full bg-gradient-to-br from-accent to-secondary border-2 border-background shadow-medium"></div>
                      <div className="text-center py-4">
                        <p className="text-subtle text-sm">Timeline Complete</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </InteractiveCard>
          )}

          {tab === "charts" && (
            <div className="grid gap-8 md:grid-cols-2">
              <InteractiveCard hover glow>
                <CardHeader className="card-spacing">
                  <CardTitle className="heading-secondary gradient-text flex items-center gap-2">
                    <span className="icon-chart"></span>
                    Dosha Balance
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center py-8">
                  <div className="relative">
                    <div
                      className="relative h-48 w-48 rounded-full shadow-medium"
                      style={{
                        background:
                          "conic-gradient(#9CCC65 0 40%, #66A6FF 40% 75%, #FFD166 75% 100%)",
                        mask: "radial-gradient(farthest-side, transparent 60%, black 61%)",
                        WebkitMask:
                          "radial-gradient(farthest-side, transparent 60%, black 61%)",
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <DoshaIndicator dosha={patient?.dosha || "Mixed"} />
                    </div>
                  </div>
                </CardContent>
              </InteractiveCard>

              <InteractiveCard hover glow>
                <CardHeader className="card-spacing">
                  <CardTitle className="heading-secondary gradient-text flex items-center gap-2">
                    <span className="icon-heart"></span>
                    Health Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="card-spacing space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="medical-metric metric-normal">
                      <div className="text-center">
                        <div className="text-2xl font-bold">72</div>
                        <div className="text-sm">Heart Rate</div>
                      </div>
                    </div>
                    <div className="medical-metric metric-normal">
                      <div className="text-center">
                        <div className="text-2xl font-bold">98.6°F</div>
                        <div className="text-sm">Temperature</div>
                      </div>
                    </div>
                  </div>
                  <div className="medical-metric metric-normal">
                    <div className="text-center">
                      <div className="text-xl font-bold">120/80</div>
                      <div className="text-sm">Blood Pressure (mmHg)</div>
                    </div>
                  </div>
                </CardContent>
              </InteractiveCard>

              <InteractiveCard hover glow className="md:col-span-2">
                <CardHeader className="card-spacing">
                  <CardTitle className="heading-secondary gradient-text flex items-center gap-2">
                    <span className="icon-pulse"></span>
                    Progress Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent className="card-spacing">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-subtle">Weight Progress</span>
                      <HealthStatus status="good">Improving</HealthStatus>
                    </div>
                    <svg viewBox="0 0 500 140" className="w-full h-40">
                      <polyline
                        fill="none"
                        className="chart-secondary-stroke"
                        strokeWidth="3"
                        points="0,120 60,115 120,110 180,100 240,95 300,90 360,85 420,80 480,78"
                      />
                      <polyline
                        fill="none"
                        className="chart-primary-stroke"
                        strokeWidth="3"
                        points="0,125 60,118 120,114 180,108 240,100 300,96 360,90 420,86 480,82"
                      />
                    </svg>
                    <div className="flex items-center justify-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>Weight (kg)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span>BMI</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </InteractiveCard>
            </div>
          )}

          {tab === "download" && (
            <InteractiveCard hover glow>
              <CardHeader className="card-spacing">
                <CardTitle className="heading-secondary gradient-text flex items-center gap-2">
                  <span className="icon-chart"></span>
                  Download & Print
                </CardTitle>
              </CardHeader>
              <CardContent className="card-spacing">
                <div className="text-center space-y-6">
                  <div className="text-subtle">
                    Generate comprehensive medical reports for {patient?.fullName || "patient"}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <InteractiveButton
                      variant="primary"
                      size="lg"
                      className="h-12 px-8 rounded-xl flex items-center gap-2"
                      onClick={() => {
                        toast({
                          title: "Downloading Report",
                          description: "Your report is being prepared...",
                        });
                        // Simulate download
                        setTimeout(() => {
                          toast({
                            title: "Download Complete",
                            description: "Report downloaded successfully!",
                          });
                        }, 2000);
                      }}
                    >
                      <span className="icon-chart"></span>
                      Download Report
                    </InteractiveButton>
                    <InteractiveButton
                      variant="secondary"
                      size="lg"
                      className="h-12 px-8 rounded-xl flex items-center gap-2"
                      onClick={() => {
                        toast({
                          title: "Preparing Print",
                          description: "Opening print dialog...",
                        });
                        window.print();
                      }}
                    >
                      <span className="icon-medicine"></span>
                      Print Report
                    </InteractiveButton>
                  </div>
                </div>
              </CardContent>
            </InteractiveCard>
          )}
        </div>
      </div>

      {/* Floating Action Buttons */}
      <FloatingActionButton
        icon="bell"
        label="Notifications"
        onClick={() => toast({
          title: "Notifications",
          description: "3 new notifications available",
        })}
        variant="warning"
        className="bottom-20 right-6"
      />
      
      <FloatingActionButton
        icon="add"
        label="Quick Add"
        onClick={() => toast({
          title: "Quick Add Patient",
          description: "Patient form opened in new tab",
        })}
        variant="success"
      />
    </div>
  );
}

// LoadingSkeleton component for loading states
function LoadingSkeleton({ 
  lines = 1, 
  className = "" 
}: { 
  lines?: number; 
  className?: string; 
}) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-secondary/50 rounded-lg h-4"
          style={{ 
            width: `${Math.random() * 40 + 60}%`,
            animationDelay: `${i * 0.1}s`
          }}
        />
      ))}
    </div>
  );
}
