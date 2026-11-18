"use client";

import { useState } from "react";
import { CheckCircle2Icon } from "lucide-react";
import type { RegistrationForm } from "@/lib/types/community";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils/cn";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  realtor: string;
  message: string;
  consent: boolean;
  /** Honeypot — must stay empty; bots that fill it are rejected server-side. */
  company: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

type RegistrationFormPanelProps = {
  data: RegistrationForm;
  variant?: "default" | "onPhoto" | "onCard";
  layout?: "default" | "split";
  className?: string;
  /** @deprecated No longer pins submit; kept for call-site compatibility. */
  pinSubmitToBottom?: boolean;
};

export function RegistrationFormPanel({
  data,
  variant = "default",
  layout = "default",
  className,
  pinSubmitToBottom: _pinSubmitToBottom = false,
}: RegistrationFormPanelProps) {
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    realtor: "",
    message: "",
    consent: false,
    company: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const onPhoto = variant === "onPhoto";
  const onCard = variant === "onCard" || variant === "default";
  const isSplit = layout === "split";
  const controlTone = onCard && !onPhoto ? "elevated" : "default";
  const labelClass = onPhoto ? "text-white" : undefined;
  const mutedClass = onPhoto ? "text-white/70" : "text-muted";

  const update = (field: keyof FormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!form.firstName.trim()) next.firstName = "First name is required.";
    if (!form.lastName.trim()) next.lastName = "Last name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email address.";
    }
    if (!form.phone.trim()) next.phone = "Phone is required.";
    if (!form.consent) next.consent = "Please agree to be contacted so we can follow up.";
    return next;
  };

  const resetForm = () => {
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      realtor: "",
      message: "",
      consent: false,
      company: "",
    });
    setErrors({});
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

  if (status === "success") {
    return (
      <div
        className={cn(
          "flex flex-col gap-5 py-2",
          onPhoto && "text-white",
          className,
        )}
      >
        <CheckCircle2Icon
          className={cn("size-11", onPhoto ? "text-white" : "text-primary")}
          aria-hidden
        />
        <div className="space-y-2">
          <p className={cn("text-xl font-semibold", onPhoto ? "text-white" : "text-foreground")}>
            Thank you — we&apos;ll be in touch shortly.
          </p>
          <p className={cn("max-w-md text-sm leading-relaxed", mutedClass)}>
            A member of our sales team will contact you to schedule your private showing.
          </p>
        </div>
        <Button
          type="button"
          variant={onPhoto ? "hero" : "secondary"}
          className="mt-2 w-fit"
          onClick={() => {
            setStatus("idle");
            resetForm();
          }}
        >
          Submit another request
        </Button>
      </div>
    );
  }

  return (
    <form className={className} onSubmit={handleSubmit} noValidate>
      <FieldSet className="min-w-0 gap-0 border-0 p-0">
        <FieldLegend className="sr-only">{data.title}</FieldLegend>

        <FieldGroup className={cn(isSplit ? "gap-6" : "gap-8")}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              <FormField
                id="reg-first"
                label="First name"
                error={errors.firstName}
                labelClass={labelClass}
              >
                <Input
                  id="reg-first"
                  tone={controlTone}
                  value={form.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  autoComplete="given-name"
                  aria-invalid={Boolean(errors.firstName)}
                />
              </FormField>

              <FormField
                id="reg-last"
                label="Last name"
                error={errors.lastName}
                labelClass={labelClass}
              >
                <Input
                  id="reg-last"
                  tone={controlTone}
                  value={form.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                  autoComplete="family-name"
                  aria-invalid={Boolean(errors.lastName)}
                />
              </FormField>

              <FormField
                id="reg-email"
                label="Email"
                error={errors.email}
                labelClass={labelClass}
                className={isSplit ? undefined : "sm:col-span-2"}
              >
                <Input
                  id="reg-email"
                  type="email"
                  tone={controlTone}
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  autoComplete="email"
                  placeholder="you@example.com"
                  aria-invalid={Boolean(errors.email)}
                />
              </FormField>

              <FormField
                id="reg-phone"
                label="Phone"
                error={errors.phone}
                labelClass={labelClass}
                className={isSplit ? undefined : "sm:col-span-2"}
              >
                <Input
                  id="reg-phone"
                  type="tel"
                  tone={controlTone}
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  autoComplete="tel"
                  placeholder="(555) 000-0000"
                  aria-invalid={Boolean(errors.phone)}
                />
              </FormField>
          </div>

          <FieldSeparator
            className={cn(
              onPhoto &&
                "[&_[data-slot=field-separator-content]]:bg-transparent [&_[data-slot=field-separator-content]]:text-white/60",
            )}
          >
            Preferences
          </FieldSeparator>

          <div className="space-y-5">
            <FormField
              id="reg-realtor"
              label="Working with a realtor?"
              labelClass={labelClass}
            >
              <Select
                value={form.realtor || undefined}
                onValueChange={(value) => update("realtor", value)}
              >
                <SelectTrigger id="reg-realtor" tone={controlTone}>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="yes">Yes</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormField
              id="reg-message"
              label="Message"
              optional
              labelClass={labelClass}
            >
              <Textarea
                id="reg-message"
                tone={controlTone}
                rows={isSplit ? 3 : 4}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="Floorplan preferences, move-in timeline, or questions for our team…"
              />
            </FormField>
          </div>

          {/* Honeypot — visually hidden; humans never fill it */}
          <div className="sr-only" aria-hidden="true">
            <label htmlFor="reg-company">Company (leave blank)</label>
            <input
              id="reg-company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.company}
              onChange={(e) => update("company", e.target.value)}
            />
          </div>

          {status === "error" && Object.keys(errors).length > 0 && (
            <p className="text-sm text-accent" role="alert">
              Please fix the highlighted fields and try again.
            </p>
          )}
          {status === "error" && Object.keys(errors).length === 0 && (
            <p className="text-sm text-accent" role="alert">
              Something went wrong — please try again or call us directly.
            </p>
          )}
        </FieldGroup>

        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <label
              className={cn(
                "flex cursor-pointer items-start gap-3 text-sm leading-relaxed",
                onPhoto ? "text-white/85" : "text-body",
              )}
            >
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => update("consent", e.target.checked)}
                aria-invalid={Boolean(errors.consent)}
                className="mt-0.5 size-4 shrink-0 cursor-pointer accent-[var(--color-primary,#274866)]"
              />
              <span>
                I agree to be contacted by Losani Homes about this community by email or
                phone. You can unsubscribe at any time.
              </span>
            </label>
            {errors.consent && (
              <p className="text-sm text-accent" role="alert">
                {errors.consent}
              </p>
            )}
          </div>

          <Button
            type="submit"
            size={isSplit ? "md" : "lg"}
            className={cn(isSplit ? "w-full sm:w-auto" : "w-full")}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Sending…" : data.submitLabel}
          </Button>
        </div>
      </FieldSet>
    </form>
  );
}

function FormField({
  id,
  label,
  optional,
  error,
  className,
  labelClass,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  className?: string;
  labelClass?: string;
  children: React.ReactNode;
}) {
  return (
    <Field data-invalid={Boolean(error)} className={className}>
      <FieldLabel htmlFor={id} className={labelClass}>
        {label}
        {optional && (
          <span className="font-normal text-muted"> (optional)</span>
        )}
      </FieldLabel>
      <FieldContent>
        {children}
        {error && <FieldError>{error}</FieldError>}
      </FieldContent>
    </Field>
  );
}
