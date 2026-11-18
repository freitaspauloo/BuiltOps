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
};

type FormErrors = Partial<Record<keyof FormState, string>>;

type RegistrationFormPanelProps = {
  data: RegistrationForm;
  variant?: "default" | "onPhoto" | "onCard";
  className?: string;
  pinSubmitToBottom?: boolean;
};

export function RegistrationFormPanel({
  data,
  variant = "default",
  className,
  pinSubmitToBottom = false,
}: RegistrationFormPanelProps) {
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

  const onPhoto = variant === "onPhoto";
  const onCard = variant === "onCard" || variant === "default";
  const controlTone = onCard && !onPhoto ? "elevated" : "default";
  const labelClass = onPhoto ? "text-white" : undefined;
  const mutedClass = onPhoto ? "text-white/70" : "text-muted";

  const update = (field: keyof FormState, value: string) => {
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
    <form
      className={cn(pinSubmitToBottom && "flex min-h-0 flex-1 flex-col", className)}
      onSubmit={handleSubmit}
      noValidate
    >
      <FieldSet
        className={cn(
          "min-w-0 gap-0 border-0 p-0",
          pinSubmitToBottom && "flex min-h-0 flex-1 flex-col",
        )}
      >
        <FieldLegend className="sr-only">{data.title}</FieldLegend>

        <FieldGroup className="gap-8">
          <div className="grid gap-5 sm:grid-cols-2">
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
                className="sm:col-span-2"
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
                className="sm:col-span-2"
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

          <FieldSeparator>
            <span
              className={cn(
                "bg-card px-3 text-xs font-medium tracking-wide text-muted uppercase",
                onPhoto && "bg-transparent text-white/60",
              )}
            >
              Preferences
            </span>
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
                rows={4}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="Floorplan preferences, move-in timeline, or questions for our team…"
              />
            </FormField>
          </div>

          {status === "error" && Object.keys(errors).length > 0 && (
            <p className="text-sm text-accent" role="alert">
              Please fix the highlighted fields and try again.
            </p>
          )}
        </FieldGroup>

        <div
          className={cn(
            "mt-8 border-t border-border pt-6",
            onPhoto && "border-white/15",
            pinSubmitToBottom && "mt-auto",
          )}
        >
          <Button type="submit" size="lg" className="w-full" disabled={status === "loading"}>
            {status === "loading" ? "Sending…" : data.submitLabel}
          </Button>
          <p className={cn("mt-3 text-center text-xs leading-relaxed", mutedClass)}>
            By submitting, you agree to be contacted about this community.
          </p>
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
