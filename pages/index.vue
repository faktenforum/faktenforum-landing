<template>
  <v-container class="my-2" fluid>
    <div class="h-spacer"></div>
    <v-sheet tag="header" color="primary" height="500">
      <v-img src="/images/hero-bg.jpg" cover class="pa-10">
        <v-row>
          <v-col>
            <h1 class="text-h2 font-weight-black">Faktenforum</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h2 class="text-h3">Take action against missinformation</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xs="12" sm="10" md="7" lg="6">
            <div class="text-subtitle-1">
              On CORRECTIV.Faktenforum people take action to counter disinformation and train their
              media and information literacy skills. Journalistic experience is not required.
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="text-subtitle-1 text-weight-bold">
              Every contribution counts - which is yours?
            </div>
          </v-col>
        </v-row>
      </v-img>
    </v-sheet>
    <div class="h-spacer"></div>
    <v-sheet tag="section" class="pa-10">
      <v-row>
        <v-col cols="12" xs="12" sm="6" md="4" lg="4" xl="4">
          <h4 class="text-h4 mb-2">{{ $t("landingPage.callToActions.join.title") }}</h4>
          <span>
            {{ $t("landingPage.callToActions.join.text") }}
          </span>
          <v-text-field
            density="compact"
            type="email"
            label="Email address"
            dense
            variant="outlined"
            class="mt-4"
          />
          <v-btn class="w-100" color="primary" variant="flat"> Sign Up </v-btn>
        </v-col>
        <v-col cols="12" xs="12" sm="6" md="4" lg="4" xl="4">
          <h4 class="text-h4 mb-2">{{ $t("landingPage.callToActions.submit.title") }}</h4>
          <span>
            {{ $t("landingPage.callToActions.submit.text") }}
          </span>
          <NuxtLink to="/submission/">
            <v-btn class="w-100 mt-4" color="primary" variant="flat"> Submit Claim </v-btn>
          </NuxtLink>
        </v-col>
        <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
          <h4 class="text-h4 mb-2">{{ $t("landingPage.callToActions.learn.title") }}</h4>
          <span>
            {{ $t("landingPage.callToActions.learn.text") }}
          </span>
          <v-list :items="learnMoreItems" item-props lines="two">
            <template v-slot:subtitle="{ subtitle }">
              <div v-html="subtitle"></div>
            </template>
            <template v-slot:prepend="{ item }">
              <v-container fluid class="pa-0 pr-2 ma-0">
                <v-img :width="70" aspect-ratio="4/3" cover :src="item.prependAvatar" />
              </v-container>
            </template>
          </v-list>
        </v-col>
      </v-row>
    </v-sheet>
    <div class="h-spacer"></div>
    <v-sheet tag="section" class="pa-10">
      <Calendar></Calendar>
    </v-sheet>
    <fact-checks />
  </v-container>
</template>
<script lang="ts" setup>
import Calendar from "~/components/Calendar.vue";

const learnMoreItems = ref([
  {
    prependAvatar: "https://dummyimage.com/4:3x60/",
    title: "10 tips",
    subtitle: `<span class="font-italic">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`
  },
  { type: "divider", inset: false },
  {
    prependAvatar: "https://dummyimage.com/4:3x60/",
    title: "Infoflyer",
    subtitle: `<span class="font-italic">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`
  },
  { type: "divider", inset: false },
  {
    prependAvatar: "https://dummyimage.com/4:3x60/",
    title: "How to",
    subtitle:
      '<span class="font-italic">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?'
  }
]);
</script>
<style scoped>
.v-container {
  max-width: 1066px;
  min-height: 100%;
}
h1 small {
  display: block;
}
h2.text-h3 {
  font-family: "JetBrainsMono" !important;
  font-weight: 600;
}
.v-container > :nth-child(1).h-spacer {
  height: 10px;
}
.h-spacer {
  height: 60px;
}
</style>
