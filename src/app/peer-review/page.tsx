'use client';
import PeerReviewsList from '@/components/peerReview/peer-reviews-list';
import SearchAndFilter from '@/components/peerReview/search-and-filter';
import NotificationCenter from '@/components/peerReview/notification-center';
import { Metadata } from 'next'
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function PeerReviewsPage() {
  const router=useRouter();

  const handleMyChallenges=()=>{
       router.push('/peer-review/mychallenges')
  }
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto py-4">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">

            <h1 className="text-3xl font-bold">Peer Reviews</h1>
            <p className='text-md'>Review the challenges of other users to gain up to 2 points per review. </p>
            </div>
            <div className="flex items-center space-x-4">
              <NotificationCenter />
               <Button variant={'outline'} onClick={handleMyChallenges}>My Challenges</Button>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto py-8 px-4">
        <SearchAndFilter />
        <PeerReviewsList />
      </main>
    </div>
  )
}

