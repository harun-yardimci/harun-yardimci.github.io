/*
 * Site measurement, in one place.
 *
 * Every page loads this one file rather than carrying its own pasted snippet,
 * so switching a property or dropping a vendor is a one-line edit here instead
 * of six identical edits that drift apart.
 *
 * Both IDs start empty and each block is skipped while its ID is empty: an
 * unconfigured site loads nothing and makes no third-party request, rather
 * than shipping a broken tag that reports to nowhere.
 */
(function () {
  "use strict";

  /** GA4 measurement ID for this site, e.g. "G-XXXXXXXXXX". */
  var GA4_ID = "";

  /** Cloudflare Web Analytics site token (Dashboard → Web Analytics). */
  var CF_BEACON_TOKEN = "";

  if (GA4_ID) {
    var gtagSrc = document.createElement("script");
    gtagSrc.async = true;
    gtagSrc.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA4_ID);
    document.head.appendChild(gtagSrc);

    window.dataLayer = window.dataLayer || [];
    // gtag forwards `arguments` verbatim, so it cannot be an arrow function.
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    // The default page_view still fires; anonymising the IP costs nothing and
    // keeps the tag defensible under KVKK/GDPR without a consent prompt.
    window.gtag("config", GA4_ID, { anonymize_ip: true });
  }

  if (CF_BEACON_TOKEN) {
    var beacon = document.createElement("script");
    beacon.defer = true;
    beacon.src = "https://static.cloudflareinsights.com/beacon.min.js";
    beacon.setAttribute("data-cf-beacon", JSON.stringify({ token: CF_BEACON_TOKEN }));
    document.head.appendChild(beacon);
  }
})();
