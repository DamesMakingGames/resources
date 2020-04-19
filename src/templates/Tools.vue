<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <h1 class="text-4xl font-bold leading-tight">Tools</h1>
      <!-- <p class="text-gray-600">
        Last updated: {{ $context.today | luxon("LLL d, yyyy") }}
      </p> -->

      <div class="">
        Coming soon.
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
