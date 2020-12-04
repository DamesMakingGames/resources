<template>
  <Layout>
    <div class="container-inner mx-auto my-16">
      <header class="border-b pb-3 border-gray-200 mb-3">
        <div class="edit flex float-right align-middle justify-center"></div>
        <h1
          class="text-4xl font-bold leading-tight"
          v-html="marked($page.list.title)"
        />
        <div class="text-2xl" v-html="marked($page.list.summary)" />
      </header>
      <div class="markdown-body mb-8" v-html="$page.list.content" />

      <div class="my-20">
        <g-link
          to="/reading-lists"
          class="font-bold flex align-middle justify-start"
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
            class="feather feather-arrow-left-circle mr-3"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 8 8 12 12 16"></polyline>
            <line x1="16" y1="12" x2="8" y2="12"></line>
          </svg>
          <span>Back to Reading Lists</span></g-link
        >
      </div>
    </div>
  </Layout>
</template>

<page-query>

query ReadingList($path: String!) {
  metadata {
    siteName
    siteUrl
  }
  list: readingList(path: $path) {
    title
    path
    content
    summary
    fileInfo {
      directory
      name
      extension
    }
  }
}


</page-query>
<style lang="postcss">
body#reading-list {
  .tag {
    @apply text-gray-800 font-normal leading-normal no-underline;
  }

  li {
    @apply border-b-2 border-gray-100 py-2;
    p {
      &:first-child {
        @apply text-xl mb-1;
      }
    }
  }
}
</style>
<script>
export default {
  metaInfo() {
    return {
      title: this.$page.list.title,
      meta: [
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:image",
          content: `${this.$page.metadata.siteUrl}/images/reading.png`,
        },
        { name: "twitter:site", content: "@DMGToronto" },
        {
          name: "twitter:title",
          content: this.$page.list.title,
        },
        {
          name: "twitter:description",
          content: this.$page.list.summary,
        },
        { name: "og:title", content: this.$page.list.title },
        {
          name: "og:description",
          content: this.$page.list.summary,
        },
        {
          name: "og:image",
          content: `${this.$page.metadata.siteUrl}/images/reading.png`,
        },
      ],
      bodyAttrs: {
        id: "reading-list",
      },
    };
  },
};
</script>

<style src="../css/github-markdown.css" />
