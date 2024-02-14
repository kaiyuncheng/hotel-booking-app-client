import Loading from './Loading';

const LoadingFullPage = () => {
  return (
    <div className="bg-dark w-full h-screen flex items-center justify-center">
      <Loading />
      <p className="text-primary-100 font-bold ml-3 animate-pulse">Loading...</p>
    </div>
  );
};

export default LoadingFullPage;
