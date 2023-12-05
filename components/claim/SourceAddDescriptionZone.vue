<template>
  <v-card
    class="background-color-primary d-flex flex-column justify-center px-8 py-4"
    variant="outlined"
  >
    <div class="pb-2">
      {{ $t("submitPage.dropzone.claim.title") }}
    </div>

    <v-textarea
      v-model="value"
      class="flex-grow-1 elevation-0"
      variant="outlined"
      density="compact"
      :label="$t('submitPage.dropzone.claim.label')"
    ></v-textarea>
  </v-card>
</template>

<script lang="ts" setup>
type SourceListProps = {
  modelValue: string;
};
const props = defineProps<SourceListProps>();
const emit = defineEmits(["update:modelValue", "add"]);

const value = useVModel(props, "modelValue", emit);
</script>
<style>
.v-card {
  min-height: 222px;
  border: 0;
}
.unfilled-button {
  max-width: 361px;
  width: 100%;
}
.filled-button {
  max-width: 460px;
  width: 100%;
}
</style>
