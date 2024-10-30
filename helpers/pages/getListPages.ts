export const listPages = {
  popular: {
    title: "Popular",
    route: "/popular",
    description: "Highlight popular movies",
    query: "popular",
    listTitle: "Popular Movie Block",
  },
  upcoming: {
    title: "Upcoming",
    route: "/popular",
    description: "Showcase movies scheduled for release in the near future",
    query: "upcoming",
    listTitle: "Upcoming Movie Block",
  },
  index: {
    title: "Movie Friends",
    route: "/",
    description: "Movie Friends Home page",
    query: "now_playing",
    listTitle: "Engaging List",
  },
};

const getListPages = (pid: string) => {
  if (listPages[pid as keyof typeof listPages] !== undefined) {
    return listPages[pid as keyof typeof listPages];
  }
  return null;
};

export default getListPages;
