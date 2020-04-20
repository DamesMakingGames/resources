<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <div class="header">
        <h1 class="text-4xl font-bold leading-tight">
          COVID-19 Relief Resources
        </h1>
        <div class="intro mt-6 p-6 bg-gray-100">
          <p>
            The resources below have been shared by DMG members. Know of a tool,
            program, article or other resource related to COVID-19 that you
            think the community could benefit from?
          </p>
          <span class="lg:m-0 lg:p-0 align-middle my-6 flex">
            <a
              class="btn btn-red leading-normal align-middle"
              href="https://airtable.com/shrFmla1rCL3vXnOF"
              >+ Submit</a
            >
          </span>
        </div>
      </div>
      <p class="text-gray-600 my-6">
        Last updated: {{ $context.today | luxon("LLL d, yyyy") }}
      </p>

      <div class="py-6 my-12 border-b border-t">
        <ul
          v-for="topic in $page.topics.edges"
          :key="topic.id"
          class="flex flex-wrap border-gray-400"
        >
          <li class="inline-flex text-base font-bold mb-0">
            <a :href="`#${topic.node.slug}`">{{ topic.node.Name }}</a>
          </li>
        </ul>
      </div>
      <div
        v-for="topic in $page.topics.edges"
        :key="topic.id"
        class="post border-gray-400 border-b pb-6 mb-6"
      >
        <h2 class="text-xl md:text-2xl font-bold mb-0" :id="topic.node.slug">
          {{ topic.node.Name }}
        </h2>
        <div class="">
          <div
            v-for="resource in topic.node.belongsTo.edges"
            :key="resource.id"
            class="my-2"
          >
            <h3 class="text-xl">
              <a
                :href="resource.node.URL"
                :onclick="
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
        slug
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
