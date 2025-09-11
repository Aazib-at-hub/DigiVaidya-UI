import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PatientForm from "@/components/patients/PatientForm";
import type { Patient } from "../../server/routes/patients";

export default function Patients() {
  const [tab, setTab] = useState<"new" | "existing">("new");
  const [list, setList] = useState<Patient[]>([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Patient | null>(null);

  useEffect(() => {
    if (tab === "existing") {
      fetch("/api/patients")
        .then((r) => r.json())
        .then((d) => setList(d.patients));
    }
  }, [tab]);

  const filtered = useMemo(() => {
    return list.filter((p) =>
      p.fullName.toLowerCase().includes(query.toLowerCase()),
    );
  }, [list, query]);

  const createPatient = async (values: any) => {
    const res = await fetch("/api/patients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const p = await res.json();
    alert("Patient created");
    setList((prev) => [p, ...prev]);
    setSelected(p);
    setTab("existing");
  };

  const updatePatient = async (values: any) => {
    if (!selected) return;
    const res = await fetch(`/api/patients/${selected.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const p = await res.json();
    alert("Patient updated");
    setList((prev) => prev.map((x) => (x.id === p.id ? p : x)));
    setSelected(p);
  };

  return (
    <div className="py-6 space-y-4">
      <div className="flex items-center gap-3">
        <Button
          variant={tab === "new" ? "default" : "secondary"}
          onClick={() => setTab("new")}
        >
          New Patient
        </Button>
        <Button
          variant={tab === "existing" ? "default" : "secondary"}
          onClick={() => setTab("existing")}
        >
          Existing Patient
        </Button>
      </div>

      {tab === "new" && (
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="heading-serif text-xl text-primary">
              Create New Patient
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PatientForm submitLabel="Create" onSubmit={createPatient} />
          </CardContent>
        </Card>
      )}

      {tab === "existing" && (
        <div className="grid gap-6 md:grid-cols-[280px_1fr]">
          <Card className="shadow-sm h-fit">
            <CardHeader>
              <CardTitle className="heading-serif text-xl text-primary">
                Patients
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                placeholder="Search by name"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="max-h-[420px] overflow-auto divide-y">
                {filtered.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelected(p)}
                    className={`w-full text-left px-2 py-2 hover:bg-secondary ${selected?.id === p.id ? "bg-secondary" : ""}`}
                  >
                    <div className="font-medium">{p.fullName}</div>
                    <div className="text-xs text-muted-foreground">
                      {p.age} yrs • {p.gender}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="heading-serif text-xl text-primary">
                Update / Modify
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selected ? (
                <PatientForm
                  initialValues={selected}
                  submitLabel="Update"
                  onSubmit={updatePatient}
                />
              ) : (
                <div className="text-muted-foreground">
                  Select a patient from the list to view and update details.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
