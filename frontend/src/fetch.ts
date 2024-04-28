import { safeFetch } from "./safefetch";
import { HotelSchema } from "./model";
import {z} from "zod"


export const getHotelbyPrice = async (min: number | null, max: number | null) => {
    return await safeFetch({
      path: `/api/hotels?min=${min}&max=${max}`  ,
      method: 'GET',
      data: {}
    }, HotelSchema.array());
  }

export const getHotelbyName = async ( hotelSearch: string | null) => {
    return await safeFetch({
      path: `/api/hotels?includes=${hotelSearch}` ,
      method: 'GET',
      data: {}
    }, HotelSchema.array());
  }