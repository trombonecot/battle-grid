<template>
        <rect x=15 
              y=45 
              height="5" 
              :width="getWidth" 
              :style="getStyles"
                />
</template>

<script>

export default {
    name: 'Health',
    props: {
        unit: Object
    },
    computed: {
        getWidth() {
            const ratio = this.unit.currentHealth/this.unit.health;
            return 30*ratio;
        },
        getStyles() {
            const color = this.getHealthColor(this.unit);
            return 'fill:' + color;
        }
    },
    methods: {
      getHealthColor(unit) {
          const ratio = unit.currentHealth/unit.health;
          if ( ratio < 0.3 ) {
              return "red";
          } else if ( ratio < 0.5 ) {
              return "orange";
          } else if ( ratio < 0.7 ) {
              return "yellow";
          } else {
              return "lightGreen"
          }
      }
    }
}
</script>
