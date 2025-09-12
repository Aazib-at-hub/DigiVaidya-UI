import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { InteractiveButton } from "@/components/ui/interactive";
import { useToast } from "@/components/ui/use-toast";

const NotFound = () => {
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
    
    toast({
      title: "Page Not Found",
      description: `The page "${location.pathname}" does not exist.`,
      variant: "destructive"
    });
  }, [location.pathname, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="text-center space-y-6 p-8">
        <div className="space-y-4">
          <span className="icon-warning text-6xl text-destructive block"></span>
          <h1 className="heading-serif text-6xl font-bold gradient-text">404</h1>
          <h2 className="heading-secondary text-2xl text-foreground">Page Not Found</h2>
          <p className="text-subtle text-lg max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <InteractiveButton
            variant="primary"
            size="lg"
            onClick={() => window.location.href = "/"}
            className="flex items-center gap-2"
          >
            <span className="icon-home"></span>
            Return to Dashboard
          </InteractiveButton>
          
          <InteractiveButton
            variant="secondary"
            size="lg"
            onClick={() => window.history.back()}
            className="flex items-center gap-2"
          >
            <span className="icon-arrow-left"></span>
            Go Back
          </InteractiveButton>
        </div>
        
        <div className="pt-4">
          <p className="text-subtle text-sm">
            Having trouble? <a href="/reports" className="text-primary hover:underline">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
