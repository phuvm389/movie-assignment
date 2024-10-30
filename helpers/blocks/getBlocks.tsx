import { IDynamicBlock } from "@/components/DynamicBlock/DynamicBlock.interface";

const valueAlias = {
  prepField: (item: any) => {
    if (item) {
      return item;
    }
  },
};

const imageAlias = {
  prepField: (item: {
    fields: {
      file: { url: any; details: { image: { width: any; height: any } } };
      title: any;
    };
  }) => {
    if (!item.fields) {
      return null;
    }
    let src = item.fields.file.url;
    if (src.indexOf("//") === 0) {
      src = "https:" + src;
    }
    const response = {
      //src: getImageUrl(item?.url),@TODO
      src,
      title: item.fields.title,
      width: item.fields.file.details.image.width,
      height: item.fields.file.details.image.height,
    };
    return response;
  },
};

const fieldsResponse: any = {
  title: valueAlias,
  image: imageAlias,
  link: valueAlias,
  linkText: valueAlias,
  description: valueAlias,
  paragraph: valueAlias,
  items: {},
};

const preprocessContent = (item: any) => {
  const blockObject: any = {
    id: "",
  };
  Object.keys(item).forEach((key) => {
    const neededField = fieldsResponse[key];
    const content = item[key];

    if (neededField) {
      const fieldInContent = neededField.prop || key;

      if (typeof neededField.prepField != "undefined") {
        return (blockObject[fieldInContent] = neededField.prepField(
          content,
          key,
          item
        ));
      } else if (Array.isArray(content)) {
        // If linked component/asset
        const subContent: any = [];
        content.forEach((cont) => {
          let componentName = false;
          if (cont.fields) {
            if (cont.sys.contentType) {
              componentName = cont.sys.contentType.sys.id;
            }
            subContent.push({
              componentName,
              ...preprocessContent(cont.fields),
            });
          }
        });

        blockObject[fieldInContent] = subContent;
      } else {
        return (blockObject[fieldInContent] = content);
      }
    }
    return false;
  });

  return blockObject;
};

function sanitizeContent(string: string): any {
  string = JSON.stringify(string);
  // it is fix for remove LSEP symbol.
  /* eslint-disable-next-line no-irregular-whitespace */
  const re = new RegExp(` `, "g");
  string = string.replace(re, " ");
  return JSON.parse(string);
}

const getBlockItem = (item: any): IDynamicBlock => {
  // eslint-disable-next-line
  const name = item.sys.contentType.sys.id;
  const rawContent = item.fields;
  // eslint-disable-next-line
  const content = sanitizeContent(preprocessContent(rawContent));
  // Add id for key.
  Object.assign(content, { id: item.sys.id });
  return { name, content };
};

const getBlocks = (blocks: Array<any>): Array<any> => {
  let blocksList: any[] = [];

  blocks &&
    blocks.forEach((item) => {
      if (item.sys.contentType) {
        //console.log('COMPONENT TYPE', item.sys.contentType); //Do not delete. Uncomment to see components machine names.
        blocksList.push(getBlockItem(item));
      }
    });
  return blocksList;
};

export { getBlocks };
