<template>
  <n-config-provider>
    <n-button> add </n-button>
    <test />
  </n-config-provider>
</template>

<script lang="ts" setup>
import test from '@/components/test.vue'
import { ref, reactive } from "vue"


function getMaxElNumber (array: string): string {
  let tempObj: Record<string, number> = {}
  const markObj: Record<string, number> = {}
  for (let index = 0; index < array.length; index++) {
    const currentElement = array[index];
    const nexttElement = array[index + 1];

    if (Reflect.get(markObj, currentElement)) {

    } else {
      Reflect.set(markObj, currentElement , 1)
      
    }



  }
  return ''
}


console.log(getMaxElNumber('wwwqqqqrrreee'));




</script> 