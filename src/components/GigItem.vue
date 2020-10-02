<template>
  <div class="gig-item">
    <div :id="gig.id">
      <h2 class="text-2xl">
        <div class="title" v-if="gig.node.Closed">
          {{ gig.node.Title }}
        </div>
        <div v-else>
          <div v-if="gig.node.URL">
            <a :href="gig.node.URL" target="_blank">{{ gig.node.Title }}</a>
          </div>

          <div v-else-if="gig.node.PDF" class="flex">
            {{ gig.node.Title }}
            <a :href="gig.node.PDF[0].url"
              ><span class="text-base ml-2 mr-0">PDF</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-file inline h-4 items-center"
              >
                <path
                  d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
                ></path>
                <polyline points="13 2 13 9 20 9"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </h2>

      <p class="font-bold company">
        {{ gig.node.Company }}
      </p>
      <div v-if="!gig.node.Closed">
        <div class="info-block">
          <p class=" mb-0">
            <span class="uppercase text-sm tracking-wide text-gray-600">
              Posted</span
            >
            {{ gig.node.posted | luxon("LLL d, yyyy") }}
          </p>
          <p class=" mb-0" v-if="gig.node.Closing_Date">
            <span class="uppercase text-sm tracking-wide text-gray-600">
              Close date</span
            >
            {{ gig.node.Closing_Date | luxon("LLL d, yyyy") }}
          </p>
          <p class=" mb-0">
            <span class="uppercase text-sm tracking-wide text-gray-600">
              Compensation
            </span>
            {{ gig.node.Compensation }}
          </p>

          <p v-if="gig.node.Location">
            <span class="uppercase text-sm tracking-wide text-gray-600">
              Location
            </span>
            {{ gig.node.Location }}
          </p>
        </div>

        <div
          v-html="marked(gig.node.Summary)"
          class="summary markdown-body pb-4"
        />
      </div>
      <div v-else>
        <div class="info-block">
          <p class=" mb-0 text-sm text-gray-400">
            {{ gig.node.posted | luxon("LLL d, yyyy") }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.gig-item {
  @apply border-b py-4;
  p:last-child {
    @apply mb-0;
  }
}

.post-link {
  @apply text-gray-800 font-normal leading-normal;
}
.company {
  @apply text-sm mb-0 uppercase;
}
.open {
  .closed-label {
    @apply hidden;
  }
}
.closed {
  .gig-item {
    @apply border-b bg-gray-100 px-4 py-2 w-1/2;
    @screen md {
      @apply w-full;
    }
  }

  .title {
    @apply text-base leading-tight mb-2 font-bold;
  }
  .company {
    @apply text-sm mb-0 uppercase font-normal;
  }
  .closed-label {
    @apply visible absolute top-0 right-0 p-2 uppercase rounded-lg bg-white m-2;
  }
  p,
  .markdown-body p {
    @apply text-gray-600;
  }
}
</style>
<script>
import AccordionItem from "@/components/GigItem";
export default {
  props: ["gig"],
};
</script>
<style lang="postcss" scoped>
.block__list_container {
  @screen md {
    @apply grid grid-cols-2 gap-8;
  }
}

.block__heading {
  @apply text-2xl font-bold;
  @screen md {
    @apply text-3xl;
  }
}
</style>
