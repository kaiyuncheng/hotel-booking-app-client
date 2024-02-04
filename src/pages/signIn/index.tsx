import { useForm } from 'react-hook-form';

import { useState } from 'react';
import registerBg from '@/assets/images/pc/register.jpg';
const SignIn = () => {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState('');

  return (
    <div className="w-full flex max-h-screen">
      <div className="w-1/2">
        <div className="aspect-square">
          <img className="w-full h-full object-cover" src={registerBg} alt="hotel" />
        </div>
      </div>
      <div className="w-1/2 text-white">
        <p>享樂酒店，誠摯歡迎</p>
        <p>立即開始旅程</p>

        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input type="email" placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input type="password" placeholder="password" className="input input-bordered" required />
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
          <input {...register('firstName')} placeholder="First name" />
          <select {...register('category', { required: true })}>
            <option value="">Select...</option>
            <option value="A">Option A</option>
            <option value="B">Option B</option>
          </select>
          <textarea {...register('aboutYou')} placeholder="About you" />
          <p>{data}</p>
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default SignIn;
