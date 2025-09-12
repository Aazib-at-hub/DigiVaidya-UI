import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PatientForm from "@/components/patients/PatientForm";
import { Breadcrumbs, QuickActionPanel, FloatingActionButton, ModernSearch } from "@/components/ui/navigation";
import { InteractiveCard, InteractiveButton, LoadingSpinner } from "@/components/ui/interactive";
import { HealthStatus, ConsultationBadge, DoshaIndicator } from "@/components/ui/health-indicators";
import { useToast } from "@/components/ui/use-toast";
import type { Patient } from "../../server/routes/patients";

export default function Patients() {
  const { toast } = useToast();
  const [tab, setTab] = useState<"new" | "existing">("new");
  const [list, setList] = useState<Patient[]>([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (tab === "existing") {
      setLoading(true);
      setError(null);
      
      fetch("/api/patients")
        .then((r) => r.json())
        .then((d) => {
          setList(d.patients);
          toast({
            title: "Patients Loaded",
            description: `Found ${d.patients.length} patients in the system.`,
          });
        })
        .catch((err) => {
          setError("Failed to load patients");
          toast({
            title: "Error Loading Patients",
            description: "There was an issue loading the patient list.",
            variant: "destructive"
          });
        })
        .finally(() => setLoading(false));
    }
  }, [tab, toast]);

  const filtered = useMemo(() => {
    return list.filter((p) =>
      p.fullName.toLowerCase().includes(query.toLowerCase()),
    );
  }, [list, query]);

  const createPatient = async (values: any) => {
    toast({
      title: "Creating Patient",
      description: "Please wait while we add the new patient...",
    });
    
    try {
      const res = await fetch("/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const p = await res.json();
      
      toast({
        title: "Patient Created Successfully",
        description: `${p.fullName} has been added to the system.`,
      });
      
      setList((prev) => [p, ...prev]);
      setSelected(p);
      setTab("existing");
    } catch (error) {
      toast({
        title: "Error Creating Patient",
        description: "There was an issue creating the patient. Please try again.",
        variant: "destructive"
      });
    }
  };

  const updatePatient = async (values: any) => {
    if (!selected) return;
    
    toast({
      title: "Updating Patient",
      description: "Please wait while we save the changes...",
    });
    
    try {
      const res = await fetch(`/api/patients/${selected.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const p = await res.json();
      
      toast({
        title: "Patient Updated Successfully",
        description: `${p.fullName}'s information has been updated.`,
      });
      
      setList((prev) => prev.map((x) => (x.id === p.id ? p : x)));
      setSelected(p);
    } catch (error) {
      toast({
        title: "Error Updating Patient",
        description: "There was an issue updating the patient. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="content-container section-spacing">
      {/* Breadcrumbs */}
      <Breadcrumbs 
        items={[
          { label: "Dashboard", href: "/", icon: "home" },
          { label: "Patients", icon: "patients" }
        ]}
        className="mb-6"
      />

      {/* Quick Actions */}
      <QuickActionPanel
        actions={[
          {
            icon: "add",
            label: "New Patient",
            onClick: () => setTab("new"),
            variant: tab === "new" ? "primary" : "secondary"
          },
          {
            icon: "patients",
            label: "View Patients",
            onClick: () => setTab("existing"),
            variant: tab === "existing" ? "primary" : "secondary"
          },
          {
            icon: "export",
            label: "Export List",
            onClick: () => toast({
              title: "Exporting Patient List",
              description: "Preparing patient list for export...",
            }),
            variant: "secondary"
          }
        ]}
        className="mb-8"
      />

      <div className="space-y-8">

      {tab === "new" && (
        <InteractiveCard hover glow>
          <CardHeader className="card-spacing">
            <CardTitle className="heading-secondary gradient-text flex items-center gap-2">
              <span className="icon-add"></span>
              Create New Patient
            </CardTitle>
          </CardHeader>
          <CardContent className="card-spacing">
            <PatientForm submitLabel="Create" onSubmit={createPatient} />
          </CardContent>
        </InteractiveCard>
      )}

      {tab === "existing" && (
        <div className="grid gap-8 md:grid-cols-[320px_1fr]">
          <InteractiveCard hover glow className="h-fit">
            <CardHeader className="card-spacing">
              <CardTitle className="heading-secondary gradient-text flex items-center gap-2">
                <span className="icon-patients"></span>
                Patient List
              </CardTitle>
            </CardHeader>
            <CardContent className="card-spacing space-y-4">
              <ModernSearch
                placeholder="Search patients by name..."
                value={query}
                onChange={setQuery}
                suggestions={[]}
                icon="search"
                className="w-full"
              />
              
              {loading ? (
                <div className="space-y-3">
                  <LoadingSpinner size="sm" />
                  <p className="text-center text-subtle">Loading patients...</p>
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
                <div className="max-h-[480px] overflow-auto divide-y rounded-lg border border-border/50">
                  {filtered.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setSelected(p);
                        toast({
                          title: "Patient Selected",
                          description: `Viewing ${p.fullName}'s information`,
                        });
                      }}
                      className={`w-full text-left p-4 hover:bg-secondary/70 transition-all group ${
                        selected?.id === p.id ? "bg-secondary border-l-4 border-l-primary" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <div className="font-semibold text-body flex items-center gap-2">
                            <span className="icon-doctor"></span>
                            {p.fullName}
                          </div>
                          <div className="text-sm text-subtle flex items-center gap-3">
                            <span>{p.age} yrs • {p.gender}</span>
                            {p.dosha && <DoshaIndicator dosha={p.dosha} />}
                          </div>
                        </div>
                        <span className="icon-arrow-right opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      </div>
                    </button>
                  ))}
                  {filtered.length === 0 && !loading && (
                    <div className="text-subtle px-4 py-6 text-center">
                      No patients found
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </InteractiveCard>
          
          <InteractiveCard hover glow>
            <CardHeader className="card-spacing">
              <CardTitle className="heading-secondary gradient-text flex items-center gap-2">
                <span className="icon-edit"></span>
                Patient Details
              </CardTitle>
            </CardHeader>
            <CardContent className="card-spacing">
              {selected ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-secondary/30 rounded-lg">
                    <span className="icon-doctor text-2xl text-primary"></span>
                    <div>
                      <h3 className="font-semibold text-lg">{selected.fullName}</h3>
                      <div className="flex items-center gap-3 text-subtle">
                        <span>{selected.age} years old</span>
                        <span>•</span>
                        <span>{selected.gender}</span>
                        {selected.dosha && (
                          <>
                            <span>•</span>
                            <DoshaIndicator dosha={selected.dosha} />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <PatientForm
                    initialValues={selected}
                    submitLabel="Update Patient"
                    onSubmit={updatePatient}
                  />
                </div>
              ) : (
                <div className="text-center py-12">
                  <span className="icon-patients text-4xl text-subtle block mb-4"></span>
                  <h3 className="text-lg font-medium mb-2">No Patient Selected</h3>
                  <p className="text-subtle">
                    Select a patient from the list to view and update their details.
                  </p>
                </div>
              )}
            </CardContent>
          </InteractiveCard>
        </div>
      )}
      
      {/* Floating Action Buttons */}
      <FloatingActionButton
        icon="add"
        label="Quick Add Patient"
        onClick={() => {
          setTab("new");
          toast({
            title: "New Patient Form",
            description: "Opening patient registration form...",
          });
        }}
        variant="success"
        className="bottom-20 right-6"
      />
      
      <FloatingActionButton
        icon="search"
        label="Search Patients"
        onClick={() => {
          setTab("existing");
          toast({
            title: "Patient Search",
            description: "Opening patient database...",
          });
        }}
        variant="primary"
      />
      </div>
    </div>
  );
}
