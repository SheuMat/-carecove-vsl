"use client";

import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { qualifyFormSchema, type QualifyFormInput } from "@/lib/forms/lead-schema";
import type { TenderListItem } from "@/lib/tenders/types";

type QualifyModalProps = {
  tender: TenderListItem | null;
  open: boolean;
  onClose: () => void;
};

const initialForm: Omit<QualifyFormInput, "tenderTitle"> & { tenderTitle: string } = {
  tenderId: "",
  tenderTitle: "",
  contactName: "",
  role: "",
  email: "",
  phone: "",
  businessName: "",
  serviceType: "",
  businessAge: "",
  cqcStatus: "",
  cqcRating: "",
  currentContracts: "",
  capacityBand: "",
  regions: "",
  tenderExperience: "",
  notes: "",
  contactPreference: "CALLBACK"
};

const stepTitles = ["Your business", "Compliance", "Capacity", "Next step"];

export function QualifyModal({ tender, open, onClose }: QualifyModalProps) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ leadId: string; bookingUrl: string } | null>(null);

  useEffect(() => {
    if (!open || !tender) {
      return;
    }

    setStep(0);
    setError(null);
    setSuccess(null);
    setForm({
      ...initialForm,
      tenderId: tender.id,
      tenderTitle: tender.title
    });
  }, [open, tender]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const stepIsValid = useMemo(() => {
    if (step === 0) {
      return (
        form.contactName.trim() &&
        form.email.trim() &&
        form.phone.trim() &&
        form.businessName.trim() &&
        form.serviceType.trim()
      );
    }

    if (step === 1) {
      return form.cqcStatus.trim().length > 0;
    }

    return true;
  }, [form, step]);

  if (!open || !tender) {
    return null;
  }

  const activeTender = tender;

  async function submit(contactPreference: QualifyFormInput["contactPreference"]) {
    const payload = {
      ...form,
      tenderId: activeTender.id,
      tenderTitle: activeTender.title,
      contactPreference
    };

    const parsed = qualifyFormSchema.safeParse(payload);
    if (!parsed.success) {
      setError("Please complete the required fields before submitting.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(parsed.data)
      });

      if (!response.ok) {
        throw new Error("Lead submission failed");
      }

      const result = (await response.json()) as { leadId: string; bookingUrl: string };
      setSuccess(result);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "We couldn't submit your qualification request right now."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-ink-900/70 px-4 py-8 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[2.5rem] border border-white/10 bg-white shadow-glow">
        <div className="bg-[linear-gradient(135deg,#140a2e,#3d2278,#5535a0)] px-7 py-7 text-white sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-100/75">
                Qualify for this tender
              </p>
              <h3 className="mt-3 font-display text-3xl leading-tight">{activeTender.title}</h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/68">
                A proper backend qualification flow. Your answers are validated server-side and ready
                for CRM, webhook, and follow-up automation later.
              </p>
            </div>
            <button
              className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/80"
              onClick={onClose}
              type="button"
            >
              Close
            </button>
          </div>
        </div>

        {success ? (
          <div className="px-7 py-8 sm:px-8">
            <div className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
                Submission received
              </p>
              <h4 className="mt-3 font-display text-4xl text-ink-900">You&apos;re all set.</h4>
              <p className="mt-4 max-w-2xl text-base leading-8 text-plum-800/74">
                Sheu can now review your details against this tender. If you want to move faster, book
                the prefilled strategy call below.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button href={success.bookingUrl} target="_blank" variant="gold">
                  Book Zoom Call
                </Button>
                <Button onClick={onClose} variant="outline">
                  Back to tenders
                </Button>
              </div>
              <p className="mt-4 text-sm text-plum-700/60">Reference: {success.leadId}</p>
            </div>
          </div>
        ) : (
          <>
            <div className="border-b border-plum-100 px-7 py-4 sm:px-8">
              <div className="flex flex-wrap gap-3">
                {stepTitles.map((title, index) => (
                  <div className="flex items-center gap-2" key={title}>
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                        index <= step
                          ? "bg-plum-700 text-white"
                          : "border border-plum-200 bg-mist text-plum-700/55"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span className="text-sm text-plum-800/70">{title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-7 py-8 sm:px-8">
              {step === 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Your name *">
                    <input
                      className={inputClass}
                      onChange={(event) => setForm((current) => ({ ...current, contactName: event.target.value }))}
                      value={form.contactName}
                    />
                  </Field>
                  <Field label="Your role">
                    <input
                      className={inputClass}
                      onChange={(event) => setForm((current) => ({ ...current, role: event.target.value }))}
                      value={form.role}
                    />
                  </Field>
                  <Field label="Email *">
                    <input
                      className={inputClass}
                      onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                      type="email"
                      value={form.email}
                    />
                  </Field>
                  <Field label="Phone *">
                    <input
                      className={inputClass}
                      onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                      value={form.phone}
                    />
                  </Field>
                  <Field label="Business name *">
                    <input
                      className={inputClass}
                      onChange={(event) => setForm((current) => ({ ...current, businessName: event.target.value }))}
                      value={form.businessName}
                    />
                  </Field>
                  <Field label="Type of service *">
                    <select
                      className={inputClass}
                      onChange={(event) => setForm((current) => ({ ...current, serviceType: event.target.value }))}
                      value={form.serviceType}
                    >
                      <option value="">Select service type</option>
                      <option>Domiciliary / Home Care</option>
                      <option>Supported Living</option>
                      <option>Residential Care Home</option>
                      <option>Short Breaks / Respite</option>
                      <option>Day Services</option>
                      <option>Mental Health Services</option>
                      <option>Nursing Care</option>
                      <option>Learning Disabilities</option>
                      <option>Children&apos;s Services</option>
                      <option>Other Healthcare</option>
                    </select>
                  </Field>
                </div>
              ) : null}

              {step === 1 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Are you CQC registered? *">
                    <select
                      className={inputClass}
                      onChange={(event) => setForm((current) => ({ ...current, cqcStatus: event.target.value }))}
                      value={form.cqcStatus}
                    >
                      <option value="">Select CQC status</option>
                      <option value="Registered">Registered</option>
                      <option value="In progress">In progress</option>
                      <option value="Not yet">Not yet</option>
                      <option value="Not required">Not required</option>
                    </select>
                  </Field>
                  <Field label="Current CQC rating">
                    <select
                      className={inputClass}
                      onChange={(event) => setForm((current) => ({ ...current, cqcRating: event.target.value }))}
                      value={form.cqcRating}
                    >
                      <option value="">Select rating</option>
                      <option value="Outstanding">Outstanding</option>
                      <option value="Good">Good</option>
                      <option value="Requires Improvement">Requires Improvement</option>
                      <option value="Inadequate">Inadequate</option>
                      <option value="Awaiting inspection">Awaiting inspection</option>
                    </select>
                  </Field>
                  <Field label="How long have you been operating?">
                    <select
                      className={inputClass}
                      onChange={(event) => setForm((current) => ({ ...current, businessAge: event.target.value }))}
                      value={form.businessAge}
                    >
                      <option value="">Select age</option>
                      <option>Less than 1 year</option>
                      <option>1 to 2 years</option>
                      <option>2 to 5 years</option>
                      <option>5 to 10 years</option>
                      <option>10 plus years</option>
                    </select>
                  </Field>
                  <Field label="Do you currently hold public contracts?">
                    <select
                      className={inputClass}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, currentContracts: event.target.value }))
                      }
                      value={form.currentContracts}
                    >
                      <option value="">Select option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </Field>
                </div>
              ) : null}

              {step === 2 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="How many service users do you support?">
                    <select
                      className={inputClass}
                      onChange={(event) => setForm((current) => ({ ...current, capacityBand: event.target.value }))}
                      value={form.capacityBand}
                    >
                      <option value="">Select capacity</option>
                      <option>0 to 10</option>
                      <option>10 to 30</option>
                      <option>30 to 75</option>
                      <option>75 to 150</option>
                      <option>150 to 300</option>
                      <option>300 plus</option>
                    </select>
                  </Field>
                  <Field label="Operating regions">
                    <input
                      className={inputClass}
                      onChange={(event) => setForm((current) => ({ ...current, regions: event.target.value }))}
                      value={form.regions}
                    />
                  </Field>
                  <Field label="Tendering experience">
                    <select
                      className={inputClass}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, tenderExperience: event.target.value }))
                      }
                      value={form.tenderExperience}
                    >
                      <option value="">Select experience</option>
                      <option>Won public tenders before</option>
                      <option>Submitted but not won</option>
                      <option>First time tendering</option>
                      <option>Used external bid support before</option>
                    </select>
                  </Field>
                  <Field className="sm:col-span-2" label="Anything specific about this tender?">
                    <textarea
                      className={`${inputClass} min-h-[130px]`}
                      onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))}
                      value={form.notes}
                    />
                  </Field>
                </div>
              ) : null}

              {step === 3 ? (
                <div>
                  <div className="rounded-[2rem] border border-plum-100 bg-mist p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-plum-700/55">
                      Review
                    </p>
                    <h4 className="mt-3 font-display text-3xl text-ink-900">
                      How would you like Sheu to get back to you?
                    </h4>
                    <p className="mt-4 text-base leading-8 text-plum-800/74">
                      Choose your preferred response route. Either way, the submission is captured in a
                      backend-ready format for follow-up.
                    </p>
                  </div>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <button
                      className="rounded-[2rem] border border-plum-100 bg-white p-6 text-left shadow-soft transition hover:-translate-y-1 hover:shadow-glow"
                      disabled={submitting}
                      onClick={() => submit("CALLBACK")}
                      type="button"
                    >
                      <div className="font-display text-3xl text-ink-900">Call me back</div>
                      <p className="mt-3 text-sm leading-7 text-plum-800/68">
                        Submit your details and request a personal callback within 24 hours.
                      </p>
                    </button>
                    <button
                      className="rounded-[2rem] border border-gold-200 bg-gold-50 p-6 text-left shadow-gold transition hover:-translate-y-1"
                      disabled={submitting}
                      onClick={() => submit("ZOOM")}
                      type="button"
                    >
                      <div className="font-display text-3xl text-ink-900">Book Zoom now</div>
                      <p className="mt-3 text-sm leading-7 text-plum-800/68">
                        Submit and go straight to a prefilled booking link with the tender context
                        included.
                      </p>
                    </button>
                  </div>
                </div>
              ) : null}

              {error ? (
                <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {error}
                </div>
              ) : null}
            </div>

            <div className="flex items-center justify-between border-t border-plum-100 px-7 py-5 sm:px-8">
              <Button onClick={step === 0 ? onClose : () => setStep((value) => value - 1)} variant="outline">
                {step === 0 ? "Cancel" : "Back"}
              </Button>
              {step < 3 ? (
                <Button
                  disabled={!stepIsValid}
                  onClick={() => setStep((value) => value + 1)}
                  variant="primary"
                >
                  Continue
                </Button>
              ) : (
                <div className="text-sm text-plum-700/60">{submitting ? "Submitting..." : "Choose an option above"}</div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-2xl border border-plum-100 bg-mist px-4 py-3 text-sm text-ink-900 outline-none transition focus:border-plum-400 focus:bg-white";

function Field({
  label,
  children,
  className
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={className}>
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-plum-700/60">
        {label}
      </span>
      {children}
    </label>
  );
}
