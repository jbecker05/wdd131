

// form-demo.js — checkout form logic
// Handles toggling payment fields and lightweight validation

(function () {
  const form = document.getElementById('checkoutForm');
  if (!form) return; // HTML not on this page

  const paymentMethod = document.getElementById('paymentMethod');
  const ccContainer = document.getElementById('creditCardNumberContainer');
  const ppContainer = document.getElementById('paypalUsernameContainer');
  const ccInput = document.getElementById('creditCardNumber');
  const ppInput = document.getElementById('paypalUsername');
  const errorsEl = document.querySelector('.errors');

  function show(el) {
    if (!el) return;
    el.classList.remove('hide');
  }

  function hide(el) {
    if (!el) return;
    el.classList.add('hide');
  }

  function clearErrors() {
    if (!errorsEl) return;
    errorsEl.style.display = 'none';
    errorsEl.innerHTML = '';
  }

  function renderErrors(list) {
    if (!errorsEl) return;
    if (!list || !list.length) {
      clearErrors();
      return;
    }
    const items = list.map(msg => `<li>${msg}</li>`).join('');
    errorsEl.innerHTML = `<ul>${items}</ul>`;
    errorsEl.style.display = 'block';
    // bring into view for accessibility
    errorsEl.setAttribute('tabindex', '-1');
    errorsEl.focus({ preventScroll: false });
  }

  function updatePaymentFields() {
    const value = paymentMethod.value;
    if (value === 'creditCard') {
      show(ccContainer);
      hide(ppContainer);
      if (ccInput) ccInput.required = true;
      if (ppInput) {
        ppInput.required = false;
        ppInput.value = '';
      }
    } else if (value === 'paypal') {
      show(ppContainer);
      hide(ccContainer);
      if (ppInput) ppInput.required = true;
      if (ccInput) {
        ccInput.required = false;
        ccInput.value = '';
      }
    } else {
      hide(ccContainer);
      hide(ppContainer);
      if (ccInput) ccInput.required = false;
      if (ppInput) ppInput.required = false;
    }
  }

  paymentMethod.addEventListener('change', updatePaymentFields);
  // Initialize state on load
  updatePaymentFields();

  form.addEventListener('submit', function (e) {
    const problems = [];
    clearErrors();

    // Built-in validity first
    if (!form.fullName.value.trim()) problems.push('Full Name is required.');

    const email = form.email.value.trim();
    if (!email) {
      problems.push('Email is required.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      problems.push('Please enter a valid email address (e.g., name@example.com).');
    }

    if (!form.address.value.trim()) problems.push('Address is required.');

    const method = paymentMethod.value;
    if (!method) problems.push('Please choose a payment method.');

    if (method === 'creditCard') {
      const cc = (ccInput?.value || '').replace(/\s+/g, '');
      if (!/^\d{16}$/.test(cc)) {
        problems.push('Credit Card Number must be exactly 16 digits.');
      }
    }

    if (method === 'paypal') {
      const user = (ppInput?.value || '').trim();
      if (!user) problems.push('PayPal username is required.');
    }

    if (problems.length) {
      e.preventDefault();
      renderErrors(problems);
    } else {
      clearErrors();
      // let the form submit normally to completed.html
    }
  });
})();