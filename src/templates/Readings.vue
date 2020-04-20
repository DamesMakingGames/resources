<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <h1 class="text-4xl font-bold leading-tight">Reading List</h1>

      <div class="">
        <div
          v-for="reading in $page.readings.edges"
          :key="reading.id"
          class="my-2 py-2 border-b"
        >
          <h2 class="text-base">
            <a
              :href="reading.node.URL"
              :onclick="
                `captureOutboundLink('${reading.node.URL}') return false ;`
              "
              target="_blank"
              >{{ reading.node.Name }}</a
            >
          </h2>

          <div v-html="reading.node.Notes" class="markdown-body mb-2 pb-4" />
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query {
  readings: allReading {
    edges {
      node {
        Name
        URL
        Notes
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
