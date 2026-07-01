import type { RegistrationForm } from "@/lib/types/community";
import { SectionShell } from "@/components/ui/section";

/** v1 — registration stub without labels or submit wiring */
export function RegistrationSectionV1({ data }: { data: RegistrationForm }) {
  return (
    <SectionShell id="registration" siteVersion="v1">
      <div className="archun-card grid gap-12 p-8 md:p-12 lg:grid-cols-2 lg:gap-20 lg:p-16">
        <div>
          <p className="card-label block">Register</p>
          <h2 className="headline-section">{data.title}</h2>
          {data.description && (
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted">{data.description}</p>
          )}
        </div>

        <form className="grid gap-4 sm:grid-cols-2">
          <input className="input-field sm:col-span-1" placeholder="First name" />
          <input className="input-field sm:col-span-1" placeholder="Last name" />
          <input className="input-field sm:col-span-2" type="email" placeholder="Email" />
          <input className="input-field sm:col-span-2" type="tel" placeholder="Phone" />
          <select className="input-field sm:col-span-2" defaultValue="">
            <option value="" disabled>
              Working with a realtor?
            </option>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
          <textarea className="input-field sm:col-span-2" rows={3} placeholder="Message (optional)" />
          <button
            type="button"
            className="bg-primary px-6 py-3 text-sm font-semibold text-white sm:col-span-2"
          >
            {data.submitLabel}
          </button>
        </form>
      </div>
    </SectionShell>
  );
}
