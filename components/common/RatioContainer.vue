<template>
  <div :class="['aspect-ratio-container', $attrs.class]" :style="containerStyle">
    <div
      :class="[
        $attrs.class,
        'content',
        center ? 'd-flex justify-center align-center content' : undefined
      ]"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
type AspectRatios = "16/9" | "4/3" | "1/1";

const props = defineProps({
  center: {
    type: Boolean,
    default: false
  },
  width: {
    type: Number,
    default: undefined
  },
  aspectRatio: {
    type: String as () => AspectRatios,
    default: "16/9",
    validator: (value: string): boolean => ["16/9", "4/3", "1/1"].includes(value)
  }
});

const containerStyle = computed(() => {
  const ratioValues = props.aspectRatio.split("/").map(Number);
  const paddingValue = (ratioValues[1] / ratioValues[0]) * 100;
  return {
    paddingBottom: `${paddingValue}%`,
    width: props.width ? `${props.width}px !important` : undefined
  };
});
</script>

<style scoped>
.aspect-ratio-container {
  position: relative;
  height: 0;
  overflow: hidden;
}
.content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
