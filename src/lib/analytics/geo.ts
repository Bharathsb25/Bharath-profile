export interface Geo {
  country: string | null;
  region: string | null;
  city: string | null;
  timezone: string | null;
}

/**
 * Vercel's edge network stamps every request with these headers — free,
 * no external API call, no extra dependency. Absent entirely in local dev
 * (`next dev`), which is expected: geo just comes back all-null there.
 */
export function geoFromHeaders(headers: Headers): Geo {
  const city = headers.get("x-vercel-ip-city");
  return {
    country: headers.get("x-vercel-ip-country"),
    region: headers.get("x-vercel-ip-country-region"),
    city: city ? decodeURIComponent(city) : null,
    timezone: headers.get("x-vercel-ip-timezone"),
  };
}
