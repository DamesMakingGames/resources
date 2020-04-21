<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <div class="header">
        <h1 class="text-4xl font-bold leading-tight">
          Tools
        </h1>
        <!-- <div class="intro mt-6 p-6 bg-gray-100">
          <p>
            The tools below have been shared by DMG members on Slack! Know of
            something cool to share?
          </p>
          <span class="lg:m-0 lg:p-0 align-middle my-6 flex">
            <a class="btn btn-red leading-normal align-middle" href=""
              >+ Submit</a
            >
          </span>
        </div> -->
      </div>
      <p class="text-gray-600 my-6">
        Last updated: {{ $context.today | luxon("LLL d, yyyy") }}
      </p>

      <div class="py-6 my-12 border-b border-t">
        <ul
          v-for="toolType in $page.toolTypes.edges"
          :key="toolType.id"
          class="flex flex-wrap border-gray-400"
        >
          <li class="inline-flex text-base font-bold mb-0">
            <a :href="`#${toolType.node.slug}`">{{ toolType.node.Name }}</a>
          </li>
        </ul>
      </div>
      <div
        v-for="toolType in $page.toolTypes.edges"
        :key="toolType.id"
        class="post border-gray-400 border-b pb-6 mb-6"
      >
        <h2 class="text-xl md:text-2xl font-bold mb-0" :id="toolType.node.slug">
          {{ toolType.node.Name }}
        </h2>
        <div class="">
          <div
            v-for="tool in toolType.node.belongsTo.edges"
            :key="tool.id"
            class="my-2"
          >
            <h3 class="text-xl">
              <a
                :href="tool.node.URL"
                :onclick="
                  `captureOutboundLink('${tool.node.URL}') return false ;`
                "
                target="_blank"
              >
                {{ tool.node.Name }}
              </a>
            </h3>

            <div v-html="tool.node.Notes" class="markdown-body mb-2 pb-4" />
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
  toolTypes: allToolType {
    edges {
      node {
        Name
        slug
        belongsTo(sortBy: "Name", order: ASC) {
          edges {
            node {
              ... on Tools {
                Name
                URL
                Notes
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
