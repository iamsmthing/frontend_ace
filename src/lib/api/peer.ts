export async function getPeer(id: string,token:string): Promise<any> {
  const response = await fetch(`/api/v1/api/review/getPendingReview/${id}`,{
    method: "GET",
    headers: { "Content-Type": "application/json" ,"Authorization": `Bearer ${token}`},
  });
  if (!response.ok) {
    throw new Error("Failed to fetch problem");
  }
  console.log(response);
  return response.json();
}

export const submitChallengeForReview = async (
  token: string,
  data: { userId: string; challengeId: string; imageUrl: string; code: string }
) => {
  const { userId, challengeId, imageUrl, code } = data;
  const response = await fetch("/api/v1/api/review/submitChallenge", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, challengeId, code, imageUrl }),
  });

  return response.json();
};

export const getPendingReviews = async (token: string) => {
  const response = await fetch("/api/v1/api/review/getPendingReviews", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("failed to fetch reviews");
  }
  console.log(response)
  return response.json();
};
export const getChallengeReviewsOfUser = async (token: string) => {
  const response = await fetch("/api/v1/api/review/getChallengeReviewsOfUser", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("failed to fetch challanges");
  }
  console.log(response)
  return response.json();
};

export const submitPeerReview = async (token: string,data:{reviewerId:string,userProgressId:string,challengeId:string,comment:string,isApproved:boolean|null}) => {
    const {reviewerId,userProgressId,challengeId,comment,isApproved} = data;
    const response = await fetch("/api/v1/api/review/submitPeerReview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ reviewerId, challengeId, comment, userProgressId,isApproved }),
    });
  
    if (!response.ok) {
      throw new Error("failed to submit peer review");
    }
    return response.json();
  };
  