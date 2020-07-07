<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <div class="header">
        <h1 class="text-4xl font-bold leading-tight">
          Gigs &amp; Opportunities
        </h1>
        <div class="intro mt-6 p-6 bg-gray-100">
          <p>
            All opportunities below have been shared by DMG members who work
            with or know the posting companies, and are <b>paid</b>. Have an
            opportunity to share with the community?
          </p>
          <span class="lg:m-0 lg:p-0 align-middle my-6 flex">
            <a
              class="btn btn-red leading-normal align-middle"
              href="https://airtable.com/shr90IMQUKUkkQxOO"
              >+ Submit</a
            >
          </span>
        </div>
      </div>
      <p class="text-gray-600 my-6">
        Last updated: {{ $context.today | luxon("LLL d, yyyy") }}
      </p>

      <div class="">
        <div
          v-for="gig in $page.gigs.edges"
          :key="gig.id"
          :class="`my-2 py-2 border-b ${gig.node.Closed ? 'closed' : 'open'}`"
        >
          <p class="closed-label">Closed</p>
          <h2 class="text-2xl">
            <div v-if="gig.node.Closed">
              {{ gig.node.Title }}
            </div>
            <div v-else-if="gig.node.URL">
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
          </h2>
          <p class="font-bold">
            {{ gig.node.Company }}
          </p>
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
            class="summary markdown-body mb-2 pb-4"
          />
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query {
  metadata {
    siteName
    siteUrl
  }
  gigs: allGig(sortBy: "posted", order: DESC) {
    
    edges {
      node {
        Title
        URL
        PDF {
          url
        }
        posted
        Company
        Location
        Closing_Date
        Closed
        Compensation
        Summary
      }
    }
  }
}


</page-query>
<style lang="postcss" scoped>
.post-link {
  @apply text-gray-800 font-normal leading-normal;
}
.open {
  .closed-label {
    @apply hidden;
  }
}
.closed {
  @apply bg-gray-100 p-6 relative;
  .closed-label {
    @apply visible absolute top-0 right-0 p-2 uppercase rounded-lg bg-white m-2;
  }
  p,
  .markdown-body p {
    @apply text-gray-600;
  }
  .summary,
  .info-block {
    @apply hidden;
  }
}
</style>
<script>
export default {
  data() {
    return {
      today: this.$today,
    };
  },
  metaInfo() {
    return {
      title: "DMG Gigs and Opportunities",
      meta: [
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:image",
          content: `${this.$page.metadata.siteUrl}/images/gigs.png`,
        },
        { name: "twitter:site", content: "@DMGToronto" },
        {
          name: "twitter:title",
          content: "Gigs and Opportunities for DMG Members",
        },
        {
          name: "twitter:description",
          content:
            "A directory of jobs, contracts, paid speaking Opportunities and other gigs by DMG members.",
        },
        { name: "og:title", content: "Gigs and Opportunities for DMG Members" },
        {
          name: "og:description",
          content:
            "A directory of jobs, contracts, paid speaking Opportunities and other gigs by DMG members.",
        },
        {
          name: "og:image",
          content: `${this.$page.metadata.siteUrl}/images/gigs.png`,
        },
      ],
    };
  },
};
</script>
