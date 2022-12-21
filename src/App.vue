<template>

  <div v-bubble class="h-64 w-96 cursor-pointer bg-sky-50 shadow-gray-200" id="bind">
    x:{{ x }}  y:{{ y }}
  </div>
  <div v-bubble class="h-64 w-96 bg-sky-50" id="bind1">
    x:{{ x1 }}  y:{{ y1 }}
  </div>
  <div v-bubble class="h-64 w-96 bg-sky-50" id="bind2">
    x:{{ x2 }}  y:{{ y2 }}
  </div>

  <a-button @click="removeEventListener"> removeEventListener </a-button>

  <a-button @click="remove"> remove </a-button>
  <a-button v-bubble @click="toggleDark"> toggleDark  {{ isDark }}</a-button>
  <a-button @click="setTitle('测试数据' + ~~(Math.random() * 10))"> setTitle  {{ title }}</a-button>


  <br>
  <br>
  <br>
  <input type="text" value="11111">

</template>

<script lang="ts" setup>
import { useMouse, useWindowResize, useDark, useTitle } from '@/hooks';
const { x, y, removeEventListener } = useMouse('#bind')
const { x: x1, y: y1 } = useMouse('#bind1')
const { x:x2, y: y2  } = useMouse('#bind2')
const remove = useWindowResize(() => console.log(1111))
const { toggleDark, isDark } = useDark({ mounteElement: 'body'})
const { setTitle, title } = useTitle('')


</script>