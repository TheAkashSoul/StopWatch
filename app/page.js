import StopWatch from '@/components/StopWatch'
import Image from 'next/image'

export default function Home() {
  return (
    <main className='mt-40'>
      <div className='flex items-center justify-center'>
        <StopWatch />
      </div>
    </main>
  )
}
