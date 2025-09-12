import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8"
  };

  return (
    <div
      className={cn(
        "loading-spinner border-2 border-muted border-t-primary",
        sizes[size],
        className
      )}
    />
  );
}

interface LoadingSkeletonProps {
  className?: string;
  lines?: number;
}

export function LoadingSkeleton({ className, lines = 1 }: LoadingSkeletonProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "loading-skeleton rounded h-4",
            i === lines - 1 && lines > 1 && "w-3/4" // Last line shorter
          )}
        />
      ))}
    </div>
  );
}

interface InteractiveButtonProps {
  children: React.ReactNode;
  onClick?: () => void | Promise<void>;
  variant?: "primary" | "secondary" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export function InteractiveButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className
}: InteractiveButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    success: "bg-green-600 text-white hover:bg-green-700",
    warning: "bg-yellow-600 text-white hover:bg-yellow-700",
    danger: "bg-red-600 text-white hover:bg-red-700"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  const handleClick = async () => {
    if (!onClick || disabled || loading || isLoading) return;
    
    setIsLoading(true);
    try {
      await onClick();
    } finally {
      setIsLoading(false);
    }
  };

  const isDisabled = disabled || loading || isLoading;

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={cn(
        "btn-interactive rounded-lg font-medium flex items-center gap-2",
        variants[variant],
        sizes[size],
        isDisabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {(loading || isLoading) && <LoadingSpinner size="sm" />}
      {children}
    </button>
  );
}

interface ToastProps {
  message: string;
  type: "success" | "error" | "warning" | "info";
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

export function Toast({ 
  message, 
  type, 
  onClose, 
  autoClose = true, 
  duration = 3000 
}: ToastProps) {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  const icons = {
    success: "✅",
    error: "❌", 
    warning: "⚠️",
    info: "ℹ️"
  };

  return (
    <div
      className={cn(
        "fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-large border",
        "animate-slideup",
        `state-${type}`
      )}
    >
      <span className="text-lg">{icons[type]}</span>
      <span className="font-medium">{message}</span>
      <button
        onClick={onClose}
        className="text-lg hover:opacity-70 transition-opacity ml-2"
      >
        ×
      </button>
    </div>
  );
}

interface InteractiveCardProps {
  children: React.ReactNode;
  hover?: boolean;
  glow?: boolean;
  lift?: boolean;
  className?: string;
  onClick?: () => void;
}

export function InteractiveCard({
  children,
  hover = true,
  glow = false,
  lift = true,
  className,
  onClick
}: InteractiveCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "card-enhanced",
        hover && "hover:border-primary/30 hover:shadow-medium",
        glow && "hover-glow",
        lift && "hover-lift",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}

interface ProgressIndicatorProps {
  progress: number; // 0-100
  label?: string;
  showPercentage?: boolean;
  variant?: "primary" | "success" | "warning" | "danger";
  animated?: boolean;
  className?: string;
}

export function ProgressIndicator({
  progress,
  label,
  showPercentage = true,
  variant = "primary",
  animated = true,
  className
}: ProgressIndicatorProps) {
  const variants = {
    primary: "bg-primary",
    success: "bg-green-500",
    warning: "bg-yellow-500", 
    danger: "bg-red-500"
  };

  return (
    <div className={cn("space-y-2", className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between text-sm">
          {label && <span className="font-medium">{label}</span>}
          {showPercentage && <span className="text-muted-foreground">{progress}%</span>}
        </div>
      )}
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <div
          className={cn(
            "h-2 rounded-full transition-all duration-500 ease-out",
            variants[variant],
            animated && "animate-pulse-soft"
          )}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
}

interface HoverCardProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  className?: string;
}

export function HoverCard({ trigger, content, className }: HoverCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {trigger}
      {isVisible && (
        <div
          className={cn(
            "absolute z-10 p-3 bg-background border border-border rounded-lg shadow-large",
            "animate-slideup top-full left-1/2 transform -translate-x-1/2 mt-2",
            "min-w-max max-w-xs",
            className
          )}
        >
          {content}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-background border-l border-t border-border rotate-45" />
        </div>
      )}
    </div>
  );
}
