// Fetch data in parallel to minimize waterfalls and reduce loading time.
//https://beta.nextjs.org/docs/data-fetching/fundamentals

import React from "react";
import getUser from "@/app/lib/getUser";
import getUserPosts from "@/app/lib/getUserPosts";
import { Suspense } from "react";
import UserPosts from "./components/UserPosts";
import type { Metadata } from "next";

type Params = {
  params: {
    userId: string;
  };
};

export async function generateMetadata({ params: { userId } }: Params): Promise<Metadata> {
  // even if we use the same promise twice, Next js will take care to deduplicate the requests
  const userData: Promise<User> = getUser(userId)
  const user: User = await userData

  return {
      title: user.name,
      description: `This is the page of ${user.name}`
  }

}

async function Userpage({ params: { userId } }: Params) {
  const userData: Promise<User> = getUser(userId);
  const userPostsData: Promise<Post[]> = getUserPosts(userId);

  // If not progressively rendering with Suspense, use Promise.all
  // const [user, userPosts] = await Promise.all([userData, userPostsData]);

  const user = await userData;

  return (
    <>
      <h2>{user.name}</h2>
      <br />
      <Suspense fallback={<h2>Loading...</h2>}>
        {/* @ts-expect-error Server Component */}
        <UserPosts promise={userPostsData} />
      </Suspense>
    </>
  );
}

export default Userpage;
