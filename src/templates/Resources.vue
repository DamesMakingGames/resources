<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <div class="header flex ar ju justify-between">
        <h1 class="text-4xl font-bold leading-tight">
          Resources
        </h1>
        <div class="intro">
          <span class="lg:m-0 lg:p-0 align-middle my-6 flex">
            <a class="btn btn-red leading-normal align-middle" href=""
              >+ Submit something</a
            >
          </span>
        </div>
      </div>
      <p class="text-gray-600 my-6">
        Last updated: {{ $context.today | luxon("LLL d, yyyy") }}
      </p>

      <div class="py-6 my-12 border-b border-t">
        <ul
          v-for="category in $page.allCategories.edges"
          :key="category.id"
          class="flex flex-wrap border-gray-400"
        >
          <li class="inline-flex text-base font-bold mb-0">
            <a :href="`#${slug(category.node.name)}`">{{
              category.node.name
            }}</a>
          </li>
        </ul>
      </div>
      <div
        v-for="category in $page.allCategories.edges"
        :key="category.id"
        class="post border-gray-400 border-b pb-6 mb-6"
      >
        <h2
          class="text-xl md:text-2xl font-bold mb-0"
          :id="slug(category.node.name)"
        >
          {{ category.node.name }}
        </h2>
        <div class="grid grid-cols-1 divide-y divide-gray-500">
          <div
            v-for="tool in category.node.belongsTo.edges"
            :key="tool.id"
            class="my-2"
          >
            <div class="flex justify-between  pt-2">
              <h3 class="text-lg">
                <a :href="tool.node.url" target="_blank">
                  {{ tool.node.title }}
                </a>
              </h3>
              <span
                v-html="tool.node.type[0].name"
                class="bg-gray-300 text-gray-600 rounded-sm px-2 py-1 text-sm"
              />
            </div>

            <div class="flex jus justify-between  mb-3">
              <div class="mb-0 source">
                <span
                  class="uppercase text-sm tracking-wide text-gray-600"
                  v-if="tool.node.source"
                >
                  Source
                </span>
                <span
                  v-if="tool.node.source"
                  v-html="marked(tool.node.source)"
                  class="markdown-body mb-2 pb-4 text-black"
                />
              </div>
            </div>

            <div
              v-if="tool.node.notes"
              v-html="marked(tool.node.notes)"
              class="markdown-body mb-2 pb-4"
            />
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query Resources {
  metadata {
    siteName
    siteUrl
  }
  allCategories: allCategory {
    edges {
      node {
        name
        belongsTo(sortBy: "name", order: ASC) {
          edges {
            node {
              ... on Resource {
                title
                url
                notes
                source
                type {
                  id
                  name
                }
                topic
              }
            }
          }
        }
      }
    }
  }
}


</page-query>
<style lang="postcss" scoped>
.post-link {
  @apply text-gray-800 font-normal leading-normal;
}
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
      title: "DMG Resources Site – Tools",
      meta: [
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:image",
          content: `${this.$page.metadata.siteUrl}/images/tools.png`,
        },
        { name: "twitter:site", content: "@DMGToronto" },
        {
          name: "twitter:title",
          content: "DMG Resources - Tools",
        },
        {
          name: "twitter:description",
          content: "A little list of tools recommended by and for DMG Members",
        },
        { name: "og:title", content: "DMG Resources - Tools" },
        {
          name: "og:description",
          content: "A little list of tools recommended by and for DMG Members",
        },
        {
          name: "og:image",
          content: `${this.$page.metadata.siteUrl}/images/tools.png`,
        },
      ],
    };
  },
};
</script>
