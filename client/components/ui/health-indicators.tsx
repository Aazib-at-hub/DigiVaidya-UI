import { cn } from "@/lib/utils";

interface HealthStatusProps {
  status: "excellent" | "good" | "moderate" | "poor";
  children: React.ReactNode;
  className?: string;
}

export function HealthStatus({ status, children, className }: HealthStatusProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border",
        `health-status-${status}`,
        className
      )}
    >
      {children}
    </span>
  );
}

interface DoshaIndicatorProps {
  dosha: "Vata" | "Pitta" | "Kapha" | "Mixed";
  className?: string;
}

export function DoshaIndicator({ dosha, className }: DoshaIndicatorProps) {
  const doshaClass = `dosha-${dosha.toLowerCase()}`;
  
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border",
        doshaClass,
        className
      )}
    >
      🧘 {dosha}
    </span>
  );
}

interface MedicalMetricProps {
  label: string;
  value: string | number;
  unit?: string;
  status?: "normal" | "warning" | "critical";
  icon?: string;
  className?: string;
}

export function MedicalMetric({ 
  label, 
  value, 
  unit, 
  status = "normal", 
  icon,
  className 
}: MedicalMetricProps) {
  return (
    <div className={cn("medical-metric", `metric-${status}`, className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon && <span className={`icon-${icon}`}></span>}
          <span className="text-sm font-medium">{label}</span>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold">
            {value}
            {unit && <span className="text-sm font-normal ml-1">{unit}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

interface VitalSignsCardProps {
  weight: number;
  height: number;
  bmi: number;
  bloodPressure?: string;
  heartRate?: number;
  className?: string;
}

export function VitalSignsCard({ 
  weight, 
  height, 
  bmi, 
  bloodPressure, 
  heartRate,
  className 
}: VitalSignsCardProps) {
  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return "warning";
    if (bmi >= 18.5 && bmi < 25) return "normal";
    if (bmi >= 25 && bmi < 30) return "warning";
    return "critical";
  };

  return (
    <div className={cn("grid grid-cols-2 gap-4", className)}>
      <MedicalMetric
        label="Weight"
        value={weight}
        unit="kg"
        icon="weight"
        status="normal"
      />
      <MedicalMetric
        label="Height"
        value={height}
        unit="cm"
        status="normal"
      />
      <MedicalMetric
        label="BMI"
        value={bmi.toFixed(1)}
        status={getBMIStatus(bmi)}
        icon="pulse"
      />
      {heartRate && (
        <MedicalMetric
          label="Heart Rate"
          value={heartRate}
          unit="bpm"
          icon="heart"
          status={heartRate >= 60 && heartRate <= 100 ? "normal" : "warning"}
        />
      )}
      {bloodPressure && (
        <div className="col-span-2">
          <MedicalMetric
            label="Blood Pressure"
            value={bloodPressure}
            unit="mmHg"
            icon="pulse"
            status="normal"
          />
        </div>
      )}
    </div>
  );
}

interface ConsultationBadgeProps {
  type: "consultation" | "follow-up" | "emergency" | "routine";
  className?: string;
}

export function ConsultationBadge({ type, className }: ConsultationBadgeProps) {
  const getTypeConfig = (type: string) => {
    switch (type) {
      case "emergency":
        return { icon: "🚨", color: "bg-red-100 text-red-800 border-red-200" };
      case "follow-up":
        return { icon: "🔄", color: "bg-blue-100 text-blue-800 border-blue-200" };
      case "routine":
        return { icon: "📋", color: "bg-green-100 text-green-800 border-green-200" };
      default:
        return { icon: "👩‍⚕️", color: "bg-purple-100 text-purple-800 border-purple-200" };
    }
  };

  const config = getTypeConfig(type);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border",
        config.color,
        className
      )}
    >
      <span>{config.icon}</span>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  );
}
