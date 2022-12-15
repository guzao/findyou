<template>

  <div class="h-64 w-96 bg-sky-50" id="bind">
    x:{{ x }}  y:{{ y }}
  </div>
  <div class="h-64 w-96 bg-sky-50" id="bind1">
    x:{{ x1 }}  y:{{ y1 }}
  </div>
  <div class="h-64 w-96 bg-sky-50" id="bind2">
    x:{{ x2 }}  y:{{ y2 }}
  </div>

  <a-button @click="removeEventListener"> removeEventListener </a-button>

  <a-button @click="remove"> remove </a-button>
  <a-button @click="toggleDark"> toggleDark  {{ isDark }}</a-button>
  <a-button @click="setTitle('测试数据' + ~~(Math.random() * 10))"> setTitle  {{ title }}</a-button>


  <br>
  <br>
  <br>
  <input type="text" value="11111">

</template>

<script lang="ts" setup>
import { useMouse, useWindowResize, useDark, useTitle } from '@/hooks';
import { crateMap, depEach } from '@/share';
const { x, y, removeEventListener } = useMouse('#bind')
const { x: x1, y: y1 } = useMouse('#bind1')
const { x:x2, y: y2  } = useMouse('#bind2')
const remove = useWindowResize(() => console.log(1111))
const { toggleDark, isDark } = useDark({ mounteElement: 'body'})
const { setTitle, title } = useTitle('')


const list = [
  { 
    id: 1, valaue: 'value',
    children: [
      { id: 6, valaue: 'value', },
      { id: 7, valaue: 'value', },
    ]
  },
  { id: 2, valaue: 'value' },
  { id: 3, valaue: 'value' },
  { id: 4, valaue: 'value' },
]
const map = crateMap(list, 'id')
console.log(map)

depEach(list, (item) => {
  console.log(item)
})


</script>