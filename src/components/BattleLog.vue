<template>
  <div class="hello">
    <h1>Battle Log V1</h1>

    <ul id="example-1">
        <li v-for="item in game.log"
            v-bind:key="item">
            {{ item }}
        </li>
    </ul>

  </div>
</template>

<script>

import { createNamespacedHelpers } from 'vuex';
const { mapState } = createNamespacedHelpers('board');

export default {
    name: 'BattleLog',
    computed: {
      ...mapState({
				game: state => state
      })
    }
}
</script>
