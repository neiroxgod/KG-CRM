<script setup lang="ts">
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
const layout = "default";
</script>

<template>
  <NuxtLayout :name="layout">
    <Form>
      <FormField v-slot="">
        <FormItem>
          <FormLabel />
          <FormControl>
            <!-- any Form Input component or native input elements -->
          </FormControl>
          <FormDescription />
          <FormMessage />
        </FormItem>
      </FormField>
    </Form>
  </NuxtLayout>
</template>
