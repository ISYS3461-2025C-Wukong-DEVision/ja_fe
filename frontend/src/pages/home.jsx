import { useTranslation } from 'react-i18next';


function Home() {
  const { t } = useTranslation();


  return (
    <div className="relative min-h-[85vh] w-screen overflow-hidden">
      {/* Background image */}
      <div
        className="
          absolute inset-0
          bg-[url('/assets/images/Home.png')]
          bg-cover bg-center bg-no-repeat
          opacity-70
        "
      />

      {/* Black overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Main content */}
      <div className='flex-col items-center relative z-10'> 
        <div className='flex items-center justify-center w-full h-[72vh] px-4 pt-8 pb-12 lg:px-12 lg:pt-16 lg:pb-24'>
          <div className='flex flex-col items-start space-y-6'>
            <p><strong className='text-white lg:text-9xl md:text-8xl sm:text-7xl text-6xl'>{t('Welcome, there!')}</strong></p>
            <p className='text-white lg:text-3xl sm:text-2xl text-xl italic'>{t('Discover opportunities, ...')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;