import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav
      className={cn(
        "flex items-center space-x-2 text-sm text-muted-foreground",
        className
      )}
      aria-label="Breadcrumb"
    >
      <div className="flex items-center space-x-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            {index > 0 && (
              <span className="text-muted-foreground/50">/</span>
            )}
            {item.href ? (
              <Link
                to={item.href}
                className="flex items-center gap-1 hover:text-foreground transition-colors"
              >
                {item.icon && <span className={`icon-${item.icon}`}></span>}
                {item.label}
              </Link>
            ) : (
              <span className="flex items-center gap-1 text-foreground font-medium">
                {item.icon && <span className={`icon-${item.icon}`}></span>}
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}

interface FloatingActionButtonProps {
  icon: string;
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "success" | "warning";
  className?: string;
}

export function FloatingActionButton({
  icon,
  label,
  onClick,
  variant = "primary",
  className,
}: FloatingActionButtonProps) {
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    success: "bg-green-600 text-white hover:bg-green-700",
    warning: "bg-yellow-600 text-white hover:bg-yellow-700",
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-large hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold",
        variants[variant],
        className
      )}
      aria-label={label}
    >
      <span className={`icon-${icon} text-lg`}></span>
      <span className="hidden md:inline">{label}</span>
    </button>
  );
}

interface ModernSearchProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
  suggestions?: string[];
  className?: string;
  icon?: string;
}

export function ModernSearch({
  placeholder = "Search...",
  value,
  onChange,
  onSearch,
  suggestions = [],
  className,
  icon = "search",
}: ModernSearchProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className={cn("relative w-full max-w-md", className)}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className={`icon-${icon} text-muted-foreground`}></span>
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 bg-background border border-border/50 rounded-xl shadow-soft focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            ✕
          </button>
        )}
      </div>
      
      {suggestions.length > 0 && value && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border/50 rounded-xl shadow-large z-10 max-h-60 overflow-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => {
                onChange(suggestion);
                if (onSearch) onSearch(suggestion);
              }}
              className="w-full px-4 py-3 text-left hover:bg-secondary/50 transition-colors first:rounded-t-xl last:rounded-b-xl"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

interface QuickActionPanelProps {
  actions: Array<{
    icon: string;
    label: string;
    onClick: () => void;
    variant?: "primary" | "secondary" | "success" | "warning";
  }>;
  className?: string;
}

export function QuickActionPanel({ actions, className }: QuickActionPanelProps) {
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={action.onClick}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg border shadow-soft hover:shadow-medium transition-all duration-200 transform hover:scale-105",
            action.variant === "success" && "bg-green-50 border-green-200 text-green-700 hover:bg-green-100",
            action.variant === "warning" && "bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100",
            action.variant === "primary" && "bg-primary/10 border-primary/20 text-primary hover:bg-primary/20",
            !action.variant && "bg-secondary border-border text-foreground hover:bg-secondary/70"
          )}
        >
          <span className={`icon-${action.icon}`}></span>
          <span className="font-medium">{action.label}</span>
        </button>
      ))}
    </div>
  );
}
