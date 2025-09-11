import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { patientSchema, type PatientFormValues } from "./patientSchema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const conditionsOptions = [
  "Diabetes",
  "Hypertension",
  "Thyroid",
  "Digestive Issues",
  "PCOS/PCOD",
  "Cardiac Issues",
];
const allergyOptions = [
  "Gluten",
  "Lactose",
  "Nuts",
  "Soy",
  "Shellfish",
  "Eggs",
];

export default function PatientForm({
  initialValues,
  submitLabel = "Submit",
  onSubmit,
}: {
  initialValues?: Partial<PatientFormValues>;
  submitLabel?: string;
  onSubmit: (values: PatientFormValues) => Promise<void> | void;
}) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      gender: undefined as any,
      activity: undefined as any,
      dosha: undefined as any,
      foodPref: undefined as any,
      conditions: [],
      allergies: [],
      ...initialValues,
    },
  });

  const weight = watch("weight");
  const height = watch("height");

  useEffect(() => {
    if (weight && height) {
      const bmi = Number((weight / Math.pow(height / 100, 2)).toFixed(1));
      if (!Number.isNaN(bmi) && Number.isFinite(bmi))
        setValue("bmi", bmi, { shouldValidate: true });
    }
  }, [weight, height, setValue]);

  const submitHandler = handleSubmit(async (values) => {
    await onSubmit(values);
  });

  return (
    <form onSubmit={submitHandler} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label>Full Name</Label>
          <Input placeholder="Enter full name" {...register("fullName")} />
          {errors.fullName && (
            <p className="text-sm text-red-600">{errors.fullName.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label>Age</Label>
          <Input
            type="number"
            placeholder="Age"
            {...register("age", { valueAsNumber: true })}
          />
          {errors.age && (
            <p className="text-sm text-red-600">Age is required</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label>Gender</Label>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  {(["Male", "Female", "Other"] as const).map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.gender && (
            <p className="text-sm text-red-600">Gender is required</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label>Contact Number</Label>
          <Input
            type="tel"
            placeholder="e.g. 9876543210"
            {...register("contact")}
          />
          {errors.contact && (
            <p className="text-sm text-red-600">Enter a valid contact</p>
          )}
        </div>
        <div className="space-y-1.5 md:col-span-2">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="you@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-600">Enter a valid email</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-1.5">
          <Label>Weight (kg)</Label>
          <Input
            type="number"
            step="0.1"
            placeholder="e.g. 70"
            {...register("weight", { valueAsNumber: true })}
          />
          {errors.weight && (
            <p className="text-sm text-red-600">Weight is required</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label>Height (cm)</Label>
          <Input
            type="number"
            step="0.1"
            placeholder="e.g. 170"
            {...register("height", { valueAsNumber: true })}
          />
          {errors.height && (
            <p className="text-sm text-red-600">Height is required</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label>BMI</Label>
          <Input
            type="number"
            step="0.1"
            readOnly
            {...register("bmi", { valueAsNumber: true })}
          />
          {errors.bmi && (
            <p className="text-sm text-red-600">BMI will be calculated</p>
          )}
        </div>
        <div className="md:col-span-3 space-y-2">
          <Label>Existing Conditions</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Controller
              name="conditions"
              control={control}
              render={({ field }) => (
                <>
                  {conditionsOptions.map((opt) => {
                    const checked = field.value?.includes(opt);
                    return (
                      <label
                        key={opt}
                        className="flex items-center gap-2 text-sm"
                      >
                        <Checkbox
                          checked={checked}
                          onCheckedChange={(v) => {
                            const val = v === true;
                            if (val && !checked)
                              field.onChange([...(field.value || []), opt]);
                            if (!val && checked)
                              field.onChange(
                                (field.value || []).filter(
                                  (x: string) => x !== opt,
                                ),
                              );
                          }}
                        />
                        <span>{opt}</span>
                      </label>
                    );
                  })}
                </>
              )}
            />
          </div>
        </div>
        <div className="md:col-span-3 space-y-2">
          <Label>Allergies</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Controller
              name="allergies"
              control={control}
              render={({ field }) => (
                <>
                  {allergyOptions.map((opt) => {
                    const checked = field.value?.includes(opt);
                    return (
                      <label
                        key={opt}
                        className="flex items-center gap-2 text-sm"
                      >
                        <Checkbox
                          checked={checked}
                          onCheckedChange={(v) => {
                            const val = v === true;
                            if (val && !checked)
                              field.onChange([...(field.value || []), opt]);
                            if (!val && checked)
                              field.onChange(
                                (field.value || []).filter(
                                  (x: string) => x !== opt,
                                ),
                              );
                          }}
                        />
                        <span>{opt}</span>
                      </label>
                    );
                  })}
                </>
              )}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2 space-y-1.5">
          <Label>Daily Routine</Label>
          <Textarea
            placeholder="Describe a typical day"
            {...register("routine")}
          />
          {errors.routine && (
            <p className="text-sm text-red-600">Daily Routine is required</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label>Sleep Hours</Label>
          <Input
            type="number"
            step="0.5"
            placeholder="e.g. 7"
            {...register("sleepHours", { valueAsNumber: true })}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Physical Activity</Label>
          <Controller
            name="activity"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {(["Low", "Medium", "High"] as const).map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Dosha Type</Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(["Vata", "Pitta", "Kapha", "Mixed"] as const).map((d) => (
              <label key={d} className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  value={d}
                  {...register("dosha")}
                  className="h-4 w-4 border-primary"
                />
                <span>{d}</span>
              </label>
            ))}
          </div>
          {errors.dosha && (
            <p className="text-sm text-red-600">Select your Dosha</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label>Food Preferences</Label>
          <Controller
            name="foodPref"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="Vegan">Vegan</SelectItem>
                  <SelectItem value="Non-Vegetarian">Non-Vegetarian</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="md:col-span-2 space-y-1.5">
          <Label>Specific Restrictions</Label>
          <Textarea
            placeholder="Eg. Avoid nightshades, caffeine, etc."
            {...register("restrictions")}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-11 px-8 rounded-xl bg-primary hover:bg-primary/90"
        >
          {isSubmitting ? "Submitting..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
