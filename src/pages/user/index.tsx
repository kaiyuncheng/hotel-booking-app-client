import Container from '@/components/Container';
import Footer from '@/components/Footer';

const User = () => {
  return (
    <>
      <Container>
        <div className="flex text-black space-x-5 mb-10">
          <div className="w-1/2 bg-white rounded-xl p-10">
            <h3>修改密碼</h3>
            <div>
              <h4>電子信箱</h4>
              <p>Jessica@exsample.com</p>
            </div>
            <div>
              <h4>密碼</h4>
              <p>Jdfsfdsf</p>
            </div>
          </div>
          <div className="w-1/2 bg-white"></div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default User;
