<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <h1 class="text-4xl font-bold leading-tight">Resources</h1>
      <p class="text-gray-600">
        Last updated: {{ $context.today | luxon("LLL d, yyyy") }}
      </p>

      <div
        v-for="topic in $page.topics.edges"
        :key="topic.id"
        class="post border-gray-400 border-b pb-6 mb-6"
      >
        <h2 class="text-xl md:text-2xl font-bold mb-0">
          {{ topic.node.Name }}
        </h2>
        <div class="">
          <div
            v-for="resource in topic.node.belongsTo.edges"
            :key="resource.id"
            class="my-2"
          >
            <h3 class="text-lg">
              <a
                :href="resource.node.URL"
                :click="
                  `captureOutboundLink('${resource.node.URL}') return false ;`
                "
                target="_blank"
              >
                {{ resource.node.Name }}
              </a>
            </h3>
            <h4 class=" text-base leading-relaxed text-gray-600">
              {{ resource.node.Author_or_Publisher }}
            </h4>
            <div v-html="resource.node.Notes" class="markdown-body mb-2 pb-4" />
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query Resources {
  topics: allTopic {
    edges {
      node {
        Name
        id
        belongsTo {
          edges {
            node {
              ... on CovidResource {
                Created
                Name
                URL
                Notes
                Author_or_Publisher
                Topics
                Expiration
                id
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
  metaInfo: {
    title: "DMG Programs Index",
  },
};
</script>
