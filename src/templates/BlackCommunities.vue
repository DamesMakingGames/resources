<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <div class="header">
        <h1 class="text-4xl font-bold leading-tight">
          Support Black Communities
        </h1>
        <div class="intro mt-6 p-6 bg-gray-100">
          <p class="mb-0">
            We're collecting links shared within our community and from our
            partners to <b>actions</b> and <b>tools</b> for white and non-Black
            people to support individuals, organizing groups and others leading
            movements and directly impacted by state violence and racism in
            Toronto and the U.S.
          </p>
        </div>
      </div>
      <p class="text-gray-600 my-6">
        Last updated: {{ $context.today | luxon("LLL d, yyyy") }}
      </p>

      <div class="py-6 my-12 border-b border-t">
        <ul
          v-for="category in $page.categories.edges"
          :key="category.id"
          class="flex flex-wrap border-gray-400"
        >
          <li class="inline-flex text-base font-bold mb-0">
            <a :href="`#${category.node.slug}`">{{ category.node.Name }}</a>
          </li>
        </ul>
      </div>

      <div class="">
        <div
          v-for="category in $page.categories.edges"
          :key="category.id"
          class="my-2 py-2"
        >
          <h2
            class="text-xl md:text-2xl font-bold mb-0"
            :id="category.node.slug"
          >
            {{ category.node.Name }}
          </h2>
          <div
            v-for="link in category.node.belongsTo.edges"
            :key="link.id"
            :class="
              `my-2 border-b border-gray-300 ${
                link.node.Archive == true ? 'bg-gray-200 px-4 py-2' : ''
              }`
            "
          >
            <div v-if="link.node.Archive == true">
              <span class="text-sm text-gray-600 uppercase tracking-wider">
                Archived
              </span>
            </div>
            <h3 class="text-xl">
              <a :href="link.node.URL" target="_blank">{{ link.node.Title }}</a>
            </h3>

            <div class="flex jus justify-between  mb-3">
              <div class="mb-0 source">
                <span
                  class="uppercase text-sm tracking-wide text-gray-600"
                  v-if="link.node.Source"
                >
                  Source
                </span>
                <span
                  v-html="marked(link.node.Source)"
                  class="markdown-body mb-2 pb-4"
                />
              </div>

              <div class=" mb-0 flex-end" v-if="link.node.Locale">
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
    </div>
  </Layout>
</template>

<page-query>
query {
  metadata {
    siteName
    siteUrl
  }
  
categories: allCategory {
    edges {
      node {
        Name
        id
        slug
        belongsTo(sortBy: "Date_Added", order: DESC) {
          edges {
            node {
              ... on BlackCommunities {
                Title
                URL
                Notes
                Locale
                Source
                Order
                Archive
                Date_Added
              }
            }
          }
        }
      }
    }
  }
}


</page-query>
<style lang="postcss">
main {
  .post-link {
    @apply text-gray-800 font-normal leading-normal;
  }
  .source a:not(.btn) {
    @apply text-gray-800 font-normal leading-normal;
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
