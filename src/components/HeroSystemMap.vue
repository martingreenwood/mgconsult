<template>
  <div class="hero-system-visual" aria-hidden="true">
    <div class="hero-console">
      <div class="hero-console-bar">
        <span>Live Ops</span>
        <span>Sync OK</span>
      </div>

      <div class="hero-console-body">
        <div class="hero-console-row hero-console-row-a">
          <span>CMS</span>
          <i></i>
        </div>
        <div class="hero-console-row hero-console-row-b">
          <span>Booking</span>
          <i></i>
        </div>
        <div class="hero-console-row hero-console-row-c">
          <span>Payments</span>
          <i></i>
        </div>
        <div class="hero-console-row hero-console-row-d">
          <span>CRM</span>
          <i></i>
        </div>

        <svg class="hero-console-trace" viewBox="0 0 520 220" preserveAspectRatio="none" focusable="false">
          <path d="M16 142 C82 142 84 70 142 70 C196 70 198 170 252 170 C314 170 310 96 366 96 C430 96 432 134 504 134" />
          <path d="M16 164 C92 164 96 120 150 120 C210 120 210 42 270 42 C330 42 334 150 390 150 C448 150 450 104 504 104" />
        </svg>

        <div class="hero-console-readout">
          <strong>CALM SYSTEMS</strong>
          <span>inherited code / booking rules / payment edge cases</span>
        </div>
      </div>
    </div>

    <div class="hero-console-note hero-console-note-a">legacy.api.sync()</div>
    <div class="hero-console-note hero-console-note-b">cms.adapter.ready</div>
    <div class="hero-console-note hero-console-note-c">queue.clear</div>
  </div>
</template>
