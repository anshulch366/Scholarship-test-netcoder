// ============================================
// Scholarship Test — Your Details page
// Simple form validation + redirect
// ============================================

(function () {
  var form = document.getElementById("detailsForm");
  if (!form) return;

  // Where to go after the form is valid (change this to your next page)
  var NEXT_PAGE = "choose-test.html";

  var fields = {
    name: document.getElementById("name"),
    mobile: document.getElementById("mobile"),
    email: document.getElementById("email"),
    city: document.getElementById("city"),
    education: document.getElementById("education"),
  };

  // Each rule returns true when the value is OK
  var rules = {
    name: function (v) {
      return v.trim().length >= 3 && /^[A-Za-z .'-]+$/.test(v.trim());
    },
    mobile: function (v) {
      return /^[6-9]\d{9}$/.test(v);
    },
    email: function (v) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
    },
    city: function (v) {
      return v !== "";
    },
    education: function (v) {
      return v !== "";
    },
  };

  function getWrapper(key) {
    return document.querySelector('[data-field="' + key + '"]');
  }

  function validateField(key) {
    var ok = rules[key](fields[key].value);
    getWrapper(key).classList.toggle("invalid", !ok);
    return ok;
  }

  // Mobile: allow digits only
  fields.mobile.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 10);
  });

  // Name: no digits
  fields.name.addEventListener("input", function () {
    this.value = this.value.replace(/[0-9]/g, "");
  });

  // Select colour: muted until something is chosen
  ["city", "education"].forEach(function (key) {
    var el = fields[key];
    function sync() {
      el.classList.toggle("empty", el.value === "");
    }
    sync();
    el.addEventListener("change", sync);
  });

  // Live validation: check on blur, then clear the error as soon as it is fixed
  Object.keys(fields).forEach(function (key) {
    fields[key].addEventListener("blur", function () {
      if (fields[key].value !== "" || getWrapper(key).classList.contains("invalid")) {
        validateField(key);
      }
    });
    var evt = fields[key].tagName === "SELECT" ? "change" : "input";
    fields[key].addEventListener(evt, function () {
      if (getWrapper(key).classList.contains("invalid")) validateField(key);
    });
  });

  // Submit
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var allOk = true;
    var firstBad = null;

    Object.keys(fields).forEach(function (key) {
      var ok = validateField(key);
      if (!ok && !firstBad) firstBad = fields[key];
      allOk = allOk && ok;
    });

    if (!allOk) {
      firstBad.focus();
      return;
    }

    var data = {
      name: fields.name.value.trim(),
      mobile: fields.mobile.value,
      email: fields.email.value.trim(),
      city: fields.city.value,
      education: fields.education.value,
    };

    // Save so the next page can read it
    try {
      sessionStorage.setItem("scholarshipUser", JSON.stringify(data));
    } catch (err) {
      /* storage can be blocked — ignore */
    }

    var btn = form.querySelector(".main-button");
    btn.disabled = true;

    // Short delay so the button feels responsive, then go to the next step
    setTimeout(function () {
      window.location.href = NEXT_PAGE;
    }, 300);
  });
})();