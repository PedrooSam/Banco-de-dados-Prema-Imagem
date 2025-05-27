import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { StatCard } from '../carrosselItem';
import Link from 'next/link';

export function Carrossel() {
  return (
    <div className="w-screen px-4 sm:px-8 ml-8">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1440: { slidesPerView: 4 },
        }}
        navigation
        autoplay={{ delay: 5000 }}
        loop={true}
      >
        <SwiperSlide>
          <Link href="/dashboard/agenda-exames">
            <StatCard title="Agendamentos Hoje" value="24" percentage="+8%" color="green" />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="/dashboard/exames">
            <StatCard title="Exames Realizados" value="18" percentage="+12%" color="yellow" />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="/dashboard/pacientes">
            <StatCard title="Novos Pacientes" value="7" percentage="+3%" color="green" />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="/dashboard/financeiro">
            <StatCard title="Faturamento Diário" value="R$ 4.250" percentage="+5%" color="yellow" />
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
