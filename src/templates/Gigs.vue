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
          class="my-2 py-2 border-b"
        >
          <h2 class="text-2xl">
            <a
              :href="gig.node.URL"
              :onclick="`captureOutboundLink('${gig.node.URL}') return false ;`"
              target="_blank"
              >{{ gig.node.Title }}</a
            >

            <small class="uppercase text-sm tracking-wide text-red-500 ml-2">
              {{ gig.node.Company }}
            </small>
          </h2>
          <p class=" mb-0">
            <span class="uppercase text-sm tracking-wide text-gray-600">
              Posted</span
            >
            {{ gig.node.Posting_Date }}
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

          <div v-html="gig.node.Summary" class="markdown-body mb-2 pb-4" />
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
  gigs: allGig {
    edges {
      node {
        Title
        URL
        Posting_Date (format: "MMMM D, YYYY")
        Company
        Location
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
          content: "Gigs and Opportunies for DMG Members",
        },
        {
          name: "twitter:description",
          content:
            "A directory of jobs, contracts, paid speaking opportunies and other gigs by DMG members.",
        },
        { name: "og:title", content: "Gigs and Opportunies for DMG Members" },
        {
          name: "og:description",
          content:
            "A directory of jobs, contracts, paid speaking opportunies and other gigs by DMG members.",
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
