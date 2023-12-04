<template>
  <v-container class="my-2" fluid>
    <div class="h-spacer"></div>
    <v-sheet tag="header" color="primary" height="500">
      <v-img src="/images/hero-bg.jpg" cover class="pa-6">
        <v-row>
          <v-col>
            <h2 class="text-h3">{{ $t("landingPage.header.title") }}</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xs="12" sm="10" md="7" lg="6">
            <div class="text-h6">
              {{ $t("landingPage.header.description") }}
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
        </v-col>
        <v-col cols="12" xs="12" sm="6" md="4" lg="4" xl="4">
          <h4 class="text-h4 mb-2">{{ $t("landingPage.callToActions.submit.title") }}</h4>
          <span>
            {{ $t("landingPage.callToActions.submit.text") }}
          </span>
        </v-col>
        <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
          <h4 class="text-h4 mb-2">{{ $t("landingPage.callToActions.learn.title") }}</h4>
          <span>
            {{ $t("landingPage.callToActions.learn.text") }}
          </span>

          <!-- <v-list :items="learnMoreItems" item-props lines="two">
            <template v-slot:subtitle="{ subtitle }">
              <div v-html="subtitle"></div>
            </template>
            <template v-slot:prepend="{ item }">
              <v-container fluid class="pa-0 pr-2 ma-0">
                <v-img :width="70" aspect-ratio="4/3" cover :src="item.prependAvatar" />
              </v-container>
            </template>
          </v-list> -->
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" xs="12" sm="6" md="4" lg="4" xl="4">
          <NuxtLink to="/submission/">
            <v-btn class="w-100" color="primary" variant="flat">
              {{ $t("landingPage.callToActions.join.button") }}</v-btn
            >
          </NuxtLink>
        </v-col>
        <v-col cols="12" xs="12" sm="6" md="4" lg="4" xl="4">
          <NuxtLink to="/submission/">
            <v-btn class="w-100" color="primary" variant="flat">
              {{ $t("landingPage.callToActions.submit.button") }}
            </v-btn>
          </NuxtLink>
        </v-col>
        <v-col cols="12" xs="12" sm="6" md="4" lg="4" xl="4">
          <NuxtLink to="/submission/">
            <v-btn class="w-100" color="primary" variant="flat">
              {{ $t("landingPage.callToActions.learn.button") }}
            </v-btn>
          </NuxtLink>
        </v-col>
      </v-row>
    </v-sheet>
    <div class="h-spacer"></div>
    <v-sheet tag="section" class="pa-10">
      <calendar></calendar>
    </v-sheet>
    <fact-checks />
    <div class="h-spacer"></div>
    <div class="h-spacer"></div>
  </v-container>
</template>
<script lang="ts" setup></script>
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
