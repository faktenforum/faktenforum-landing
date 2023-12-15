<template>
  <v-sheet class="pa-8 pa-sm-12">
    <v-row>
      <v-col>
        <h4 class="text-h4 mb-2">
          {{ $t("landingPage.news.title") }}
        </h4>
        <p class="py-4 text-body-1">
          {{ $t("landingPage.news.description") }}
        </p>
      </v-col>
    </v-row>
    <swiper
      :slidesPerView="1"
      :centeredSlides="false"
      :slidesPerGroupSkip="1"
      :grabCursor="true"
      :keyboard="{
        enabled: true
      }"
      :breakpoints="{
        '600': {
          slidesPerView: 2,
          slidesPerGroup: 2
        },
        '960': {
          slidesPerView: 3,
          slidesPerGroup: 3
        }
      }"
      :scrollbar="false"
      :navigation="true"
      :pagination="{
        clickable: true
      }"
      :auto-height="false"
      :modules="modules"
    >
      <swiper-slide v-if="pending" v-for="(item, index) in [1, 2]">
        <v-skeleton-loader
          elevation="0"
          class="mx-auto border"
          type="image, article"
        ></v-skeleton-loader>
      </swiper-slide>
      <swiper-slide v-for="(item, index) in data">
        <v-card elevation="0" class="pa-2 pb-6">
          <v-img
            :src="
              item.yoast_head_json.og_image &&
              item.yoast_head_json.og_image[0] &&
              item.yoast_head_json.og_image[0].url
            "
            height="200px"
            cover
          ></v-img>

          <v-card-title class="px-0 pt-4 text-h6 font-weight-bold">
            {{ item.yoast_head_json.title }}
          </v-card-title>
          <v-card-text class="px-0 text-body-1">
            <div v-html="item.yoast_head_json.description" style="width: 98%"></div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <a :href="item.link" target="_blank">
              <v-btn class="px-6" color="secondary" variant="text" size="large">
                {{ $t("factChecks.button.readArticle") }}
              </v-btn>
            </a>
          </v-card-actions>
        </v-card>
      </swiper-slide>
      <swiper-slide>
        <div
          elevation="0"
          class="d-flex align-center justify-center"
          style="
            width: 98%;
            height: 330px;
            background: url('/images/correctiv-faktencheck.jpg') no-repeat center center / cover;
          "
        >
          <a href="https://correctiv.org/faktencheck/" target="_blank">
            <v-btn class="text-secondary" variant="flat" color="primary" size="large">
              {{ $t("factChecks.button.gotTo") }}
            </v-btn></a
          >
        </div>
      </swiper-slide>
    </swiper>
  </v-sheet>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Keyboard, Scrollbar, Navigation, Pagination } from "swiper/modules";

const modules = [Keyboard, Scrollbar, Navigation, Pagination];
type Post = {
  id: number;
  link: string;
  yoast_head_json: {
    title: string;
    description: string;
    og_image: {
      url: string;
    }[];
  };
};

const url = "https://correctiv.org/wp-json/wp/v2/posts/?per_page=8&order=desc&orderby=date";

const { data, pending } = useFetch<Post[]>(url);

watch(data, (newValue) => {
  if (newValue) {
    console.log(JSON.parse(JSON.stringify(newValue)));
  }
});
</script>

<style scoped>
.v-card .v-card-subtitle {
  border-bottom: 1px solid rgb(var(--v-theme-secondary-lighten-1));
}
.v-card .v-card-title {
  border-bottom: 4px solid rgb(var(--v-theme-primary));
  line-height: 1;
}
.v-card-title.on-hover {
  opacity: 0.8;
  cursor: pointer;
}
</style>
