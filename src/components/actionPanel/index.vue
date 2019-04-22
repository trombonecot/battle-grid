<template>
    <div>
      <h2>{{tile.unit.name}}</h2>

      <table>
        <tr>
            <td>Health</td>
            <td>{{tile.unit.currentHealth}}/{{tile.unit.health}}</td>
        </tr>
      </table>


      <button id="move" v-on:click="carryAction">Move</button>
      <button id="defend">Defend</button>
    </div>
</template>

<script>


export default {
    name: 'ActionPanel',
    props: {
        tile: Object
    },
    methods: {
        carryAction() {
          this.$emit("carryAction", "move");
      },
    }

}
</script>
