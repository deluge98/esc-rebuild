import {
  MEMBERSHIP_FEATURE_NAMES,
  MEMBERSHIP_FOOTER_NOTE,
  MEMBERSHIP_TIERS,
} from "@/data/membership-pricing";

function CheckIcon() {
  return (
    <svg
      className="mx-auto h-4 w-4 text-green-600"
      viewBox="0 0 448 512"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
    </svg>
  );
}

function TimesIcon() {
  return (
    <svg
      className="mx-auto h-4 w-4 text-red-600"
      viewBox="0 0 384 512"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256l105.4-105.4z" />
    </svg>
  );
}

function FeatureIcon({ included }: { included: boolean }) {
  return (
    <span className="inline-flex justify-center" aria-label={included ? "Included" : "Not included"}>
      {included ? <CheckIcon /> : <TimesIcon />}
    </span>
  );
}

function featureRowClass(index: number): string {
  return index % 2 === 1 ? "bg-[#1ad8c8]" : "bg-white";
}

export default function MembershipPricingTable() {
  return (
    <div>
      {/* Desktop comparison table */}
      <div className="membership-pricing-table hidden overflow-x-auto lg:block">
        <div className="min-w-[760px] border-4 border-[#7a93ac]">
          <div className="grid grid-cols-5">
            {/* Tier name row */}
            <div className="bg-[#fcfff7] px-2 py-5" />
            {MEMBERSHIP_TIERS.map((tier) => (
              <div
                key={`${tier.id}-name`}
                className="bg-[#f7f7f7] px-2 py-5 text-center text-sm font-semibold text-[#1a1a1a]"
              >
                {tier.name}
              </div>
            ))}

            {/* Price row */}
            <div className="bg-[#fcfff7] px-2 py-5" />
            {MEMBERSHIP_TIERS.map((tier) => (
              <div
                key={`${tier.id}-price`}
                className="bg-[#21a0a0] px-2 py-5 text-center text-xl font-bold tracking-tight text-white"
              >
                {tier.price}
              </div>
            ))}

            {/* Feature rows */}
            {MEMBERSHIP_FEATURE_NAMES.map((feature, rowIndex) => (
              <div key={feature} className="contents">
                <div
                  className={`${featureRowClass(rowIndex)} px-4 py-3.5 text-right text-xs text-[#1a1a1a]`}
                >
                  {feature}
                </div>
                {MEMBERSHIP_TIERS.map((tier) => (
                  <div
                    key={`${tier.id}-${feature}`}
                    className={`${featureRowClass(rowIndex)} px-2 py-3.5 text-center`}
                  >
                    <FeatureIcon included={tier.included[rowIndex]} />
                  </div>
                ))}
              </div>
            ))}

            {/* Sign up row */}
            <div className="bg-[#fcfff7] px-2 py-5" />
            {MEMBERSHIP_TIERS.map((tier) => (
              <div key={`${tier.id}-cta`} className="bg-[#f7f7f7] px-2 py-5 text-center">
                <a
                  href={tier.signUpUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded bg-[#ed1c24] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#c41230]"
                >
                  Sign Up
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile stacked tiers */}
      <div className="space-y-6 lg:hidden">
        {MEMBERSHIP_TIERS.map((tier) => (
          <div key={tier.id} className="overflow-hidden border-4 border-[#7a93ac]">
            <div className="bg-[#f7f7f7] px-4 py-4 text-center text-sm font-semibold">
              {tier.name}
            </div>
            <div className="bg-[#21a0a0] px-4 py-4 text-center text-xl font-bold text-white">
              {tier.price}
            </div>
            <ul className="m-0 list-none p-0">
              {MEMBERSHIP_FEATURE_NAMES.map((feature, rowIndex) => (
                <li
                  key={feature}
                  className={`flex items-center justify-between px-4 py-3.5 text-xs ${featureRowClass(rowIndex)}`}
                >
                  <span className="font-semibold text-[#1a1a1a]">{feature}</span>
                  <FeatureIcon included={tier.included[rowIndex]} />
                </li>
              ))}
            </ul>
            <div className="bg-[#f7f7f7] px-4 py-5 text-center">
              <a
                href={tier.signUpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded bg-[#ed1c24] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#c41230]"
              >
                Sign Up
              </a>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-sm leading-relaxed text-gray-700">{MEMBERSHIP_FOOTER_NOTE}</p>
    </div>
  );
}
