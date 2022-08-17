<template>
  <div class="houses-page">
    <div class="container">
      <div class="row">
        <div class="col-md-4" v-for="h in houses" :key="h.id">
          <HouseCard :house="h"/>
        </div>
      </div>
    </div>
    <button class="btn btn-fab btn-primary" title="Add House" data-bs-toggle="modal" data-bs-target="#house-form"
      @click="setActiveHouse()"><i class="mdi mdi-plus f-18 text-white"></i></button>
  </div>
  <Modal id="house-form">
    <HouseForm />
  </Modal>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core';
import { housesService } from '../services/HouseService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { AppState } from '../AppState';
export default {
  setup() {
    async function getHouses() {
        try {
          await housesService.getHouses()
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
    }
    onMounted(() => {
        getHouses()
    })

    return {
        houses: computed(() => AppState.houses),
        setActiveHouse(){
            housesService.setActiveHouse({})
        }
    };
  },
};
</script>


<style>
</style>