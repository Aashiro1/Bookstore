import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function HeroSection() {
  return (
    <div className="w-full max-w-7xl  mx-auto">
      <Carousel>
        <CarouselContent className="">
          <CarouselItem>
            <div className="relative">
              <img
                src="/hero.jpg"
                className="w-full h-[200px] md:h-[300px] lg:h-[400px] xl:h-[700px] object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div>
                  <h2 className="text-white text-3xl font-bold text-center">
                    Welcome to Our BookStore
                  </h2>
                  <h2 className="text-[#DCC7AA] text-2xl font-bold">
                    "A Step toward new Knowledge."
                  </h2>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="relative">
              <img
                src="/hero2.jpg"
                className="w-full h-[200px] md:h-[300px] lg:h-[400px] xl:h-[700px] object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h2 className="text-white text-5xl font-bold">
                  Discover Amazing Features
                </h2>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="relative">
              <img
                src="/hero3.jpg"
                className="w-full h-[200px] md:h-[300px] lg:h-[400px] xl:h-[700px] object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h2 className="text-white text-5xl font-bold">Join Us Today</h2>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
