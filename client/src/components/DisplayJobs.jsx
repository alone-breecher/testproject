import React from 'react';
import { useNavigate } from 'react-router-dom';

import FundCard from './FundCard';

import { loader } from '../assets';

const DisplayJobs = ({ title, isLoading, jobs }) => {
  const navigate = useNavigate();

  const handleNavigate = (job) => {
    navigate(`/job-details/${job.title}`, { state: job })
  }

  return (
    <div>
      <h1 className='font-epilogue font-semibold text-[18px] text-white text-left'>{title} ({jobs && jobs.length})</h1>
      <div className='flex flex-wrap mt-[20px] gap-[26px]'>
        {isLoading && (
          <img src={loader} alt="loader" className='w-[100px] h-[100px] object-contain'/>
        )}

        {!isLoading && !jobs && (
          <p className='font epilogue font-semibold text-[14px] leading-[30px] text-[#818183]'>
            Loading...
          </p>
        )}

        {!isLoading && jobs && jobs.length === 0 && (
          <p className='font epilogue font-semibold text-[14px] leading-[30px] text-[#818183]'>
            you have not posted any jobs yet.
          </p>
        )}

        {!isLoading && jobs && jobs.length > 0 && jobs.map((job) => <FundCard
        key={job.pId}
        {...job}
        handleClick={() => handleNavigate(job)}
        />)}

      </div>
    </div>
  )
}

export default DisplayJobs;