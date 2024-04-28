<script setup lang="ts">
import { getHotelbyName, getHotelbyPrice } from "./fetch"
import { Hotel } from "./model"
import { ref, computed } from "vue"

const hotels = ref<Hotel[]>([])
const loading = ref(false)
const min = ref<number | null>(null)
const max = ref<number | null>(null)
const hotelSearch = ref<string | null>(null)

const handleHotels = async () => {
    try {
        loading.value = true;

        // Fetch hotels by price range
        if (min.value !== null && max.value !== null) {
            const response = await getHotelbyPrice(min.value, max.value);
            if (response.success) {
                const data = response.data;
                hotels.value = data;
            } else {
                console.error('Failed to fetch hotels:', response.status);
            }
        }

        // Fetch hotels by name
        if (hotelSearch.value !== null && hotelSearch.value !== '') {
            const response = await getHotelbyName(hotelSearch.value);
            if (response.success) {
                const data = response.data;
                hotels.value = data;
            } else {
                console.error('Failed to fetch hotels:', response.status);
            }
        }
    } catch (error) {
        console.error('Error fetching hotels:', error);
    } finally {
        loading.value = false;
    }
};

const cancel = () => {
    min.value = null
    max.value = null
    hotelSearch.value =''
    hotels.value = []
}


const showCancelButton = computed(() => hotels.value.length > 0);

</script>

<template>
    <main class="flex justify-center items-center py-16">
        <section class="card card-body max-w-[400px] bg-secondary">
            <input v-model="min" className="input w-full max-w-xs" type="number" placeholder="min Price">
            <input v-model="max" className="input w-full max-w-xs" type="number" placeholder="max Price">
            <input v-model="hotelSearch" className="input w-full max-w-xs" type="text" placeholder="Hotel name">
            <button class="btn btn-primary  w-full max-w-xs" @click="handleHotels()">Search</button>
            <div v-if="showCancelButton">
                <button class="btn btn-neutral w-full max-w-xs" @click="cancel()">Cancel</button>
            </div>
            <div class="justify-center items-center" v-if="loading === true">
                <div class="loading loading-spinner text-neutral"></div>
            </div>
            <div class="justify-center">
                <div v-for="hotel in hotels">
                    <div className="card w-80 bg-base-100 shadow-xl mb-5 mt-5">
                        <div className="card-body">
                            <h2 className="card-title">
                                {{ hotel.name }} 
                                <div className="badge badge-secondary">popular</div>
                            </h2>
                            <p> price: ${{ hotel.pricePerNightInUSD }}/night</p>
                            <div className="card-actions justify-end">
                                <div className="badge badge-outline">vacation</div>
                                <div className="badge badge-outline">hotels</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

</template>