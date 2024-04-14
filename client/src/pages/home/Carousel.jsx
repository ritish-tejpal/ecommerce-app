import React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


const HomeCarousel = () => {
  return (
    <Carousel>
      <CarouselPrevious>Previous</CarouselPrevious>
      <CarouselNext>Next</CarouselNext>
      <CarouselContent>
        <CarouselItem>
          <img src="https://via.placeholder.com/800x400" alt="placeholder" />
        </CarouselItem>
        <CarouselItem>
          <img src="https://via.placeholder.com/800x400" alt="placeholder" />
        </CarouselItem>
        <CarouselItem>
          <img src="https://via.placeholder.com/800x400" alt="placeholder" />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  )
}

export default HomeCarousel
