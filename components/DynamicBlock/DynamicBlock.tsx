"use client";

import dynamic from "next/dynamic";
import React from "react";
import { IDynamicBlock } from "./DynamicBlock.interface";

const Hero = dynamic(() => import("@/components/Hero/Hero"));
const Cards = dynamic(() => import("@/components/Cards/Cards"));

const Components: any = {
  hero: Hero,
  cards: Cards,
};

const RenderDynamicBlock = (name: string, content: any): JSX.Element | null => {
  if (typeof Components[name] !== "undefined") {
    return React.createElement(Components[name], {
      key: content.id,
      ...content,
    });
  }
  return null;
};

const DynamicBlock = ({
  components,
}: { components: Array<IDynamicBlock> } | any): JSX.Element => {
  // console.log("components", components);
  // return <div>components</div>;
  const relatedBlocks = components.map((block: IDynamicBlock) => {
    return RenderDynamicBlock(block.name, block.content);
  });
  return <div>{relatedBlocks}</div>;
};

export default DynamicBlock;
