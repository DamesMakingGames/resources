<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <h1 class="text-4xl font-bold leading-tight">Reading Lists</h1>

      <div class="">
        <div
          v-for="list in $page.lists.edges"
          :key="list.id"
          class="my-2 py-2 border-b"
        >
          <h2 class="text-2xl">
            <a :href="list.node.path" v-html="marked(list.node.title)" />
          </h2>

          <div v-html="list.node.summary" class="markdown-body mb-2 pb-4" />
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query {

  lists: allReadingList {
    edges {
      node {
        title
        content
        summary
        path
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
      title: "DMG Reading Lists",
      meta: [
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:image",
          content: `${this.$page.metadata.siteUrl}/images/reading.png`,
        },
        { name: "twitter:site", content: "@DMGToronto" },
        {
          name: "twitter:title",
          content: "Reading Lists by and for DMG Members",
        },
        {
          name: "twitter:description",
          content: "Books, videos, games and more recommended by DMG folks.",
        },
        { name: "og:title", content: "Reading Lists by and for DMG Members" },
        {
          name: "og:description",
          content: "Books, videos, games and more recommended by DMG folks.",
        },
        {
          name: "og:image",
          content: `${this.$page.metadata.siteUrl}/images/reading.png`,
        },
      ],
    };
  },
};
</script>
