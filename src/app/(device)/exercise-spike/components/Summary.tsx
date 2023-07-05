import Image from 'next/image';
import HRGraph from '@/app/components/HRGraph';
import RRGraph from '@/app/components/RRGraph';

type SummaryProps = {
  hrData: { hr: number }[]
}

export default function Summary({hrData}: SummaryProps) {
  return (
    <div>

      <div className="mx-auto w-5/6 text-center">
        <div className="card bg-base-100 shadow-xl text-center">
          <div className="card-bod text-center mt-4 mb-4">
            <h2 className="card-title text-slate-500 justify-center">HR Summary</h2>
            <div className='flex'>
              <div className="w-2/3">
                <figure>  
                    <Image 
                      className="opacity-20" 
                      src="/images/image-icon.svg" 
                      alt="Chill Phil" 
                      width="384" 
                      height="216"/>
                </figure>
              </div>
              <div className="w-1/2">
                <HRGraph data={hrData}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}