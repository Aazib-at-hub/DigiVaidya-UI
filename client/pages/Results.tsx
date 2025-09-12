import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumbs, QuickActionPanel, FloatingActionButton } from "@/components/ui/navigation";
import { InteractiveCard, InteractiveButton } from "@/components/ui/interactive";
import { HealthStatus, DoshaIndicator, VitalSignsCard } from "@/components/ui/health-indicators";
import { useToast } from "@/components/ui/use-toast";

export default function Results() {
  const { toast } = useToast();

  const doshaData = {
    vata: 40,
    pitta: 35,
    kapha: 25
  };

  const dietPlan = [
    {
      meal: "Breakfast",
      icon: "sunrise",
      item: "Moong Dal Khichdi",
      details: "Protein: 14g, Calories: 320",
      properties: "Laghu (light), balances Pitta",
      dosha: "pitta"
    },
    {
      meal: "Lunch", 
      icon: "sun",
      item: "Steamed Rice & Veg Curry",
      details: "Protein: 12g, Calories: 450",
      properties: "Snigdha (unctuous), grounds Vata",
      dosha: "vata"
    },
    {
      meal: "Dinner",
      icon: "moon",
      item: "Roti with Ghee & Dal",
      details: "Protein: 16g, Calories: 400", 
      properties: "Ushna (warming), aids digestion",
      dosha: "vata"
    },
    {
      meal: "Snacks",
      icon: "coffee",
      item: "Soaked Almonds & Herbal Tea",
      details: "Healthy fats",
      properties: "Balances Vata",
      dosha: "vata"
    },
  ];

  return (
    <div className="content-container section-spacing">
      {/* Breadcrumbs */}
      <Breadcrumbs 
        items={[
          { label: "Dashboard", href: "/", icon: "home" },
          { label: "Diet Results", icon: "nutrition" }
        ]}
        className="mb-6"
      />

      {/* Quick Actions */}
      <QuickActionPanel
        actions={[
          {
            icon: "download",
            label: "Download PDF",
            onClick: () => toast({
              title: "Downloading Report",
              description: "Your personalized diet plan is being prepared...",
            }),
            variant: "primary"
          },
          {
            icon: "print",
            label: "Print Report", 
            onClick: () => {
              toast({
                title: "Preparing Print",
                description: "Opening print dialog...",
              });
              window.print();
            },
            variant: "secondary"
          },
          {
            icon: "share",
            label: "Share Results",
            onClick: () => toast({
              title: "Share Results",
              description: "Preparing shareable link...",
            }),
            variant: "secondary"
          }
        ]}
        className="mb-8"
      />

      <div className="mx-auto max-w-6xl space-y-8">
        {/* Heading */}
        <div className="text-center space-y-4">
          <h1 className="heading-serif text-4xl md:text-5xl font-extrabold gradient-text">
            Your Personalized Ayurvedic Diet Plan
          </h1>
          <p className="text-subtle text-lg max-w-3xl mx-auto leading-relaxed">
            Based on your dosha analysis and health inputs, here are your customized
            recommendations for optimal wellness.
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <HealthStatus status="excellent">Excellent Health</HealthStatus>
            <DoshaIndicator dosha="Vata" />
          </div>
        </div>

        {/* Analysis Cards */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Dosha Analysis */}
          <InteractiveCard hover glow>
            <CardHeader className="card-spacing">
              <CardTitle className="heading-secondary gradient-text flex items-center gap-2">
                <span className="icon-balance"></span>
                Your Dosha Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="card-spacing space-y-6">
              <div className="flex items-center justify-center">
                <div
                  className="relative h-48 w-48 rounded-full shadow-deep"
                  style={{
                    background:
                      "conic-gradient(#5dbb63 0 40%, #66a6ff 40% 75%, #ffd166 75% 100%)",
                    mask: "radial-gradient(farthest-side, transparent 62%, black 63%)",
                    WebkitMask:
                      "radial-gradient(farthest-side, transparent 62%, black 63%)",
                  }}
                />
              </div>
              <div className="text-center space-y-3">
                <p className="text-body">
                  <strong>Dominant Vata Constitution</strong>
                </p>
                <p className="text-subtle">
                  Foods that are warm, grounding, and nourishing will help balance your constitution.
                </p>
              </div>
              <div className="flex justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#5dbb63] shadow-soft" />
                  <span className="font-medium">Vata 40%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#66a6ff] shadow-soft" />
                  <span className="font-medium">Pitta 35%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#ffd166] shadow-soft" />
                  <span className="font-medium">Kapha 25%</span>
                </div>
              </div>
            </CardContent>
          </InteractiveCard>

          {/* Nutrient Insights */}
          <InteractiveCard hover glow>
            <CardHeader className="card-spacing">
              <CardTitle className="heading-secondary gradient-text flex items-center gap-2">
                <span className="icon-nutrition"></span>
                Nutrient Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="card-spacing space-y-6">
              <div className="flex items-center justify-center">
                <div
                  className="relative h-48 w-48 rounded-full shadow-deep"
                  style={{
                    background:
                      "conic-gradient(#9CCC65 0 55%, #4CAF50 55% 80%, #8D6E63 80% 100%)",
                    mask: "radial-gradient(farthest-side, transparent 62%, black 63%)",
                    WebkitMask:
                      "radial-gradient(farthest-side, transparent 62%, black 63%)",
                  }}
                />
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 rounded-lg bg-secondary/30">
                    <div className="font-semibold text-green-600">Vitamins</div>
                    <div className="text-sm text-subtle">A, C, D, E</div>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/30">
                    <div className="font-semibold text-blue-600">Minerals</div>
                    <div className="text-sm text-subtle">Iron, Mg, Zn</div>
                  </div>
                </div>
                <p className="text-subtle text-center">
                  Balanced macronutrients optimized for Vata constitution and digestive strength.
                </p>
              </div>
            </CardContent>
          </InteractiveCard>
        </div>

        {/* Daily Diet Chart */}
        <InteractiveCard hover glow>
          <CardHeader className="card-spacing">
            <CardTitle className="heading-secondary gradient-text flex items-center gap-2">
              <span className="icon-calendar"></span>
              Your Daily Diet Chart
            </CardTitle>
          </CardHeader>
          <CardContent className="card-spacing">
            <div className="grid gap-6">
              {dietPlan.map((meal, index) => (
                <div
                  key={meal.meal}
                  className="group p-6 rounded-xl border border-border/50 bg-card shadow-soft hover:shadow-medium transition-all duration-300 cursor-pointer"
                  onClick={() => {
                    toast({
                      title: `${meal.meal} Details`,
                      description: `${meal.item} - ${meal.details}`,
                    });
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex items-center gap-4 md:w-48">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                        <span className={`icon-${meal.icon} text-lg`}></span>
                      </div>
                      <div>
                        <div className="font-bold text-lg text-foreground">
                          {meal.meal}
                        </div>
                        <div className="text-sm text-subtle">
                          {index === 0 ? "7:00 AM" : 
                           index === 1 ? "12:30 PM" : 
                           index === 2 ? "7:30 PM" : "4:00 PM"}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-foreground">{meal.item}</span>
                        <DoshaIndicator dosha="Vata" />
                      </div>
                      <div className="text-sm text-subtle">
                        {meal.details}
                      </div>
                      <div className="text-sm text-primary font-medium">
                        {meal.properties}
                      </div>
                    </div>
                    
                    <span className="icon-arrow-right opacity-0 group-hover:opacity-100 transition-opacity text-subtle"></span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </InteractiveCard>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
          <InteractiveButton
            variant="primary"
            size="lg"
            className="h-14 px-10 rounded-xl flex items-center gap-3 shadow-medium"
            onClick={() => {
              toast({
                title: "Downloading PDF Report",
                description: "Your personalized diet plan is being prepared for download...",
              });
            }}
          >
            <span className="icon-download"></span>
            Download PDF Report
          </InteractiveButton>
          
          <InteractiveButton
            variant="secondary"
            size="lg"
            className="h-14 px-10 rounded-xl flex items-center gap-3 shadow-medium"
            onClick={() => {
              toast({
                title: "Preparing Print",
                description: "Opening print dialog for your diet plan...",
              });
              window.print();
            }}
          >
            <span className="icon-print"></span>
            Print Report
          </InteractiveButton>
          
          <InteractiveButton
            variant="secondary"
            size="lg"
            className="h-14 px-10 rounded-xl flex items-center gap-3 shadow-medium"
            onClick={() => {
              toast({
                title: "Sharing Results",
                description: "Generating shareable link for your diet plan...",
              });
            }}
          >
            <span className="icon-share"></span>
            Share Results
          </InteractiveButton>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <FloatingActionButton
        icon="bookmark"
        label="Save Plan"
        onClick={() => {
          toast({
            title: "Diet Plan Saved",
            description: "Your personalized plan has been saved to your profile.",
          });
        }}
        variant="success"
        className="bottom-20 right-6"
      />
      
      <FloatingActionButton
        icon="calendar"
        label="Schedule Follow-up"
        onClick={() => {
          toast({
            title: "Schedule Follow-up",
            description: "Opening appointment scheduler...",
          });
        }}
        variant="primary"
      />
    </div>
  );
}
