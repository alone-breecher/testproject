import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { CountBox, CustomButton, Loader } from '../components';
import { calculateBarPercentage, daysLeft } from '../utils';
import { thirdweb } from '../assets';

const JobDetails = () => {
  const { state } = useLocation();
  const { apply, getProposals, contract, address } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [freelancers, setFreelancers] = useState([]);
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [workToken, setWorkToken] = useState('');
  const remainingDays = daysLeft(state.deadline);

  const fetchFreelancers = async () => {
    const data = await getProposals(state.id);
    setFreelancers(data);
  };

  useEffect(() => {
    if (contract && state.id) fetchFreelancers();
  }, [contract, address, state.id]);

  const handleApply = async () => {
    setIsLoading(true);
  
    if (state.pId && amount && email && coverLetter && workToken) {
      await apply(state.pId, amount, email, coverLetter, workToken);
      navigate('/');
    } else {
      console.log('One or more arguments are missing');
    }
  
    setIsLoading(false);
  }
  return (
    <div>
      {isLoading && <Loader/>}
      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div className="absolute h-full bg-[#4acd8d]" style={{ width: `${calculateBarPercentage(state.target)}%`, maxWidth: '100%'}}>
            </div>
            </div>
            </div>
            <div className='flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]'>
            <CountBox title='Days Left' value={remainingDays} />
            <CountBox title='freelancers applied' value={freelancers.length} />

            </div>
        </div>

        <div className='mt-[60px] flex lg:flex-row flex-col gap-5'>
          <div className='flex-[2] flex flex-col gap-[40px]'>
            <div>
            <h4 className='font-epilogue font-semibold text-[18px] text-white uppercase'>Client</h4>
            <div className='mt-[20px] flex flex-row items-center flex-wrap  gap-[14px]'>
              <div className='w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer'>
                <img src={thirdweb} alt='user' className='w-[60%] object-contain' />

              </div>
<div>
  <h4 className='font-epilogue font-semibold text-[14px] text-white break-all'>{state.owner}</h4>
  <p className='mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]'> 10 Jobs</p>
</div>
            </div>
            </div>

            <div>
            <h4 className='font-epilogue font-semibold text-[18px] text-white uppercase'>Description</h4>
          <div className='mt-[20px]'>
            <p className='font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify'> {state.description}</p>


          </div>
            </div>

            <div>
            <h4 className='font-epilogue font-semibold text-[18px] text-white uppercase'>Freelancers</h4>
          <div className='mt-[20px] flex flex-col gap-4'>
             {freelancers.length > 0 ? freelancers.map((item,index) => (
              <div>
                FREELANCERS
              </div>
             )) : (
              <p className='font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify'>No freelancer applied. Be the first one</p>
             )} 
             </div>
            </div>
          </div>

          <div className='flex-1'>
          <h4 className='font-epilogue font-semibold text-[18px] text-white uppercase'>Apply</h4>

          <div className='my-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]'>
            <p className='font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]'>
              apply for this job
               </p>
               <div className='mt-[30px]'>
                <input
                type="number"
                placeholder='Token 0.1'
                step='0.01'
                className='w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]'
                value={amount}
                onChange={event => setAmount(event.target.value)}
                />

               </div>
               <div className='mt-[30px]'>
                <input
                type="text"
                value={email}
                placeholder='Enter your email'
                className='w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]'
                onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='mt-[30px]'>
                <input
                type="text"
                value={workToken}
                placeholder='Enter your Rate in tokens  '
                className='w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]'
                onChange={(e) => setWorkToken(e.target.value)}
                />
              </div>
              <div className='mt-[30px]'>
      <textarea 
      id="cover-letter" 
      value={coverLetter}                 
      className='w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]'
      onChange={(e) => setCoverLetter(e.target.value)}
       />
        <CustomButton 
        btnType='button'
        title='apply'
        styles='w-full bg-[#8c6dfd]'
        handleClick={handleApply}
        />
        </div>
        
        </div>
      

          </div>


        </div>
        </div>
  )
}

export default JobDetails