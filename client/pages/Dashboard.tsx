import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PatientForm from "@/components/patients/PatientForm";

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
    <div className="py-6 space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="heading-serif text-xl text-primary">
              Appointment Reminders
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {reminders.map((r, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-md border p-3"
              >
                <div className="font-medium">{r.title}</div>
                <div className="text-sm text-muted-foreground">{r.time}</div>
              </div>
            ))}
          </CardContent>
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
