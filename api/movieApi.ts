import { notFound } from "next/navigation";
import {
  IMovieList,
  IMovieGetList,
  IMovieDetail,
  IUserLogin,
} from "./movieApi.interface";
import camelcaseKeys from "camelcase-keys";
import getCookie from "@/helpers/utils/getCookie";
import { MovieCookieNames } from "./movieCookieNames";

const MOVIE_ENDPOINT = process.env.NEXT_PUBLIC_MOVIE_ENDPOINT;
const MOVIE_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MOVIE_ACCESS_TOKEN;
const authOptions = {
  accept: "application/json",
  Authorization: `Bearer ${MOVIE_ACCESS_TOKEN}`,
};

const movieApi = {
  getList: async ({ query, page }: IMovieGetList): Promise<IMovieList> => {
    const res = await fetch(`${MOVIE_ENDPOINT}/movie/${query}?page=${page}`, {
      method: "GET",
      headers: authOptions,
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return camelcaseKeys(await res.json(), { deep: true });
  },

  getDetail: async (mid: string): Promise<IMovieDetail> => {
    const res = await fetch(`${MOVIE_ENDPOINT}/movie/${mid}`, {
      method: "GET",
      headers: authOptions,
    });

    if (!res.ok) {
      if (res.status === 404) {
        return notFound();
      }
      throw new Error("Failed to fetch data");
    }

    return camelcaseKeys(await res.json(), { deep: true });
  },

  login: async ({ username, password }: IUserLogin): Promise<any> => {
    const res = await fetch(`${MOVIE_ENDPOINT}/authentication/token/new`, {
      method: "GET",
      headers: authOptions,
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    if (data?.success) {
      const valiRes = await fetch(
        `${MOVIE_ENDPOINT}/authentication/token/validate_with_login`,
        {
          method: "POST",
          headers: {
            ...authOptions,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
            request_token: data.request_token,
          }),
        }
      );
      const valiData = camelcaseKeys(await valiRes.json(), { deep: true });
      if (valiData?.success) {
        const sectionRes = await fetch(
          `${MOVIE_ENDPOINT}/authentication/session/new`,
          {
            method: "POST",
            headers: {
              ...authOptions,
              "content-type": "application/json",
            },
            body: JSON.stringify({
              request_token: data.request_token,
            }),
          }
        );
        const sectionData = camelcaseKeys(await sectionRes.json(), {
          deep: true,
        });
        if (sectionData?.success) {
          document.cookie = `${MovieCookieNames.MOVIE_AUTH}=${sectionData.sessionId}; path=/;`;
          window.location.href = "/";
        }
        return sectionData;
      }

      return valiData;
    }
  },

  getLoginData: () => {
    return getCookie(MovieCookieNames.MOVIE_AUTH);
  },

  logout: async (sessionId: string) => {
    const res = await fetch(`${MOVIE_ENDPOINT}/authentication/session`, {
      method: "DELETE",
      headers: {
        ...authOptions,
        "content-type": "application/json",
      },
      body: JSON.stringify({ session_id: sessionId }),
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = camelcaseKeys(await res.json(), { deep: true });
    if (data?.success) {
      document.cookie = `${MovieCookieNames.MOVIE_AUTH}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      window.location.href = "/login";
    }
    return data;
  },
};

export default movieApi;
