const contentfulManagement = require("contentful-management");

const managementApi = process.env.CONTENTFUL_MANAGEMENT_API_KEY;
const spaceEnv = process.env.CONTENTFUL_SPACE_ID;
const envEnv = process.env.CONTENTFUL_ENV;

const client = contentfulManagement.createClient({
  accessToken: managementApi,
});

export const contentfulManagementApi = {
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
      // const id = (Math.random() + 1).toString(36).substring(7);
      const data = await client
        .getSpace(spaceEnv)
        .then((space: any) => space.getEnvironment(envEnv))
        .then((environment: any) =>
          environment.createEntryWithId("userSubmitted", id, {
            fields: {
              originalTitle: {
                "en-US": originalTitle,
              },
              posterPath: {
                "en-US": posterPath,
              },
              overview: {
                "en-US": overview,
              },
              releaseDate: {
                "en-US": releaseDate,
              },
              popularity: {
                "en-US": parseFloat(popularity),
              },
              imdbId: {
                "en-US": imdbId,
              },
            },
          })
        )
        .then((entry: any) => {
          entry.publish();
          return {
            originalTitle,
            posterPath,
            overview,
            // genres,
            releaseDate,
            popularity,
            imdbId,
            id,
          };
        })
        .catch(console.error);

      return data;
    } catch (error) {
      return false;
    }
  },
};
