<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <h1 class="text-4xl font-bold leading-tight">Gigs &amp; Opportunities</h1>
      <p class="text-gray-600">
        Last updated: {{ $context.today | luxon("LLL d, yyyy") }}
      </p>

      <div class="">
        <div
          v-for="gig in $page.gigs.edges"
          :key="gig.id"
          class="my-2 py-2 border-b"
        >
          <h2 class="text-xl">
            <a
              :href="gig.node.URL"
              :click="`captureOutboundLink('${gig.node.URL}') return false ;`"
              target="_blank"
              >{{ gig.node.Title }}</a
            >

            <small class="uppercase text-sm tracking-wide text-red-500 ml-2">
              {{ gig.node.Company }}
            </small>
          </h2>
          <h3
            class="uppercase text-sm leading-loose tracking-wide text-gray-600"
          >
            Posted
            {{ gig.node.Posting_Date }}
          </h3>
          <div v-html="gig.node.Summary" class="markdown-body mb-2 pb-4" />
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query {
  gigs: allGig {
    edges {
      node {
        Title
        URL
        Posting_Date (format: "MMMM D, YYYY")
        Company
        Location
        Remuneration
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
  metaInfo: {
    title: "DMG Gigs Directory",
  },
};
</script>
