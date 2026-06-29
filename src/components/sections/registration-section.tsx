"use client";

import { useState } from "react";
import type { RegistrationForm } from "@/lib/types/community";
import { SectionShell } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  realtor: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const span2 = "sm:col-span-2";

export function RegistrationSection({ data }: { data: RegistrationForm }) {
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    realtor: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!form.firstName.trim()) next.firstName = "First name is required.";
    if (!form.lastName.trim()) next.lastName = "Last name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email.";
    if (!form.phone.trim()) next.phone = "Phone is required.";
    return next;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <SectionShell id="registration" reveal={false}>
      <div className="archun-card grid gap-12 p-8 md:p-12 lg:grid-cols-2 lg:gap-20 lg:p-16">
        <div>
          <p className="card-label mb-3 block">Register</p>
          <h2 className="headline-section">{data.title}</h2>
          {data.description && (
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted">{data.description}</p>
          )}
        </div>

        {status === "success" ? (
          <div className="flex flex-col justify-center">
            <p className="text-lg font-semibold text-foreground">Thank you — we&apos;ll be in touch shortly.</p>
            <p className="mt-2 text-sm text-body">
              A member of our sales team will contact you to schedule your private showing.
            </p>
            <Button
              type="button"
              variant="secondary"
              className="mt-6 w-fit"
              onClick={() => {
                setStatus("idle");
                setForm({
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
                  realtor: "",
                  message: "",
                });
              }}
            >
              Submit another request
            </Button>
          </div>
        ) : (
          <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit} noValidate>
            <Field label="First name" id="reg-first" error={errors.firstName}>
              <input
                id="reg-first"
                value={form.firstName}
                onChange={(e) => update("firstName", e.target.value)}
                className="input-field"
                autoComplete="given-name"
              />
            </Field>
            <Field label="Last name" id="reg-last" error={errors.lastName}>
              <input
                id="reg-last"
                value={form.lastName}
                onChange={(e) => update("lastName", e.target.value)}
                className="input-field"
                autoComplete="family-name"
              />
            </Field>
            <Field label="Email" id="reg-email" error={errors.email} className={span2}>
              <input
                id="reg-email"
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="input-field"
                autoComplete="email"
              />
            </Field>
            <Field label="Phone" id="reg-phone" error={errors.phone} className={span2}>
              <input
                id="reg-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="input-field"
                autoComplete="tel"
              />
            </Field>
            <Field label="Working with a realtor?" id="reg-realtor" className={span2}>
              <select
                id="reg-realtor"
                value={form.realtor}
                onChange={(e) => update("realtor", e.target.value)}
                className="input-field"
              >
                <option value="">Select an option</option>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </Field>
            <Field label="Message (optional)" id="reg-message" className={span2}>
              <textarea
                id="reg-message"
                rows={3}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                className="input-field"
              />
            </Field>
            {status === "error" && Object.keys(errors).length > 0 && (
              <p className={`${span2} text-sm text-accent`} role="alert">
                Please fix the highlighted fields and try again.
              </p>
            )}
            <Button type="submit" className={span2} disabled={status === "loading"}>
              {status === "loading" ? "Sending…" : data.submitLabel}
            </Button>
          </form>
        )}
      </div>
    </SectionShell>
  );
}

function Field({
  label,
  id,
  error,
  className,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-accent" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
