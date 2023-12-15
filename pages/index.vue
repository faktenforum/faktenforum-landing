<template>
  <v-container class="my-2" fluid>
    <div class="h-spacer"></div>
    <v-sheet tag="header" color="primary">
      <v-img
        src="/images/hero-bg.jpg"
        cover
        height="480"
        class="pa-8 pa-sm-12 d-flex align-center justify-center"
      >
        <v-row>
          <v-col>
            <h2 class="text-h3 font-weight-medium mb-4">{{ $t("landingPage.header.title") }}</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xs="12" sm="10" md="8" lg="6">
            <div class="text-secondary text-body-1 text-sm-h5 font-weight-regular">
              {{ $t("landingPage.header.description") }}
            </div>
          </v-col>
        </v-row>
      </v-img>
    </v-sheet>
    <div class="h-spacer"></div>
    <v-sheet tag="section" class="pa-8 pa-sm-12">
      <v-row>
        <v-col class="d-flex flex-column" cols="12" xs="12" sm="6" md="4" lg="4" xl="4">
          <h4 class="text-h5 mb-2 ff-title">{{ $t("landingPage.callToActions.join.title") }}</h4>
          <span class="text-body-1 flex-grow-1">
            {{ $t("landingPage.callToActions.join.text") }}
          </span>
          <div class="w-100 text-center">
            <newsletter-registration
              class="w-100 button-max-width text-secondary mt-6"
              color="primary"
              variant="flat"
              size="large"
            >
              {{ $t("landingPage.callToActions.join.button") }}</newsletter-registration
            >
          </div>
        </v-col>
        <v-col class="d-flex flex-column" cols="12" xs="12" sm="6" md="4" lg="4" xl="4">
          <h4 class="text-h5 mb-2 ff-title">{{ $t("landingPage.callToActions.submit.title") }}</h4>
          <span class="text-body-1 flex-grow-1">
            {{ $t("landingPage.callToActions.submit.text") }}
          </span>
          <div class="w-100 text-center">
            <NuxtLink to="/submission/" class="">
              <v-btn
                class="w-100 button-max-width text-secondary mt-6"
                color="primary"
                variant="flat"
                size="large"
              >
                {{ $t("landingPage.callToActions.submit.button") }}
              </v-btn>
            </NuxtLink>
          </div>
        </v-col>
        <v-col class="d-flex flex-column" cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
          <h4 class="text-h5 mb-2 ff-title">
            {{ $t("landingPage.callToActions.learn.title") }}
          </h4>
          <span class="text-body-1 flex-grow-1">
            {{ $t("landingPage.callToActions.learn.text") }}
          </span>
          <div class="">
            <div class="w-100 text-center">
              <v-btn
                class="w-100 button-max-width text-secondary mt-6"
                color="primary"
                variant="flat"
                size="large"
              >
                {{ $t("landingPage.callToActions.learn.button") }}
              </v-btn>
            </div>
          </div>

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
    </v-sheet>
    <div class="h-spacer"></div>
    <v-sheet tag="section" class="pa-8 pa-sm-12">
      <calendar></calendar>
    </v-sheet>
    <fact-checks />
    <div class="h-spacer"></div>
    <v-sheet tag="section" class="pa-8 pa-sm-12">
      <v-row class="mt-8">
        <v-col>
          <!-- <h3 class="text-body-1 font-weight-black text-uppercase text-secondary-lighten-3"> -->
          <h4 class="text-h4 mb-2">
            {{ $t("landingPage.chatbot.title") }}
          </h4>
          <!-- </h3> -->
          <p class="py-4">
            {{ $t("landingPage.chatbot.description") }}
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="12" md="6">
          <v-text-field
            v-model="newMessage"
            class="custom-text-field"
            :label="$t('chatbot.textfield.label')"
            density="compact"
            variant="solo"
            hide-details
            color="secondary"
            @keyup.enter="onSendButtonClick"
          >
            <template v-slot:append-inner>
              <v-btn
                icon
                variant="plain"
                density="default"
                size="default"
                :disabled="newMessage.length === 0 || loading"
                color="primary"
                @click="onSendButtonClick"
              >
                <v-icon>mdi-send</v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </v-sheet>
    <div class="h-spacer"></div>
  </v-container>
</template>
<script lang="ts" setup>
const store = useChatBotStore();
const { sendMessage, activateBot } = store;
const { loading } = storeToRefs(useChatBotStore());

const newMessage = ref("");
async function onSendButtonClick() {
  activateBot();
  sendMessage(newMessage.value);
  newMessage.value = "";
}
</script>

<style scoped>
.v-container {
  max-width: 1066px;
  min-height: 100%;
}
h1 small {
  display: block;
}
.v-container > :nth-child(1).h-spacer {
  height: 10px;
}
.h-spacer {
  height: 60px;
}
.v-card-item {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
.button-max-width {
  max-width: 298px;
}
</style>
