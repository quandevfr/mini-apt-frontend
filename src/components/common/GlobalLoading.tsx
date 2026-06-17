// Libs
import Lottie from 'lottie-react';

// Others
import LoadingAnimation from '@/assets/loading.json';
import { cn } from '@/libs/utils';
import { useGlobalLoading } from '@/hooks/useGlobalLoading';

const GlobalLoading = () => {
  const { isLoading } = useGlobalLoading();

  if (!isLoading) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-99999 flex items-center justify-center bg-background/20 backdrop-blur-xs'
      )}
    >
      <div className="w-24 h-24 rounded-[8px] flex items-center justify-center">
        <Lottie animationData={LoadingAnimation} loop={true} autoplay={true} />
      </div>
    </div>
  );
};

export default GlobalLoading;
