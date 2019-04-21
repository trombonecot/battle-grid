<script>
import AbstractTile from './AbstractTile';

export default {
  name: 'MountainTile',
  extends: AbstractTile,
  data() {
    return {
        difficulty: 1,
        type: 'mountain'
      }
  }
}
</script>

