import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules'; // Importa os módulos de navegação e paginação
import 'swiper/css';
import 'swiper/css/navigation'; // Estilos para a navegação (setas)
import 'swiper/css/pagination'; // Estilos para a paginação (bolinhas)
import './CustomSwiper.css';

interface CustomSwiperProps {
  images: string[]; // Lista de URLs das imagens
}

export const CustomSwiper = ({ images }: CustomSwiperProps) => {
  return (
    <Swiper
      slidesPerView={1} // Exibe uma imagem por vez
      navigation // Ativa as setas de navegação laterais
      pagination={{ clickable: true }} // Bolinhas clicáveis para a paginação
      loop // Permite o loop contínuo das imagens
      modules={[Navigation, Pagination]} // Ativa os módulos de navegação e paginação
    >
      {images.map((imageUrl, index) => (
        <SwiperSlide key={index}>
          <img src={imageUrl} alt={`Slide ${index}`} className="carousel-image" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
