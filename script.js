document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const toast = document.getElementById("toast");


  function isNotEmpty(value) {
    return value && value.trim().length > 1;
  }

 function isValidEmail(val) {
  if (!val) return false; 
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(val);
}

  function isValidTel(str) {
  if (!str) return false; 
  const pattern = /^\+?[0-9\s\-()]{7,20}$/;
  return pattern.test(str.trim());
}


  function showError(inputEl, message) {
    const errorEl = document.getElementById(inputEl.id + "Error");
    inputEl.setAttribute("aria-invalid", "true");
    if (errorEl) errorEl.textContent = message;
  }

  function clearError(inputEl) {
    const errorEl = document.getElementById(inputEl.id + "Error");
    inputEl.removeAttribute("aria-invalid");
    if (errorEl) errorEl.textContent = "";
  }

  function clearAllErrors() {
    ["firstName","lastName","email","phone","message"].forEach(id => {
      const el = document.getElementById(id);
      if(el) clearError(el);
    });
  }

  function showToast(message) {
    toast.textContent = message;
    toast.hidden = false;
    toast.style.opacity = "1";
    setTimeout(() => {
      toast.hidden = true;
    }, 3000);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearAllErrors();

    const firstName = form.firstName.value.trim();
    const lastName  = form.lastName.value.trim();
    const email    = form.email.value.trim();
    const phone   = form.phone.value.trim();
    const message   = form.message.value.trim();

    let hasError = false;

    if (!isNotEmpty(firstName)) {
      showError(form.firstName, "Please enter a first name (2+ characters).");
      hasError = true;
    }

    if (!isNotEmpty(lastName)) {
      showError(form.lastName, "Please enter a last name (2+ characters).");
      hasError = true;
    }

 
    if (!isValidEmail(email)) {
      showError(form.email, "Please enter a valid email address (e.g. abc@gmail.com)");
      hasError = true;
    }

  
    if (!isValidTel(phone)) {
      showError(form.phone, "Please enter a valid phone number");
      hasError = true;
    }

  
    if (!message || message.length < 10) {
      showError(form.message, "Please enter a longer message (min 10 characters).");
      hasError = true;
    }

    if (hasError) {
    
      const firstInvalid = form.querySelector("[aria-invalid='true']");
      if (firstInvalid) firstInvalid.focus();
      document.getElementById("form-status").textContent = "There are some errors in the form.";
      return;
    }

    
    const payload = { firstName, lastName, email, phone, message, timestamp: new Date().toISOString() };
    console.log("Form Data Submitted:", payload);

    showToast("Thanks  your message has been sent!");
    form.reset();
    document.getElementById("form-status").textContent = "Form submitted successfully.";
  });
});
