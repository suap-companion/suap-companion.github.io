// Preenche os links de download com a release mais recente do chamados; sem rede, os links
// continuam apontando para a página da release (o HTML já funciona sem este script).
(function () {
  var api = "https://api.github.com/repos/suap-companion/chamados/releases/latest";
  var targets = {
    "dl-android": "-android.apk",
    "dl-windows": "-windows-x86_64.zip",
    "dl-linux": "-linux-x86_64.tar.gz",
    "dl-macos": "-macos-aarch64.tar.gz"
  };
  var label = document.getElementById("versao");
  fetch(api, { headers: { Accept: "application/vnd.github+json" } })
    .then(function (response) { return response.ok ? response.json() : Promise.reject(); })
    .then(function (release) {
      if (label) { label.textContent = release.tag_name; }
      (release.assets || []).forEach(function (asset) {
        Object.keys(targets).forEach(function (id) {
          if (asset.name.endsWith(targets[id])) {
            var link = document.getElementById(id);
            if (link) { link.href = asset.browser_download_url; }
          }
        });
      });
    })
    .catch(function () {
      if (label) {
        var fallback = document.createElement("a");
        fallback.href = "https://github.com/suap-companion/chamados/releases/latest";
        fallback.textContent = "ver nas releases";
        label.textContent = "";
        label.appendChild(fallback);
      }
    });
})();
