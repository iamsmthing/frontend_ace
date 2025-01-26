import React from 'react';
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Card, CardContent } from '@/components/ui/card';
import { User } from '@/contexts/auth-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ProfilePage = ({user}:{user:User}) => {
  return (
    <div className="min-h-screen">
      {/* Profile Section */}
      <div className=" shadow-sm">
        {/* Banner */}
        <div 
          className="h-48 w-full relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #FF5757 0%, #B56EFF 50%, #5271FF 100%)'
          }}
        />
        
        {/* Profile Info Container */}
        <div className="max-w-6xl mx-auto px-4 relative">
          {/* Avatar */}
          <div className="absolute -top-16">
            {/* <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white">
              <img 
                src={user?.imageUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div> */}
             <Avatar className="h-32 w-32 ">
          <AvatarImage src={user.imageUrl} />
            <AvatarFallback>{user?.username.charAt(0)}</AvatarFallback>
          </Avatar>
          </div>

          {/* Profile Info */}
          <div className="pt-20 pb-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h1 className="text-xl font-semibold text-zinc-400">{user?.username}</h1>
                <p className="text-[#666666] text-sm">Lead Product Designer at Apple</p>
                <div className="flex items-center gap-2 text-sm text-[#666666] mt-1">
                  <span className="flex items-center gap-1">
                    {/* <img src="/api/placeholder/16/16" alt="KR" className="w-4 h-4 rounded" /> */}
                    Seoul, South Korea
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm mt-1">
                  <span className=" hover:underline cursor-pointer">6,476 followers</span>
                  <span className="">500+ connections</span>
                </div>

                {/* Company Badges */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    <div className="w-5 h-5  rounded flex items-center justify-center">
                      <span className="text-xs text-white">A</span>
                    </div>
                    <span className="text-sm">Apple</span>
                  </div>
                  <div className="flex items-center gap-1 ml-2">
                    <div className="w-5 h-5  rounded flex items-center justify-center">
                      <span className="text-xs text-white">K</span>
                    </div>
                    <span className="text-sm">Kretya Studio</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button className="  font-medium">
                  Follow
                </Button>
                <Button variant="outline" className="border-[#666666] text-[#666666]">
                  <MoreHorizontal className="w-4 h-4" />
                  <span className="ml-1">More</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      {/* <div className="max-w-6xl mx-auto px-4 py-4">
        <h2 className="text-base font-medium text-[#191919] mb-4">Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-4">
              <div className="w-full h-48 bg-gray-100 rounded-md mb-2">
                <img 
                  src={`/api/placeholder/400/300`}
                  alt={`Post ${index}`}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            </div>
          ))}
        </div>
      </div> */}
      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <Card className="col-span-2">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-start gap-4 pb-4 border-b last:border-0">
                    <div className="w-12 h-12 rounded bg-gray-200 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">Completed Frontend Challenge #{item}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Successfully implemented a complex UI component using React and TypeScript
                      </p>
                      <span className="text-xs text-gray-500 mt-2 block">2 days ago</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Statistics</h2>
              <div className="space-y-4">
                <div className=" p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Challenges Completed</div>
                  <div className="text-2xl font-bold mt-1">12</div>
                </div>
                <div className=" p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Quizzes Passed</div>
                  <div className="text-2xl font-bold mt-1">8</div>
                </div>
                <div className=" p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Total Score</div>
                  <div className="text-2xl font-bold mt-1">850</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;