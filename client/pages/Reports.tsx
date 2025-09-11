import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
};

export default function Reports() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [tab, setTab] = useState<"history" | "charts" | "download">("history");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [query, setQuery] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/patients");
        const data = await res.json();
        const list: Patient[] = data?.patients ?? [];
        setPatients(list);
        if (!patient && list.length) setPatient(list[0]);
      } catch {}
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
      },
    ];
  }, [patient]);

  return (
    <div className="container py-8 animate-fadein">
      <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-[280px_1fr]">
        {/* Patients list */}
        <Card className="shadow-sm h-fit">
          <CardHeader>
            <CardTitle className="heading-serif text-xl text-[hsl(125_55%_22%)]">
              Patients
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              placeholder="Search by name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="max-h-[480px] overflow-auto divide-y rounded-md">
              {filtered.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPatient(p)}
                  className={`w-full text-left px-2 py-2 hover:bg-secondary ${patient?.id === p.id ? "bg-secondary" : ""}`}
                >
                  <div className="font-medium">{p.fullName}</div>
                  <div className="text-xs text-muted-foreground">
                    {p.age} yrs • {p.gender}
                  </div>
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="text-sm text-muted-foreground px-2 py-4">
                  No patients found
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Report content */}
        <div className="space-y-6">
          <div className="space-y-1">
            <h1 className="heading-serif text-3xl md:text-4xl font-extrabold gradient-text">
              Patient Report
            </h1>
            <p className="text-sm text-muted-foreground">
              {patient ? (
                <span>
                  {patient.fullName} • {patient.age} yrs • {patient.gender} •
                  Dosha: {patient.dosha}
                </span>
              ) : (
                <span>Loading patient...</span>
              )}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <TabButton
              active={tab === "history"}
              onClick={() => setTab("history")}
            >
              Diet History
            </TabButton>
            <TabButton
              active={tab === "charts"}
              onClick={() => setTab("charts")}
            >
              Charts & Progress
            </TabButton>
            <TabButton
              active={tab === "download"}
              onClick={() => setTab("download")}
            >
              Download Report
            </TabButton>
          </div>

          {tab === "history" && (
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="heading-serif text-xl text-[hsl(125_55%_22%)]">
                  Consultation Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative pl-6">
                  <div className="absolute left-2 top-0 bottom-0 w-px bg-border" />
                  <div className="grid gap-6">
                    {history.map((h) => (
                      <div key={h.id} className="relative">
                        <span className="absolute -left-[7px] top-2 h-3.5 w-3.5 rounded-full bg-[hsl(123_46%_34%)]" />
                        <div className="rounded-lg border bg-card p-4 shadow-sm">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <div className="font-semibold text-[hsl(125_55%_22%)]">
                              {new Date(h.date).toLocaleDateString()}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Weight: {h.weight} kg • BMI: {h.bmi} • Conditions:{" "}
                              {h.conditions.join(", ") || "None"}
                            </div>
                          </div>
                          <div className="mt-2 text-sm">{h.planPreview}</div>
                          <div className="mt-3">
                            <button
                              className="text-sm text-[hsl(125_55%_22%)] hover:underline"
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
                            <div className="mt-3 grid gap-2">
                              {h.planFull.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="rounded-md border bg-secondary/40 p-3 text-sm"
                                >
                                  {item}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {tab === "charts" && (
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="heading-serif text-xl text-[hsl(125_55%_22%)]">
                    Dosha Balance
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center py-6">
                  <div
                    className="relative h-44 w-44 rounded-full"
                    style={{
                      background:
                        "conic-gradient(#9CCC65 0 40%, #66A6FF 40% 75%, #FFD166 75% 100%)",
                      mask: "radial-gradient(farthest-side, transparent 60%, black 61%)",
                      WebkitMask:
                        "radial-gradient(farthest-side, transparent 60%, black 61%)",
                    }}
                  />
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="heading-serif text-xl text-[hsl(125_55%_22%)]">
                    Nutrient Donut
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center py-6">
                  <div
                    className="relative h-44 w-44 rounded-full"
                    style={{
                      background:
                        "conic-gradient(#A5D6A7 0 50%, #80CBC4 50% 75%, #FFCC80 75% 90%, #CE93D8 90% 100%)",
                      mask: "radial-gradient(farthest-side, transparent 60%, black 61%)",
                      WebkitMask:
                        "radial-gradient(farthest-side, transparent 60%, black 61%)",
                    }}
                  />
                </CardContent>
              </Card>

              <Card className="shadow-sm md:col-span-2">
                <CardHeader>
                  <CardTitle className="heading-serif text-xl text-[hsl(125_55%_22%)]">
                    Progress Graph
                  </CardTitle>
                </CardHeader>
                <CardContent>
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
                  <p className="text-xs text-muted-foreground mt-2">
                    Weight (green) and BMI (blue) over time.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {tab === "download" && (
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="heading-serif text-xl text-[hsl(125_55%_22%)]">
                  Download & Print
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  className="h-12 px-8 rounded-xl bg-primary hover:bg-primary/90"
                  onClick={() => window.print()}
                >
                  Download Report
                </Button>
                <Button
                  className="h-12 px-8 rounded-xl bg-primary hover:bg-primary/90"
                  onClick={() => window.print()}
                >
                  Print Report
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm transition-colors ${
        active
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-foreground hover:bg-secondary/70"
      }`}
    >
      {children}
    </button>
  );
}
