<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <h1 class="text-4xl font-bold leading-tight">Reading Lists</h1>
      <div class="intro mt-6 p-6 bg-gray-100">
        <p marked>
          We&#8217;re compiling read/watch recommendations on topics related to
          <b>
            everything making games
          </b>
          from members of our community. Want to contribute a curated list of
          books, links, videos or other resources on a topic?
        </p>
        <span class="lg:m-0 lg:p-0 align-middle my-6 flex">
          <a
            class="btn btn-red leading-normal align-middle flex"
            href="mailto:membership@dmg.to"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-mail mr-3"
            >
              <path
                d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
              ></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            Email us</a
          >
        </span>
      </div>
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
  metadata {
    siteName
    siteUrl
  }
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
