<template>
  <div :class="{{type}}">
    <h1>Battle Grid</h1>
  </div>
</template>

<script>
export default {
  name: 'Tile',
  props: {
    difficulty: Number,
    type: String
  }
}
</script>

<style scoped>
    
</style>

