import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { CarouselInterface } from "@/app/dashboard/siteweb/carousel/core/models"
interface PropsType {
  data: CarouselInterface[]
}

export function CarouselFront({data}: PropsType) {
  return (
    <>
    <Carousel className="w-full">
      <CarouselContent>
        {data?.map((item: CarouselInterface, index: number) => (
          <CarouselItem key={index}>
            <div className="p-1 w-full">
              <Card className="w-full border-none shadow-none">
                <CardContent className="flex w-full items-center justify-center p-6">
                  <img className="img_carousel" src={item?.path} alt={item.title} />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    </>
  )
}
