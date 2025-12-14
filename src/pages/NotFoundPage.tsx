import notFoundImg from '@/assets/notFound.png';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex flex-col gap-8 items-center justify-center">
      <img src={notFoundImg} alt="unauthorized" className="max-w-[40%]" />

      <Button onClick={() => navigate(-1)}>Quay lại</Button>
    </div>
  );
};

export default NotFoundPage;
