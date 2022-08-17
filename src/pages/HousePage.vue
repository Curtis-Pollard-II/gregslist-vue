<template>
  <div class="house-page" v-if="house">
    <div class="my-3" :title="house.price">
      <img class="img-fluid" :src="house.img" alt="">
      <div class="p-2">
        <h4 class="text-center">{{ house.footage }} | {{ house.bedrooms }} | {{ house.bathrooms }}</h4>
        <p>{{ house.description }}</p>
        <p class="text-end text-success m-0">$<b>{{ house.price }}</b></p>
        <button class="btn btn-info" @click="adjustHouse(house)" data-bs-toggle="modal" data-bs-target="#house-form">Adjust
          House Settings</button>
        <button class="btn btn-danger" @click="deleteHouse(house)">delete me</button>
      </div>
    </div>
    <Modal id="house-form">
      <HouseForm />
    </Modal>
  </div>
  <div v-else>
    loading...
  </div>
</template>


<script>
import { computed, onMounted } from '@vue/runtime-core';
import { useRoute } from 'vue-router';
import { housesService } from '../services/HouseService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { AppState } from '../AppState';
export default {
setup() {
    const route = useRoute()
    async function getHouseById() {
        try {
          await housesService.getHouseById(route.params.houseId)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
    }

    onMounted(() => {
        getHouseById()
    })
  return {
    house: computed(() => AppState.activeHouse),
    adjustHouse(house) {
        housesService.setActiveHouse(house)
    },
    async deleteHouse(house) {
        try {
          const yes = await Pop.confirm('Are You Sure you want to Delete the House?')
            if (!yes) {return}
            await housesService.deleteHouse(house.id)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
    }
  };
},
};
</script>
<style> 
</style>