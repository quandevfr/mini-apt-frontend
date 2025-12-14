import unauthorizedImg from '@/assets/auth/unauthorized.png';

const UnauthorizedPage = () => {
  return (
    <div className="w-full h-screen">
      <img src={unauthorizedImg} alt="unauthorized" className="max-w-[80%]" />
    </div>
  );
};

export default UnauthorizedPage;
