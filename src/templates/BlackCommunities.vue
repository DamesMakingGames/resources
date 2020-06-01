<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <div class="header">
        <h1 class="text-4xl font-bold leading-tight">
          Support Black Communities
        </h1>
      </div>
      <p class="text-gray-600 my-6">
        Last updated: {{ $context.today | luxon("LLL d, yyyy") }}
      </p>

      <div class="">
        <div
          v-for="link in $page.links.edges"
          :key="link.id"
          class="my-2 py-2 border-b"
        >
          <h2 class="text-2xl">
            <a :href="link.node.URL" target="_blank">{{ link.node.Title }}</a>
          </h2>

          <div class="flex jus justify-between mb-3">
            <div class="mb-0 source" v-if="link.node.Source">
              <span class="uppercase text-sm tracking-wide text-gray-600">
                Source
              </span>
              <span
                v-html="marked(link.node.Source)"
                class="markdown-body mb-2 pb-4"
              />
            </div>

            <div class=" mb-0" v-if="link.node.Locale == 'Toronto'">
              <span
                class="bg-black text-white uppercase text-sm tracking-wide px-1"
              >
                {{ link.node.Locale }}
              </span>
            </div>
          </div>

          <div
            v-html="marked(link.node.Notes)"
            class="markdown-body mb-2 pb-4"
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
  links: allBlackCommunities(sortBy: "Order", order: ASC) {
    edges {
      node {
        Title
        URL
        Notes
        Locale
        Source
        Order

      }
    }
  }
}


</page-query>
<style lang="postcss" scoped>
.post-link {
  @apply text-gray-800 font-normal leading-normal;
}
.source a:not(.btn) {
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
      title: "Support Black Communities",
      meta: [
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:image",
          content: `${
            this.$page.metadata.siteUrl
          }/images/black-communities.png`,
        },
        { name: "twitter:site", content: "@DMGToronto" },
        {
          name: "twitter:title",
          content: "Support Black Communities",
        },
        {
          name: "twitter:description",
          content:
            "Funds, donation opportunities, businesses, events, and individuals non-Black people can support.",
        },
        {
          name: "og:title",
          content: "links and Opportunities for DMG Members",
        },
        {
          name: "og:description",
          content:
            "Funds, donation opportunities, businesses, events, and individuals non-Black people can support.",
        },
        {
          name: "og:image",
          content: `${
            this.$page.metadata.siteUrl
          }/images/black-communities.png`,
        },
      ],
    };
  },
};
</script>
