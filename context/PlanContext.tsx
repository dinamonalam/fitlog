"use client";

import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Workout } from "@/lib/types";

const MAX_PLAN = 5;

type PlanContextType = {
  plan: Workout[];
  saved: Workout[];
  done: number[];
  loaded: boolean;
  addToPlan: (w: Workout) => void;
  saveForLater: (w: Workout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markDone: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
};

const PlanContext = createContext<PlanContextType | null>(null);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [done, setDone] = useState<number[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("fitlog-data");
      if (raw) {
        const data = JSON.parse(raw);
        setPlan(data.plan || []);
        setSaved(data.saved || []);
        setDone(data.done || []);
      }
    } catch {}
    const t = setTimeout(() => setLoaded(true), 500);
    return () => clearTimeout(t);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("fitlog-data", JSON.stringify({ plan, saved, done }));
  }, [plan, saved, done, loaded]);

  const isInPlan = (id: number) => plan.some((w) => w.id === id);
  const isSaved = (id: number) => saved.some((w) => w.id === id);

  const addToPlan = (w: Workout) => {
    if (isInPlan(w.id)) return toast("Already in today's plan");
    if (plan.length >= MAX_PLAN)
      return toast.error("Plan is full (max 5 lifts)");
    setPlan([...plan, w]);
    toast.success("Added to today's plan");
  };

  const saveForLater = (w: Workout) => {
    if (isSaved(w.id)) return toast("Already saved");
    setSaved([...saved, w]);
    toast.success("Saved for later");
  };

  const removeFromPlan = (id: number) => {
    setPlan(plan.filter((w) => w.id !== id));
    setDone(done.filter((d) => d !== id));
    toast("Removed from today's plan");
  };

  const removeFromSaved = (id: number) => {
    setSaved(saved.filter((w) => w.id !== id));
    toast("Removed from saved");
  };

  const markDone = (id: number) => {
    if (done.includes(id)) return toast("Already marked as done");
    setDone([...done, id]);
    toast.success("Workout marked as done");
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        done,
        loaded,
        addToPlan,
        saveForLater,
        removeFromPlan,
        removeFromSaved,
        markDone,
        isInPlan,
        isSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used inside PlanProvider");
  return ctx;
}