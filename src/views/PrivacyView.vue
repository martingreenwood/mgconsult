<script setup lang="ts">
const lastUpdated = '8 September 2026'
const emailAddress = 'hello@martingreenwood.com'

const sections = [
  {
    title: 'Who this page is for',
    body: [
      'This privacy notice explains how Martin Greenwood and Neurospicy Studio Ltd handle personal information when you use martingreenwood.com, make an enquiry, or work with the consultancy.',
      'The site is intended for business enquiries. It does not knowingly collect information from children.',
    ],
  },
  {
    title: 'Information collected',
    body: [
      'When you contact Martin, the site may collect your name, email address, company name, project type, message, and any other details you choose to include.',
      'The site also processes basic technical information that browsers and servers normally send, such as IP address, device and browser information, pages visited, dates and times, referral information, and cookie or consent choices.',
    ],
  },
  {
    title: 'How information is used',
    body: [
      'Personal information is used to respond to enquiries, arrange calls, understand the work you are asking about, provide consultancy services, protect the website, and keep simple business records.',
      'Analytics information is used only to understand how the site is performing and which content is useful. Advertising storage, ad personalisation, and Google signals are disabled.',
    ],
  },
  {
    title: 'Cookies and analytics',
    body: [
      'The site stores an analytics consent choice in your browser for up to 180 days. Google Analytics is loaded only if you choose to allow analytics.',
      'If analytics are declined or later turned off, the site removes first-party Google Analytics cookies it can access. You can change your analytics choice at any time using the analytics settings link in the footer.',
    ],
  },
  {
    title: 'Sharing information',
    body: [
      'Information is shared only where needed to run the site, handle enquiries, provide services, comply with legal duties, or protect legitimate business interests.',
      'This may include website hosting, analytics, email, calendar, security, accounting, and professional advice providers. Personal information is not sold.',
    ],
  },
  {
    title: 'How long information is kept',
    body: [
      'Enquiry information is kept for as long as needed to respond, manage the relationship, and maintain appropriate business records.',
      'Analytics consent choices are kept for up to 180 days unless you update or clear them sooner. Server logs and technical records are kept for limited operational and security purposes.',
    ],
  },
  {
    title: 'Your rights',
    body: [
      'Depending on where you live, you may have rights to ask for access, correction, deletion, restriction, objection, portability, or withdrawal of consent.',
      "You can make a privacy request by emailing Martin. You also have the right to complain to your local data protection authority. In the UK, this is the Information Commissioner's Office.",
    ],
  },
]

const coatSections = [
  {
    title: 'Data collection',
    body: [
      'COAT Calendar Helper does not collect, store, sell, share, or transmit personal data.',
      'The extension runs locally in your browser on calendar.google.com. It reads the visible Google Calendar event description field only to check whether the COAT headings are already present and to insert the COAT template when you click "Apply COAT".',
      'The extension does not send calendar event content, meeting details, attendee information, browsing history, or any other user data to any server.',
    ],
  },
  {
    title: 'Permissions',
    body: [
      'COAT Calendar Helper requires access to calendar.google.com so it can add the "Apply COAT" button to the Google Calendar event editor and update the event description field in the browser.',
      'The extension does not request access to other websites.',
    ],
  },
  {
    title: 'Remote code',
    body: [
      'COAT Calendar Helper does not use remote code. All JavaScript and CSS used by the extension is included in the extension package.',
    ],
  },
  {
    title: 'Third-party services',
    body: [
      'The extension operates within Google Calendar but is not affiliated with, endorsed by, or sponsored by Google.',
    ],
  },
  {
    title: 'Data retention',
    body: [
      'Because COAT Calendar Helper does not collect or transmit data, it does not retain user data.',
    ],
  },
  {
    title: 'Changes to this policy',
    body: [
      "This policy may be updated if the extension's functionality changes. Any material change to data handling will be reflected in this privacy policy.",
    ],
  },
  {
    title: 'Contact',
    body: [`For questions about this privacy policy, contact Martin Greenwood at ${emailAddress}.`],
  },
]
</script>

<template>
  <section v-reveal class="privacy-hero" aria-labelledby="privacy-title">
    <div>
      <p class="eyebrow">Privacy</p>
      <h1 id="privacy-title">Privacy notice</h1>
    </div>
    <p>
      A plain-English summary of what this website collects, why it is used, and how to get in touch
      about your information.
    </p>
  </section>

  <section v-reveal class="privacy-layout section--cream" aria-labelledby="privacy-content-title">
    <aside class="privacy-summary" aria-label="Privacy summary">
      <p class="eyebrow">Last updated</p>
      <p>{{ lastUpdated }}</p>
      <a class="text-link" :href="`mailto:${emailAddress}`">{{ emailAddress }}</a>
    </aside>

    <div class="privacy-content">
      <h2 id="privacy-content-title">How your information is handled</h2>

      <article
        v-for="(section, index) in sections"
        :key="section.title"
        class="privacy-section"
        :style="{ '--reveal-delay': `${index * 50}ms` }"
        v-reveal
      >
        <h3>{{ section.title }}</h3>
        <p v-for="paragraph in section.body" :key="paragraph">
          {{ paragraph }}
        </p>
      </article>

      <section class="privacy-extension-policy" aria-labelledby="coat-calendar-helper-title">
        <div class="privacy-extension-policy__intro">
          <p class="eyebrow">Chrome extension</p>
          <h2 id="coat-calendar-helper-title">Privacy Policy for COAT Calendar Helper</h2>
          <p>Last updated: {{ lastUpdated }}</p>
          <p>
            COAT Calendar Helper is a Chrome extension that adds an "Apply COAT" button to Google
            Calendar event descriptions. COAT stands for Context, Objective, Agenda, and Takeaways.
          </p>
        </div>

        <article
          v-for="(section, index) in coatSections"
          :key="section.title"
          class="privacy-section"
          :style="{ '--reveal-delay': `${(sections.length + index) * 50}ms` }"
          v-reveal
        >
          <h3>{{ section.title }}</h3>
          <p v-for="paragraph in section.body" :key="paragraph">
            {{ paragraph }}
          </p>
        </article>
      </section>
    </div>
  </section>
</template>
