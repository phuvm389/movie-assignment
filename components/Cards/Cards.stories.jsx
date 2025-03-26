import Cards from "./Cards";

export default {
  title: "components/Cards",
  component: Cards,
};

const Template = (args) => <Cards {...args} />;
const items = [
  {
    "title": "card item 1",
    "description": "description card item 1",
  },
  {
    "title": "card item 2",
    "description": "description card item 2",
  },
  {
    "title": "card item 3",
    "description": "description card item 3",
  },
  {
    "title": "card item 4",
    "description": "description card item 4",
  },
  {
    "title": "card item 5",
    "description": "description card item 5",
  },
];
const link = {
  url: '/about',
  text: 'Read me'
};

// export const CardSimple = Template.bind({});
// CardSimple.args = {
//   title: "Card title",
//   list: list,
//   link: link,
// };

export const CardTest = {
  args: {
    title: "Card title",
    items: items,
    link: link,
  },
};