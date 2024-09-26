import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules'; // Importa os módulos de navegação e paginação
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './CustomSwiper.css'; // Mantém o CSS para o Swiper no contexto de detalhes
import './CardSwiper.css';   // Novo CSS específico para o Swiper nos cards

interface CustomSwiperProps {
  images: string[];
  isCard?: boolean;  // Adicionamos uma prop opcional para indicar que é um card
}

export const CustomSwiper = ({ images, isCard }: CustomSwiperProps) => {
  const randomNumber = Math.floor(Math.random() * 3);
  return (
    
    <Swiper
      className={isCard ? "card-swiper" : ""}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      loop
      modules={[Navigation, Pagination]}
      initialSlide={randomNumber} // colocar gerador de numero aleatório
    >
      {images.map((imageUrl, index) => (
        <SwiperSlide key={index} className={isCard ? "card-swiper-slide" : ""}>
          <img src={imageUrl} alt={`Slide ${index}`} className="carousel-image" />
        </SwiperSlide>
      ))}
      
    </Swiper>
  );
};
