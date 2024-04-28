import {z} from "zod"

export const HotelSchema = z.object({
    id: z.number(),
    name: z.string(),
    pricePerNightInUSD: z.number()
})

export type Hotel = z.infer<typeof HotelSchema>