const salesforceOrgId = "00Df600000JT8RX";
const salesforceEndpoint = `https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=${salesforceOrgId}`;
const returnUrl = "https://sumeeturbannest.com/thank-you";

export type SalesforceLead = {
  lastName: string;
  phoneNumber: string;
  configuration: string;
  budget: string;
};

export function salesforceLeadBody(lead: SalesforceLead): URLSearchParams {
  const lastName = lead.lastName.trim();
  if (!lastName) throw new Error("Salesforce Last Name is required.");

  return new URLSearchParams({
    oid: salesforceOrgId,
    retURL: returnUrl,
    last_name: lastName.slice(0, 80),
    mobile: `+91${lead.phoneNumber}`,
    "00NT1000005OpwC": lead.configuration.slice(0, 255),
    "00NT1000005OoAU": lead.budget.slice(0, 255),
    lead_source: "Web",
  });
}

export async function submitSalesforceLead(lead: SalesforceLead): Promise<void> {
  const response = await fetch(salesforceEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
    body: salesforceLeadBody(lead),
    redirect: "manual",
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });

  // Salesforce can return either an HTTP redirect or a 200 HTML meta refresh.
  const location = response.headers.get("location");
  const target = location ? new URL(location, salesforceEndpoint) : null;
  const expected = new URL(returnUrl);
  const redirectedToThankYou = target !== null && target.origin === expected.origin && target.pathname === expected.pathname;
  if (response.status >= 300 && response.status < 400 && redirectedToThankYou) return;

  if (response.status === 200 && response.headers.get("content-type")?.includes("text/html")) {
    const html = await response.text();
    const hasThankYouMetaRefresh = (html.match(/<meta\b[^>]*>/gi) ?? []).some((tag) =>
      /http-equiv\s*=\s*["']?refresh["']?/i.test(tag) &&
      /content\s*=\s*["']0;\s*url=https:\/\/sumeeturbannest\.com\/thank-you["']/i.test(tag),
    );
    if (hasThankYouMetaRefresh) return;
  }

  throw new Error(`Salesforce Web-to-Lead did not confirm the thank-you page (${response.status})`);
}
