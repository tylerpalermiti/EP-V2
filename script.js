// EP Advisory — shared behavior: mobile nav drawer + contact form submit
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var drawer = document.querySelector(".mobile-drawer");
  var closeBtn = document.querySelector(".mobile-close");

  if (toggle && drawer) {
    toggle.addEventListener("click", function () {
      drawer.classList.add("open");
      document.body.style.overflow = "hidden";
      toggle.setAttribute("aria-expanded", "true");
    });
  }
  if (closeBtn && drawer) {
    closeBtn.addEventListener("click", function () {
      drawer.classList.remove("open");
      document.body.style.overflow = "";
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    });
  }
  drawer && drawer.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      drawer.classList.remove("open");
      document.body.style.overflow = "";
    });
  });

  // Contact form (Formspree) — progressive enhancement
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = document.getElementById("form-status");
      var success = document.querySelector(".form-success");
      var submitBtn = form.querySelector('button[type="submit"]');
      var data = new FormData(form);

      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Sending…"; }

      fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      })
        .then(function (response) {
          if (response.ok) {
            form.hidden = true;
            if (success) success.classList.add("show");
          } else {
            response.json().then(function (json) {
              if (status) {
                status.textContent =
                  json && json.errors
                    ? json.errors.map(function (err) { return err.message; }).join(", ")
                    : "Something went wrong. Please email info@epadvisorygroup.com directly.";
              }
            });
          }
        })
        .catch(function () {
          if (status) status.textContent = "Something went wrong. Please email info@epadvisorygroup.com directly.";
        })
        .finally(function () {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = "Schedule a Consultation"; }
        });
    });
  }
});
