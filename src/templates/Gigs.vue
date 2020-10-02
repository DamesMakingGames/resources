<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <div class="header">
        <h1 class="text-4xl font-bold leading-tight">
          Gigs &amp; Opportunities
        </h1>
        <div class="intro mt-6 p-6 bg-gray-100">
          <p>
            All opportunities below have been shared by DMG members who work
            with or know the posting companies, and are <b>paid</b>. Have an
            opportunity to share with the community?
          </p>
          <span class="lg:m-0 lg:p-0 align-middle my-6 flex">
            <a
              class="btn btn-red leading-normal align-middle"
              href="https://airtable.com/shr90IMQUKUkkQxOO"
              >+ Submit</a
            >
          </span>
        </div>
      </div>
      <!-- <p class="text-gray-600 my-6">
        Last updated: {{ $context.today | luxon("LLL d, yyyy") }}
      </p> -->

      <GigList :gigs="$page.openGigs.edges" heading="Open Gigs" type="open" />
      <GigList
        :gigs="$page.closedGigs.edges"
        heading="Closed Gigs"
        type="closed"
      />
    </div>
  </Layout>
</template>

<page-query>
query {
  metadata {
    siteName
    siteUrl
  }
  openGigs: allGig(sortBy: "posted", order: DESC,filter: {Closed: {ne: true}}) {
    
    edges {
      node {
        Title
        URL
        PDF {
          url
        }
        posted
        Company
        Location
        Closing_Date
        Closed
        Compensation
        Summary
      }
    }
  }
  closedGigs: allGig(sortBy: "posted", order: DESC,filter: {Closed: {eq: true}}) {

    edges {
      node {
         Title
        URL
        PDF {
          url
        }
        posted
        Company
        Location
        Closing_Date
        Closed
        Compensation
        Summary
        
      }
    }
  }
}


</page-query>
<style lang="postcss" scoped></style>
<script>
import GigList from "@/components/GigList";

export default {
  components: {
    GigList,
  },
  data() {
    return {
      today: this.$today,
    };
  },
  metaInfo() {
    return {
      title: "DMG Gigs and Opportunities",
      meta: [
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:image",
          content: `${this.$page.metadata.siteUrl}/images/gigs.png`,
        },
        { name: "twitter:site", content: "@DMGToronto" },
        {
          name: "twitter:title",
          content: "Gigs and Opportunities for DMG Members",
        },
        {
          name: "twitter:description",
          content:
            "A directory of jobs, contracts, paid speaking Opportunities and other gigs by DMG members.",
        },
        { name: "og:title", content: "Gigs and Opportunities for DMG Members" },
        {
          name: "og:description",
          content:
            "A directory of jobs, contracts, paid speaking Opportunities and other gigs by DMG members.",
        },
        {
          name: "og:image",
          content: `${this.$page.metadata.siteUrl}/images/gigs.png`,
        },
      ],
    };
  },
};
</script>
