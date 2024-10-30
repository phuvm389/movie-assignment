import { getBlocks } from "@/helpers/blocks/getBlocks";

const contentful = require("contentful");

const deliveryApi = process.env.CONTENTFUL_DELIVERY_API_KEY;
const spaceEnv = process.env.CONTENTFUL_SPACE_ID;
const envEnv = process.env.CONTENTFUL_ENV;

const deliveryOption = {
  space: spaceEnv,
  environment: envEnv,
  accessToken: deliveryApi,
};

export const contentfulApi = {
  getUserSubmittedById: async (id: string) => {
    try {
      // const data = await contentful
      //   .createClient(deliveryOption)
      //   .getEntry(id)
      //   .then((entry: any) => {
      //     return entry.fields;
      //   });
      // .catch(console.error); // help to debug

      const data = await contentful
        .createClient(deliveryOption)
        .getEntries({
          include: 3,
          content_type: "userSubmitted",
          "sys.id": id,
        })
        .then((response: any) => {
          let components: any = [];
          let data = {
            ...response.items[0].fields,
            id: response.items[0].sys.id,
          };
          if (data?.components) {
            components = getBlocks(data.components);
          }
          data.components = components;

          return data;
        });
      // .catch(console.error); // help to debug

      return data;
    } catch (error) {
      return false;
    }
  },
  getListUserSubmitted: async (page: number) => {
    try {
      const limit = 20;
      const data = await contentful
        .createClient(deliveryOption)
        .getEntries({
          skip: page * limit,
          limit: limit,
          order: "sys.createdAt",
          content_type: "userSubmitted",
        })
        .then((response: any) => {
          let data = response.items.map((item: any) => {
            return { ...item.fields, id: item.sys.id };
          });
          return data;
        });
      // .catch(console.error); // help to debug

      return data;
    } catch (error) {
      return false;
    }
  },
};
