<template>
  <div>
    <div class="mt-5 flex items-center">
      <div
        class="p-2 flex items-center justify-center border bg-btnPrimary/20 rounded-full"
      >
        <Icon
          class="w-6 h-6 bg-btnPrimary"
          :name="activityTypes[props.activityType]"
        />
      </div>
      <div class="ml-5">
        <div class="flex">
          <div class="font-sm font-bold font-inter">
            {{ acitivityUser }}
          </div>
          <div
            class="font-sm font-light font-inter ml-1 lowercase text-slate-500"
          >
            {{ activityDescription }}
          </div>
        </div>
        <div class="mt-2 font-thin font-inter">{{ activityDate }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
enum activityTypes {
  "material-symbols-light:add-comment-outline-rounded" = 1, //Если ставишь у первого значение, то у остальных инкреминтируется от первого.
  "material-symbols-light:edit-rounded",
  "material-symbols-light:call-received",
  "material-symbols-light:format-color-text-rounded",
}

const props = defineProps<{
  activityType: activityTypes;
  acitivityUser: string;
  activityDescription: string;
  activityDate: string;
}>();

const getActivityIcon = function () {
  const type = activityTypes[props.activityType];
};

onMounted(() => {
  getActivityIcon();
});
</script>
