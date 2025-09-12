import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PatientForm from "@/components/patients/PatientForm";
import { Breadcrumbs, QuickActionPanel, FloatingActionButton } from "@/components/ui/navigation";
import { InteractiveCard, InteractiveButton } from "@/components/ui/interactive";
import { HealthStatus, ConsultationBadge } from "@/components/ui/health-indicators";
import { useToast } from "@/components/ui/use-toast";

export default function Dashboard() {
  const { toast } = useToast();
  
  const reminders = [
    { 
      time: "Today 5:00 PM", 
      title: "Follow-up: Ananya Gupta",
      type: "follow-up",
      status: "pending"
    },
    { 
      time: "Tomorrow 10:30 AM", 
      title: "Diet review: Rahul Verma",
      type: "consultation", 
      status: "scheduled"
    },
  ];
  
  const notifications = [
    { 
      text: "New lab report uploaded by Ananya",
      icon: "health",
      time: "2 hours ago"
    },
    { 
      text: "System update completed successfully",
      icon: "check",
      time: "1 day ago"
    },
  ];

  const onSubmit = async (values: any) => {
    toast({
      title: "Saving Patient",
      description: "Please wait while we save the patient information...",
    });
    
    try {
      await fetch("/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      
      toast({
        title: "Patient Saved Successfully",
        description: `${values.fullName} has been added to the system.`,
      });
    } catch (error) {
      toast({
        title: "Error Saving Patient",
        description: "There was an issue saving the patient. Please try again.",
        variant: "destructive"
      });
    }
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
            onClick: () => toast({
              title: "Add Patient",
              description: "Opening patient registration form...",
            }),
            variant: "success"
          },
          {
            icon: "calendar",
            label: "Schedule",
            onClick: () => toast({
              title: "Schedule Appointment",
              description: "Opening appointment calendar...",
            }),
            variant: "primary"
          },
          {
            icon: "chart",
            label: "Reports",
            onClick: () => {
              toast({
                title: "Opening Reports",
                description: "Navigating to reports section...",
              });
              window.location.href = "/reports";
            },
            variant: "secondary"
          }
        ]}
        className="mb-8"
      />

      <div className="space-y-8">
        <div className="grid gap-8 md:grid-cols-2">
          <InteractiveCard hover glow>
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
                  className="flex items-center justify-between rounded-lg border border-border/50 p-4 shadow-soft hover:shadow-medium transition-all group cursor-pointer"
                  onClick={() => toast({
                    title: "Appointment Details",
                    description: `Opening details for ${r.title}`,
                  })}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="icon-doctor text-primary"></span>
                      <div className="font-semibold text-body">{r.title}</div>
                    </div>
                    <ConsultationBadge type={r.type} />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-subtle">{r.time}</div>
                    <span className="icon-arrow-right opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  </div>
                </div>
              ))}
              <InteractiveButton 
                variant="secondary" 
                className="w-full mt-4"
                onClick={() => toast({
                  title: "View All Appointments",
                  description: "Opening appointment calendar...",
                })}
              >
                <span className="icon-calendar"></span>
                View All Appointments
              </InteractiveButton>
            </CardContent>
          </InteractiveCard>
          
          <InteractiveCard hover glow>
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
                  className="rounded-lg border border-border/50 p-4 shadow-soft hover:shadow-medium transition-all group cursor-pointer"
                  onClick={() => toast({
                    title: "Notification Details",
                    description: n.text,
                  })}
                >
                  <div className="flex items-start gap-3">
                    <span className={`icon-${n.icon} text-primary flex-shrink-0 mt-1`}></span>
                    <div className="flex-1">
                      <div className="text-body mb-1">{n.text}</div>
                      <div className="text-subtle text-sm">{n.time}</div>
                    </div>
                    <span className="icon-arrow-right opacity-0 group-hover:opacity-100 transition-opacity text-subtle"></span>
                  </div>
                </div>
              ))}
              <InteractiveButton 
                variant="secondary" 
                className="w-full mt-4"
                onClick={() => toast({
                  title: "All Notifications",
                  description: "Opening notification center...",
                })}
              >
                <span className="icon-bell"></span>
                View All Notifications
              </InteractiveButton>
            </CardContent>
          </InteractiveCard>
        </div>

        <InteractiveCard hover glow>
          <CardHeader className="card-spacing">
            <CardTitle className="heading-secondary gradient-text flex items-center gap-2">
              <span className="icon-add"></span>
              Add New Patient
            </CardTitle>
          </CardHeader>
          <CardContent className="card-spacing">
            <PatientForm onSubmit={onSubmit} />
          </CardContent>
        </InteractiveCard>
      </div>

      {/* Floating Action Buttons */}
      <FloatingActionButton
        icon="help"
        label="Help & Support"
        onClick={() => toast({
          title: "Help & Support",
          description: "Opening help documentation...",
        })}
        variant="info"
        className="bottom-20 right-6"
      />
      
      <FloatingActionButton
        icon="settings"
        label="Quick Settings"
        onClick={() => toast({
          title: "Quick Settings",
          description: "Opening settings panel...",
        })}
        variant="secondary"
      />
    </div>
  );
}
