<template>
  <div>
    <b-carousel 
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      fade
      indicators
      controls
      background="#ababab"
      img-width="500"
      img-height="300"
      
      style="text-shadow: 1px 1px 2px #333; "
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
        <b-carousel-slide v-for="(image, index) in images" :key="index"
        :img-src="image.image_url"
        ></b-carousel-slide>
    </b-carousel>

  </div>
</template>

<script>
import { BCarousel } from 'bootstrap-vue'
export default {
    components:{
        BCarousel
    },
    data() {
      return {
        slide: 0,
        sliding: null
      }
    },
    props:{
        images: {
            type: Array,
            required: true
        }
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    }
  }
</script>

<style>
  .carousel{
    width: 65%;
    height:65%;
  }

</style>