<template>
  <div class="account-form grid gap-8">
    <PersonalInformation />
    <BillingAndShipping />
    <ChangePassword />
  </div>
</template>

<style scoped>
.account-form input[type='text'],
.account-form input[type='email'],
.account-form input[type='tel'],
.account-form input[type='password'],
.account-form textarea,
.account-form .StripeElement,
.account-form select {
  background-color: white;
  border: 1px solid;
  border-radius: 0.375rem;
  outline: none;
  width: 100%;
  padding: 0.5rem 1rem;
  display: block;
}

@media (min-width: 768px) {
  .account-form input[type='text'],
  .account-form input[type='email'],
  .account-form input[type='tel'],
  .account-form input[type='password'],
  .account-form textarea,
  .account-form .StripeElement,
  .account-form select {
    background-color: #f9fafb;
  }
}

.account-form label {
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
  display: inline-block;
  text-transform: uppercase;
}
</style>
