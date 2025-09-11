import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Results() {
  return (
    <div className="container py-10 animate-fadein">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Heading */}
        <div className="text-center space-y-3">
          <h1 className="heading-serif text-3xl md:text-4xl font-extrabold gradient-text">
            Your Personalized Ayurvedic Diet Plan
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Based on your profile and health inputs, here are your
            recommendations.
          </p>
        </div>

        {/* Sections */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Dosha Analysis */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="heading-serif text-xl text-primary">
                Your Dosha Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center">
                <div
                  className="relative h-40 w-40 rounded-full"
                  style={{
                    background:
                      "conic-gradient(#5dbb63 0 40%, #66a6ff 40% 75%, #ffd166 75% 100%)",
                    mask: "radial-gradient(farthest-side, transparent 62%, black 63%)",
                    WebkitMask:
                      "radial-gradient(farthest-side, transparent 62%, black 63%)",
                  }}
                />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                You have a dominant Vata imbalance; foods that are warm,
                grounding, and oily will help balance it.
              </p>
              <div className="flex justify-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-[#5dbb63]" />
                  Vata 40%
                </div>
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-[#66a6ff]" />
                  Pitta 35%
                </div>
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-[#ffd166]" />
                  Kapha 25%
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Nutrient Insights */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="heading-serif text-xl text-primary">
                Nutrient Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center">
                <div
                  className="relative h-40 w-40 rounded-full"
                  style={{
                    background:
                      "conic-gradient(#9CCC65 0 55%, #4CAF50 55% 80%, #8D6E63 80% 100%)",
                    mask: "radial-gradient(farthest-side, transparent 62%, black 63%)",
                    WebkitMask:
                      "radial-gradient(farthest-side, transparent 62%, black 63%)",
                  }}
                />
              </div>
              <ul className="text-sm text-muted-foreground grid grid-cols-1 gap-1">
                <li>Rich in Vitamin A, C; Minerals: Iron, Magnesium.</li>
                <li>Balanced macronutrients suitable for Vata pacification.</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Daily Diet Chart */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="heading-serif text-xl text-primary">
              Your Daily Diet Chart
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {[
                {
                  meal: "Breakfast",
                  item: "Moong Dal Khichdi — Protein: 14g, Calories: 320 | Laghu (light), balances Pitta.",
                },
                {
                  meal: "Lunch",
                  item: "Steamed Rice & Veg Curry — Protein: 12g, Calories: 450 | Snigdha (unctuous), grounds Vata.",
                },
                {
                  meal: "Dinner",
                  item: "Roti with Ghee & Dal — Protein: 16g, Calories: 400 | Ushna (warming), aids digestion.",
                },
                {
                  meal: "Snacks",
                  item: "Soaked Almonds & Herbal Tea — Healthy fats | Balances Vata.",
                },
              ].map((row) => (
                <div
                  key={row.meal}
                  className="flex flex-col md:flex-row md:items-center md:justify-between rounded-lg border bg-card p-4 shadow-sm"
                >
                  <div className="font-semibold text-primary md:w-40">
                    {row.meal}
                  </div>
                  <div className="text-sm text-muted-foreground md:flex-1">
                    {row.item}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button className="h-12 px-8 rounded-xl bg-primary hover:scale-[1.02] hover:bg-primary/90 transition-transform">
            Download PDF Report
          </Button>
          <Button
            onClick={() => window.print()}
            className="h-12 px-8 rounded-xl bg-primary hover:scale-[1.02] hover:bg-primary/90 transition-transform"
          >
            Print
          </Button>
        </div>
      </div>
    </div>
  );
}
