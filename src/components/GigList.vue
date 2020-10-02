<template>
  <div class="gig-list">
    <h2
      class="text-center text-3xl leading-9 font-extrabold sm:text-4xl sm:leading-10 block__heading"
      v-if="heading"
      v-html="heading"
    />
    <div :class="`gigs ${type}`">
      <gig-item v-for="gig in gigs" :gig="gig" :key="gig.id" />
    </div>
  </div>
</template>
<script>
import GigItem from "@/components/GigItem";
export default {
  components: {
    GigItem,
  },

  props: ["heading", "gigs", "type"],
};
</script>
<style lang="postcss" scoped>
.closed {
  @apply flex flex-wrap;
  @screen md {
    @apply grid grid-cols-3 gap-2;
  }
}
.block__list_container {
  @screen md {
    @apply grid grid-cols-2 gap-8;
  }
}

.block__heading {
  @apply text-2xl font-bold my-8;
  @screen md {
    @apply text-3xl;
  }
}
</style>
