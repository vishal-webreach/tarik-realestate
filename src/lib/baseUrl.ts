// import.meta.env.BASE_URL mirrors astro.config.mjs's `base` verbatim — for
// this project that's "/tarik-realestate", with no trailing slash — and
// Astro does NOT normalize it for you in any context (.astro, .tsx, or
// endpoint files alike). String-concatenating onto the raw value silently
// produces broken paths like "/tarik-realestatefavicon.png". Use this
// instead of import.meta.env.BASE_URL directly, anywhere it's just going to
// be concatenated with another path.
const raw = import.meta.env.BASE_URL;
export const BASE_URL = raw.endsWith("/") ? raw : `${raw}/`;
