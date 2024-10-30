const baseUrl = process.env.BASE_URL ? process.env.BASE_URL : "";

export const userSubmittedApi = {
  getUserSubmittedById: async (usid: string) => {
    try {
      const res = await fetch(`${baseUrl}/api/user-submitted/${usid}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      return false;
    }
  },
  getListUserSubmittedTag: async () => {
    try {
      const res = await fetch(`${baseUrl}/api/user-submitted`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
        next: { tags: ["user-submitted-list"] },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      return [];
    }
  },
  getListUserSubmitted: async () => {
    try {
      const res = await fetch(`${baseUrl}/api/user-submitted`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      return [];
    }
  },
  createUserSubmitted: async ({
    originalTitle,
    posterPath,
    overview,
    // genres,
    releaseDate,
    popularity,
    imdbId,
    id,
  }: any) => {
    try {
      const res = await fetch(`${baseUrl}/api/user-submitted`, {
        method: "POST",
        body: JSON.stringify({
          originalTitle,
          posterPath,
          overview,
          // genres,
          releaseDate,
          popularity,
          imdbId,
          id,
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      return false;
    }
  },
};
