"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send, ShieldCheck } from "lucide-react";
import { leadSchema, propertyTypes, contactMethods, type LeadInput, type LeadValues } from "@/lib/validations";
import { SuccessCelebration } from "@/components/animations/success-celebration";
import { Button } from "@/components/ui/button";
import { sleep } from "@/lib/utils";

/**
 * Lead form for /contact and /book-demo. No backend/CRM is configured yet,
 * so submissions are validated client-side and NOT stored or emailed.
 * Wire `submitLead` to a server action or API route to go live.
 */
async function submitLead(values: LeadValues) {
  void values;
  await sleep(1200);
}

export function LeadForm({ mode = "demo", defaultPlan }: { mode?: "demo" | "contact"; defaultPlan?: string }) {
  const [done, setDone] = useState<LeadValues | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LeadInput, unknown, LeadValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: { name: "", email: "", phone: "", property: "", rooms: "", properties: "1", contactMethod: "Email", message: defaultPlan ? `Interested in the ${defaultPlan} plan.` : "" },
  });

  if (done)
    return (
      <div className="card p-6">
        <SuccessCelebration title={mode === "demo" ? "Demo request received — in demo mode" : "Message ready — in demo mode"}>
          Thanks, {done.name.split(" ")[0]}. Your details passed validation, but this site isn&apos;t connected to a CRM or inbox yet, so
          nothing was emailed or stored. Please reach the team directly until submissions are configured.
        </SuccessCelebration>
        <div className="mt-4 flex justify-center">
          <Button variant="secondary" size="sm" onClick={() => setDone(null)}>Submit another</Button>
        </div>
      </div>
    );

  return (
    <form
      noValidate
      onSubmit={handleSubmit(async (v) => {
        if (isSubmitting) return;
        await submitLead(v);
        setDone(v);
      })}
      className="card space-y-4 p-6"
      aria-label={mode === "demo" ? "Book a demo" : "Contact sales"}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <F label="Full name" error={errors.name?.message} id="lf-name"><input id="lf-name" className="field" autoComplete="name" aria-invalid={!!errors.name} {...register("name")} /></F>
        <F label="Work email" error={errors.email?.message} id="lf-email"><input id="lf-email" type="email" className="field" autoComplete="email" aria-invalid={!!errors.email} {...register("email")} /></F>
        <F label="Phone" error={errors.phone?.message} id="lf-phone"><input id="lf-phone" type="tel" className="field" autoComplete="tel" placeholder="+91 98765 43210" aria-invalid={!!errors.phone} {...register("phone")} /></F>
        <F label="Hotel / property name" error={errors.property?.message} id="lf-prop"><input id="lf-prop" className="field" autoComplete="organization" aria-invalid={!!errors.property} {...register("property")} /></F>
        <F label="Property type" error={errors.propertyType?.message} id="lf-type">
          <select id="lf-type" className="field" defaultValue="" aria-invalid={!!errors.propertyType} {...register("propertyType")}>
            <option value="" disabled>Select…</option>
            {propertyTypes.map((t) => <option key={t}>{t}</option>)}
          </select>
        </F>
        <div className="grid grid-cols-2 gap-3">
          <F label="Rooms" error={errors.rooms?.message} id="lf-rooms"><input id="lf-rooms" type="number" min={1} inputMode="numeric" className="field" aria-invalid={!!errors.rooms} {...register("rooms")} /></F>
          <F label="Properties" error={errors.properties?.message} id="lf-props"><input id="lf-props" type="number" min={1} inputMode="numeric" className="field" aria-invalid={!!errors.properties} {...register("properties")} /></F>
        </div>
      </div>
      <fieldset>
        <legend className="label">Preferred contact method</legend>
        <div className="flex flex-wrap gap-2">
          {contactMethods.map((c) => (
            <label key={c} className="flex cursor-pointer items-center gap-2 rounded-full border border-line px-3.5 py-2 text-[13.5px] has-[:checked]:border-brand-500 has-[:checked]:bg-brand-50">
              <input type="radio" value={c} className="accent-brand-600" {...register("contactMethod")} /> {c}
            </label>
          ))}
        </div>
      </fieldset>
      <F label={mode === "demo" ? "What would you like to see? (optional)" : "Message (optional)"} error={errors.message?.message} id="lf-msg">
        <textarea id="lf-msg" rows={4} className="field resize-none" {...register("message")} />
      </F>
      <div className="flex flex-col-reverse items-start justify-between gap-3 sm:flex-row sm:items-center">
        <p className="flex items-center gap-1.5 text-[12px] text-muted-foreground"><ShieldCheck className="size-4 text-brand-500" /> Encrypted submission · Our team responds within 1 business day.</p>
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? <><Loader2 className="size-4 animate-spin" /> Sending…</> : <><Send className="size-4" /> {mode === "demo" ? "Request demo" : "Send message"}</>}
        </Button>
      </div>
    </form>
  );
}

function F({ label, error, id, children }: { label: string; error?: string; id: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="label">{label}</label>
      {children}
      {error && <p className="mt-1 text-[12.5px] text-danger" role="alert">{error}</p>}
    </div>
  );
}
