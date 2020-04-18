<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <h1 class="text-4xl font-bold leading-tight">Resources</h1>
      <p class="text-gray-600">
        Last updated: {{ $context.today | luxon("LLL d, yyyy") }}
      </p>

      <div
        v-for="project in $page.resources.edges"
        :key="project.id"
        class="post border-gray-400 border-b pb-6 mb-6"
      >
        <h2 class="text-xl md:text-2xl font-bold mb-0">
          <a :href="project.node.url" target="_blank">{{
            project.node.name
          }}</a>
        </h2>
        <div v-html="project.node.notes" class="markdown-body mb-2 pb-4" />
        <!-- {{ project.node.created }} -->
        <div v-for="tag in project.node.tags" :key="tag.id">
          {{ tag }}
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query Resources {
  resources: allCovidResource(
    sortBy: "Created"
    order: ASC
  ) {
    edges {
      node {
        created
        name
        url
        notes
        authorOrPublisher
        tags
        expiration
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
