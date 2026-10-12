const salesforceOrgId = "00Df600000JT8RX";
const salesforceEndpoint = `https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=${salesforceOrgId}`;
const returnUrl = "https://sumeeturbannest.com/thank-you";

export type SalesforceLead = {
  fullName: string;
  phoneNumber: string;
  configuration: string;
  budget: string;
};

export function salesforceLeadBody(lead: SalesforceLead): URLSearchParams {
  return new URLSearchParams({
    oid: salesforceOrgId,
    retURL: returnUrl,
    last_name: lead.fullName.slice(0, 80),
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

  // The generated form's return URL is the only success signal Web-to-Lead provides.
  // Do not follow the redirect from the server or treat an HTML error page as success.
  const location = response.headers.get("location");
  const target = location ? new URL(location, salesforceEndpoint) : null;
  const expected = new URL(returnUrl);
  const redirectedToThankYou = target !== null && target.origin === expected.origin && target.pathname === expected.pathname;
  if (response.status < 300 || response.status >= 400 || !redirectedToThankYou) {
    throw new Error(`Salesforce Web-to-Lead did not redirect to the thank-you page (${response.status})`);
  }
}
