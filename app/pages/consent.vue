<script setup lang="ts">
import type { FormKitNode } from '@formkit/core'

interface ConsentFormData {
  fullName: string
  dateOfBirth: string
  phone: string
  email: string
  address: string
  emergencyContact: {
    name: string
    phone: string
    relationship: string
  }
  medicalInfo: {
    conditions: string[]
    medications: string
    allergies: string
    bloodType: string
  }
  consentItems: string[]
  signature: string
}

const medicalConditions = [
  'Diabetes',
  'Heart Condition',
  'Hemophilia',
  'Hepatitis',
  'HIV/AIDS',
  'High Blood Pressure',
  'Epilepsy',
  'Pregnant/Nursing',
  'Skin Conditions',
]

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

const consentOptions = [
  { label: 'I understand that tattoos are permanent', value: 'understand' },
  {
    label: 'I acknowledge the risks of infection and allergic reactions',
    value: 'risks',
  },
  { label: 'I agree to follow all aftercare instructions', value: 'aftercare' },
  {
    label: 'I confirm I am not under the influence of drugs or alcohol',
    value: 'sober',
  },
  { label: 'I confirm I am 18 years of age or older', value: 'age' },
]

const handleSubmit = (data: unknown, node: FormKitNode) => {
  const formData = data as ConsentFormData
  console.log('Form submitted:', formData)
}
</script>

<template>
  <div class="p-4 w-full">
    <div
      class="max-w-2xl mx-auto w-full p-6 rounded-xl border border-zinc-700 hover:border-zinc-600 transition-colors"
    >
      <h1 class="text-2xl font-bold mb-4 text-center">Consent Form</h1>
      <FormKit type="form" @submit="handleSubmit">
        <!-- Personal Information -->
        <h3 class="text-lg font-bold mb-2">Personal Information</h3>
        <hr class="mt-2 mb-4 border-zinc-700" />
        <FormKit type="group" name="personalInfo" label="Personal Information">
          <div class="grid grid-cols-2 gap-x-4">
            <FormKit
              type="text"
              name="fullName"
              label="Full Name"
              validation="required"
              placeholder="Enter your full legal name"
              outer-class="col-span-2"
            />
            <FormKit
              type="date"
              name="dateOfBirth"
              label="Date of Birth"
              validation="required|date"
              help="You must be 18 or older to get a tattoo"
              outer-class="col-span-1"
            />
            <FormKit
              type="tel"
              name="phone"
              label="Phone Number"
              validation="required"
              placeholder="(555) 555-5555"
              outer-class="col-span-1"
            />
            <FormKit
              type="email"
              name="email"
              label="Email Address"
              validation="required|email"
              placeholder="your@email.com"
              outer-class="col-span-1"
            />
            <div class="col-span-2">
              <FormKit
                type="textarea"
                name="address"
                label="Full Address"
                validation="required"
                placeholder="Enter your complete address"
                outer-class="col-span-2"
              />
            </div>
          </div>
        </FormKit>

        <!-- Emergency Contact -->
        <h3 class="text-lg font-bold mb-2">Emergency Contact</h3>
        <hr class="my-2 border-zinc-700" />
        <FormKit type="group" name="emergencyContact" label="Emergency Contact">
          <div class="grid grid-cols-2 gap-x-4">
            <FormKit
              type="text"
              name="name"
              label="Contact Name"
              validation="required"
              outer-class="col-span-1"
            />
            <FormKit
              type="tel"
              name="phone"
              label="Contact Phone"
              validation="required"
              outer-class="col-span-1"
            />
            <FormKit
              type="text"
              name="relationship"
              label="Relationship"
              validation="required"
              outer-class="col-span-1"
            />
          </div>
        </FormKit>

        <!-- Medical Information -->
        <h3 class="text-lg font-bold mb-2">Medical Information</h3>
        <hr class="mt-2 mb-4 border-zinc-700" />
        <FormKit type="group" name="medicalInfo" label="Medical Information">
          <div class="grid grid-cols-2 gap-x-4">
            <div class="col-span-2">
              <FormKit
                type="checkbox"
                name="conditions"
                :options="medicalConditions"
                help="Select all that apply"
                outer-class="col-span-2"
              />
            </div>
            <FormKit
              type="textarea"
              name="medications"
              label="Current Medications"
              placeholder="List any medications you are currently taking"
              outer-class="col-span-2"
            />
            <FormKit
              type="textarea"
              name="allergies"
              label="Allergies"
              placeholder="List any allergies (especially to metals, latex, etc.)"
              outer-class="col-span-2"
            />
            <FormKit
              type="select"
              name="bloodType"
              label="Blood Type"
              :options="bloodTypes"
              placeholder="Select your blood type (if known)"
              outer-class="col-span-1"
            />
          </div>
        </FormKit>

        <!-- Consent Acknowledgment -->
        <h3 class="text-lg font-bold mb-2">Consent Acknowledgment</h3>
        <hr class="my-2 border-zinc-700" />
        <FormKit type="group" name="consent" label="Consent Acknowledgment">
          <div class="col-span-2">
            <FormKit
              type="checkbox"
              name="consentItems"
              :options="consentOptions"
              validation="required"
              outer-class="col-span-2"
            />
          </div>
        </FormKit>

        <!-- Signature Section -->
        <h3 class="text-lg font-bold mb-2">Signature</h3>
        <div class="col-span-2">
          <FormKit
            type="signature"
            name="signature"
            validation="required"
            help="Please sign your name to confirm all information is correct and you consent to the procedure"
            :width="625"
            :height="150"
            :line-width="1"
            line-color="#ffffff"
            input-class="bg-zinc-800 rounded-md"
          />
        </div>
      </FormKit>
    </div>
  </div>
</template>
