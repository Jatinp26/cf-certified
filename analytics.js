(function () {
  "use strict";
  var ADD_UTM = true;
  function track(link) {
    if (typeof window.va !== "function") return;
    var data = { button: link.getAttribute("data-track") };
    var path = link.getAttribute("data-path");
    if (path) data.path = path;
    window.va("event", { name: "Course page click", data: data });
  }
  var links = document.querySelectorAll("a[data-track]");
  Array.prototype.forEach.call(links, function (link) {
    if (ADD_UTM && /talentlms\.com/.test(link.href)) {
      try {
        var url = new URL(link.href);
        url.searchParams.set("utm_source", "certification.canton.foundation");
        url.searchParams.set("utm_medium", "referral");
        url.searchParams.set("utm_campaign", "info_page");
        url.searchParams.set("utm_content", link.getAttribute("data-track"));
        link.href = url.toString();
      } catch (e) { /* leave the link as it is */ }
    }
  });
  document.addEventListener("click", function (e) {
    var link = e.target.closest && e.target.closest("a[data-track]");
    if (link) track(link);
  }, true);
  document.addEventListener("auxclick", function (e) {
    if (e.button !== 1) return;
    var link = e.target.closest && e.target.closest("a[data-track]");
    if (link) track(link);
  }, true);
})();
