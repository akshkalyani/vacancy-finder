import { Building2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 mb-6">
          {/* Branding */}
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-indigo-500" />
            <div>
              <p className="text-sm font-bold text-gray-800">SRM Vacancies</p>
              <p className="text-xs text-gray-400">
                Estancia · Abode · Akshaya
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-xs text-gray-400">
            <button
              onClick={() =>
                document.getElementById("privacy-modal").showModal()
              }
              className="hover:text-indigo-500 transition underline underline-offset-2"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => document.getElementById("terms-modal").showModal()}
              className="hover:text-indigo-500 transition underline underline-offset-2"
            >
              Terms & Conditions
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mb-4" />

        {/* Bottom note */}
        <p className="text-xs text-gray-400 text-center leading-relaxed">
          © {new Date().getFullYear()} SRM Vacancies. This is a student-run
          platform for properties near SRM College. We are not affiliated with
          Estancia, Abode, or Akshaya. Listings are posted by students and we
          are not responsible for the accuracy of any listing.
        </p>
      </div>

      {/* ── Privacy Policy Modal ── */}
      <dialog
        id="privacy-modal"
        className="rounded-2xl shadow-xl w-full max-w-lg p-0 backdrop:bg-black/40 backdrop:backdrop-blur-sm"
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-800">Privacy Policy</h2>
          <button
            onClick={() => document.getElementById("privacy-modal").close()}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
          >
            ✕
          </button>
        </div>
        <div className="px-5 py-4 overflow-y-auto max-h-[60vh] text-sm text-gray-600 flex flex-col gap-4">
          <p className="text-xs text-gray-400">Last updated: April 2026</p>

          <Section title="1. Information We Collect">
            When you post a vacancy, we collect your name, WhatsApp number, and
            listing details (property, rent, flat type, floor, etc.). We do not
            collect any payment information, email addresses, or government IDs.
          </Section>

          <Section title="2. How We Use Your Information">
            Your name and phone number are displayed publicly on your vacancy
            listing so that interested students can contact you directly via
            WhatsApp. We do not use your information for marketing or share it
            with third parties.
          </Section>

          <Section title="3. Data Storage">
            All listing data is stored securely on Supabase (PostgreSQL).
            Listings are automatically hidden after 60 days. You can delete your
            own listing at any time using the delete code provided when you
            posted.
          </Section>

          <Section title="4. Cookies & Tracking">
            We do not use cookies, analytics trackers, or any form of user
            tracking on this platform.
          </Section>

          <Section title="5. Your Rights">
            You have the right to delete your listing at any time using your
            delete code. Since we collect no personal accounts, there is nothing
            else to request deletion of beyond your posted listing.
          </Section>

          <Section title="6. Contact">
            This is a student-run platform. For any concerns, reach out via
            WhatsApp to the platform administrator.
          </Section>
        </div>
        <div className="px-5 py-3 border-t border-gray-100">
          <button
            onClick={() => document.getElementById("privacy-modal").close()}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2.5 rounded-xl transition"
          >
            Got it
          </button>
        </div>
      </dialog>

      {/* ── Terms & Conditions Modal ── */}
      <dialog
        id="terms-modal"
        className="rounded-2xl shadow-xl w-full max-w-lg p-0 backdrop:bg-black/40 backdrop:backdrop-blur-sm"
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-800">
            Terms & Conditions
          </h2>
          <button
            onClick={() => document.getElementById("terms-modal").close()}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
          >
            ✕
          </button>
        </div>
        <div className="px-5 py-4 overflow-y-auto max-h-[60vh] text-sm text-gray-600 flex flex-col gap-4">
          <p className="text-xs text-gray-400">Last updated: April 2026</p>

          <Section title="1. Acceptance of Terms">
            By using SRM Vacancies, you agree to these terms. If you do not
            agree, please do not use this platform.
          </Section>

          <Section title="2. Platform Purpose">
            SRM Vacancies is a free, student-run notice board for listing and
            finding apartment vacancies near SRM College. It is not a real
            estate agency and does not facilitate any transactions.
          </Section>

          <Section title="3. Accuracy of Listings">
            Students are solely responsible for the accuracy of their listings.
            SRM Vacancies does not verify, endorse, or guarantee any listing.
            Always verify details directly with the poster before making any
            decisions.
          </Section>

          <Section title="4. Prohibited Use">
            You may not post false, misleading, or duplicate listings. You may
            not use this platform to harass, scam, or defraud other students.
            Violations may result in listings being removed.
          </Section>

          <Section title="5. Delete Codes">
            Your delete code is your sole means of removing your listing. Keep
            it safe. We cannot recover lost delete codes and are not responsible
            for listings that cannot be removed due to a lost code.
          </Section>

          <Section title="6. No Warranty">
            This platform is provided as-is with no guarantees of uptime,
            accuracy, or availability. We are not liable for any loss or damage
            arising from use of this platform.
          </Section>

          <Section title="7. Changes to Terms">
            These terms may be updated at any time. Continued use of the
            platform after changes constitutes acceptance of the new terms.
          </Section>
        </div>
        <div className="px-5 py-3 border-t border-gray-100">
          <button
            onClick={() => document.getElementById("terms-modal").close()}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2.5 rounded-xl transition"
          >
            Got it
          </button>
        </div>
      </dialog>
    </footer>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <p className="font-semibold text-gray-700 mb-1">{title}</p>
      <p className="leading-relaxed text-gray-500">{children}</p>
    </div>
  );
}
