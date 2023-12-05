<template>
  <v-card
    class="dashed-primary-outline rounded-sm d-flex flex-column justify-center px-8 py-6"
    variant="outlined"
  >
    <div class="d-flex justify-center align-center">
      <v-icon color="primary" size="48">mdi-link</v-icon>
      <span class="text-h6 font-weight-bold text-color-secondary">
        {{ $t("submitPage.dropzone.link.title") }}
      </span>
    </div>
    <div class="d-flex justify-center">
      <v-text-field
        v-model="value"
        style="max-width: 361px;"
        class=""
        variant="outlined"
        density="compact"
        single-line
        :label="$t('submitPage.dropzone.link.label')"
        :rules="[isValidUrl]"
        @update:model-value="onUpdateModelValue"
      ></v-text-field>
    </div>
    <div v-if="showAddButton" class="d-flex justify-center">
      <v-btn
        :disabled="value.length === 0"
        color="primary"
        variant="outlined"
        class="unfilled-button"
        width="200px"
        @click="onAdd()"
      >
        {{ $t("common.add") }}
      </v-btn>
    </div>
  </v-card>
</template>

<script lang="ts" setup>
type SourceListProps = {
  modelValue?: string;
  showAddButton?: boolean;
};
const props = defineProps<SourceListProps>();
const emit = defineEmits(["update:modelValue", "add"]);
const { isValidUrl } = useFormValidation();
const value = ref("");

onMounted(() => {
  value.value = props.modelValue || "";
});

function onUpdateModelValue() {
  if (!props.showAddButton) {
    emit("update:modelValue", value.value);
  }
}

function onAdd() {
  console.log("onAdd", value.value);
  emit("add", value.value);
  value.value = "";
}
</script>
<style>
.v-card {
  min-height: 222px;
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
