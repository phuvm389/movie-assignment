import React from "react";

import Cards from "./Cards";

export default {
  title: "components/Cards",
  component: Cards,
};

const Template = (args) => <Cards {...args} />;
const list = [
  {
    "headline": "card item 1",
    "paragraph": "paragraph card item 1",
  },
  {
    "headline": "card item 2",
    "paragraph": "paragraph card item 2",
  },
  {
    "headline": "card item 3",
    "paragraph": "paragraph card item 3",
  },
  {
    "headline": "card item 4",
    "paragraph": "paragraph card item 4",
  },
  {
    "headline": "card item 5",
    "paragraph": "paragraph card item 5",
  },
];
const link = {
  url: '/about',
  text: 'Read me'
};

export const CardSimple = Template.bind({});
CardSimple.args = {
  headline: "Card headline",
  list: list,
  link: link,
};
