import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="container py-10 animate-fadein">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Step 2 of 3
            </p>
            <span className="text-sm font-semibold text-primary">66%</span>
          </div>
          <Progress value={66} />
        </div>

        {/* Heading */}
        <div className="text-center space-y-3">
          <h1 className="heading-serif text-3xl md:text-4xl font-extrabold gradient-text">
            Personalized Ayurveda Diet Plan
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Answer a few questions to craft a diet plan aligned with your body,
            mind, and lifestyle.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border bg-card/80 backdrop-blur shadow-lg p-6 md:p-8">
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              navigate("/results");
            }}
          >
            {/* 1-4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>What is your age group?</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select age group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="18-25">18-25</SelectItem>
                    <SelectItem value="26-35">26-35</SelectItem>
                    <SelectItem value="36-45">36-45</SelectItem>
                    <SelectItem value="46-60">46-60</SelectItem>
                    <SelectItem value="60+">60+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>What is your gender?</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="nonbinary">Non-binary</SelectItem>
                    <SelectItem value="prefer-not">
                      Prefer not to say
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>What is your body type?</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select body type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="slim">Slim</SelectItem>
                    <SelectItem value="average">Average</SelectItem>
                    <SelectItem value="athletic">Athletic</SelectItem>
                    <SelectItem value="heavy">Heavy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>What is your activity level?</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 5 Health issues */}
            <div className="space-y-3">
              <Label>Select your health issues</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  "None",
                  "Digestive issues",
                  "Thyroid imbalance",
                  "Joint pain",
                  "Anxiety/Stress",
                  "Others",
                ].map((label) => (
                  <label
                    key={label}
                    className="flex items-center gap-2 text-sm"
                  >
                    <Checkbox />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 6-13 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>How many hours do you sleep?</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select hours" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="<5">Less than 5</SelectItem>
                    <SelectItem value="5-6">5-6</SelectItem>
                    <SelectItem value="7-8">7-8</SelectItem>
                    <SelectItem value=">8">More than 8</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>How would you rate your sleep quality?</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select quality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="poor">Poor</SelectItem>
                    <SelectItem value="average">Average</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="excellent">Excellent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Do you feel more cold or warm?</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cold">Cold</SelectItem>
                    <SelectItem value="warm">Warm</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>How is your digestion?</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select digestion" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="slow">Slow</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="fast">Fast</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>What is your appetite?</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select appetite" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>How would you describe your mental state?</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select mental state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="calm">Calm</SelectItem>
                    <SelectItem value="anxious">Anxious</SelectItem>
                    <SelectItem value="irritable">Irritable</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>How do you feel after meals?</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select feeling" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="sleepy">Sleepy</SelectItem>
                    <SelectItem value="bloated">Bloated</SelectItem>
                    <SelectItem value="energized">Energized</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Do you crave any specific foods?</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sweet">Sweet</SelectItem>
                    <SelectItem value="salty">Salty</SelectItem>
                    <SelectItem value="spicy">Spicy</SelectItem>
                    <SelectItem value="sour">Sour</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 14 Diet goals */}
            <div className="space-y-3">
              <Label>Select your diet goals</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  "Weight loss",
                  "Weight gain",
                  "Maintain weight",
                  "Improve digestion",
                  "Improve sleep",
                ].map((label) => (
                  <label
                    key={label}
                    className="flex items-center gap-2 text-sm"
                  >
                    <Checkbox />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 15-17 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label>How strict do you want your diet plan?</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select strictness" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flexible">Flexible</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="strict">Strict</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>How many main meals do you prefer per day?</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select number" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>What type of diet do you prefer?</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select diet type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="veg">Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="eggetarian">Eggetarian</SelectItem>
                    <SelectItem value="nonveg">Non-vegetarian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 18-20 Toggles */}
            <div className="grid gap-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">
                    Would you like recipes included with portion guidelines?
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">
                    Would you like meal timings aligned with your schedule?
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">
                    Can your diet include animal protein?
                  </p>
                </div>
                <Switch />
              </div>
            </div>

            <div className="pt-2 flex justify-center">
              <Button
                type="submit"
                className="h-12 px-10 rounded-xl bg-primary hover:bg-primary/90 hover:scale-[1.02] transition-transform"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
