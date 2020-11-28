<template>
   <div class="text-center pt-15">
        <v-progress-circular
      :size="50"
      :width="3"
      :color="color"
      indeterminate
    ></v-progress-circular>
   </div>
</template>

<script>
export default {
    computed: {
        color() {
            const colors = ['red', 'primary', 'green', 'purple', 'amber']
            return colors[Math.floor(Math.random() * 5)]

        }
    }
    
}
</script>