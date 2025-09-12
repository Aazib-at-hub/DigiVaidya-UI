import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PatientForm from "@/components/patients/PatientForm";
import { Breadcrumbs, QuickActionPanel } from "@/components/ui/navigation";

export default function Dashboard() {
  const reminders = [
    { time: "Today 5:00 PM", title: "Follow-up: Ananya Gupta" },
    { time: "Tomorrow 10:30 AM", title: "Diet review: Rahul Verma" },
  ];
  const notifications = [
    { text: "New lab report uploaded by Ananya" },
    { text: "System update completed successfully" },
  ];

  const onSubmit = async (values: any) => {
    await fetch("/api/patients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    alert("Patient saved (mock)");
  };

  return (
    <div className="content-container section-spacing">
      {/* Breadcrumbs */}
      <Breadcrumbs 
        items={[
          { label: "Dashboard", icon: "home" }
        ]}
        className="mb-6"
      />

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
            icon: "calendar",
            label: "Schedule",
            onClick: () => alert("Schedule Appointment"),
            variant: "primary"
          },
          {
            icon: "chart",
            label: "Reports",
            onClick: () => window.location.href = "/reports",
            variant: "secondary"
          }
        ]}
        className="mb-8"
      />

      <div className="space-y-8">
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="card-enhanced">
            <CardHeader className="card-spacing">
              <CardTitle className="heading-secondary gradient-text flex items-center gap-2">
                <span className="icon-calendar"></span>
                Appointment Reminders
              </CardTitle>
            </CardHeader>
                    <CardContent className="card-spacing space-y-4">
            {reminders.map((r, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-border/50 p-4 shadow-soft hover:shadow-medium transition-all"
              >
                <div className="font-semibold text-body">{r.title}</div>
                <div className="text-subtle">{r.time}</div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="card-enhanced">
          <CardHeader className="card-spacing">
            <CardTitle className="heading-secondary gradient-text flex items-center gap-2">
              <span className="icon-bell"></span>
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="card-spacing space-y-4">
            {notifications.map((n, i) => (
              <div
                key={i}
                className="rounded-lg border border-border/50 p-4 shadow-soft hover:shadow-medium transition-all"
              >
                <div className="text-body">{n.text}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="card-enhanced">
        <CardHeader className="card-spacing">
          <CardTitle className="heading-secondary gradient-text flex items-center gap-2">
            <span className="icon-add"></span>
            Add New Patient
          </CardTitle>
        </CardHeader>
        <CardContent className="card-spacing">
          <PatientForm onSubmit={onSubmit} />
        </CardContent>
      </Card>
    </div>
    </div>
  );
}
        </Card>
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="heading-serif text-xl text-primary">
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {notifications.map((n, i) => (
              <div key={i} className="rounded-md border p-3 text-sm">
                {n.text}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="heading-serif text-xl text-primary">
            New Patient
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PatientForm submitLabel="Save Patient" onSubmit={onSubmit} />
        </CardContent>
      </Card>
    </div>
  );
}
