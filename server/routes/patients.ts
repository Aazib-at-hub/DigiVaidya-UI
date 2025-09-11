import { RequestHandler } from "express";

export type Patient = {
  id: string;
  fullName: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  contact: string;
  email: string;
  weight: number;
  height: number;
  bmi: number;
  conditions: string[];
  allergies: string[];
  routine: string;
  sleepHours: number;
  activity: "Low" | "Medium" | "High";
  dosha: "Vata" | "Pitta" | "Kapha" | "Mixed";
  foodPref: "Vegetarian" | "Vegan" | "Non-Vegetarian";
  restrictions?: string;
};

let patients: Patient[] = [
  {
    id: "p1",
    fullName: "Ananya Gupta",
    age: 32,
    gender: "Female",
    contact: "9876543210",
    email: "ananya@example.com",
    weight: 62,
    height: 165,
    bmi: Number((62 / Math.pow(1.65, 2)).toFixed(1)),
    conditions: ["Thyroid"],
    allergies: ["Lactose"],
    routine: "Office 9-6, evening walk",
    sleepHours: 7,
    activity: "Medium",
    dosha: "Vata",
    foodPref: "Vegetarian",
    restrictions: "Avoid cold drinks",
  },
  {
    id: "p2",
    fullName: "Rahul Verma",
    age: 41,
    gender: "Male",
    contact: "9988776655",
    email: "rahul@example.com",
    weight: 75,
    height: 172,
    bmi: Number((75 / Math.pow(1.72, 2)).toFixed(1)),
    conditions: ["Hypertension"],
    allergies: [],
    routine: "Morning gym, desk job",
    sleepHours: 6.5,
    activity: "High",
    dosha: "Pitta",
    foodPref: "Non-Vegetarian",
  },
];

export const listPatients: RequestHandler = (_req, res) => {
  res.json({ patients });
};

export const getPatient: RequestHandler = (req, res) => {
  const p = patients.find((x) => x.id === req.params.id);
  if (!p) return res.status(404).json({ error: "Not found" });
  res.json(p);
};

export const createPatient: RequestHandler = (req, res) => {
  const id = `p${Math.random().toString(36).slice(2, 8)}`;
  const body = req.body as Omit<Patient, "id">;
  const patient: Patient = { id, ...body } as Patient;
  patients.unshift(patient);
  res.status(201).json(patient);
};

export const updatePatient: RequestHandler = (req, res) => {
  const idx = patients.findIndex((x) => x.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  patients[idx] = { ...patients[idx], ...(req.body as Partial<Patient>) };
  res.json(patients[idx]);
};
