export type StaffProfile = {
  name: string;
  role: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  bio: string[];
};

export const ABOUT_INTRO =
  "The Edmonton Squash Club is a not-for-profit society which was formed to counter recent squash club closures in Edmonton. Our mission is primarily to increase the squash court count in Edmonton and to provide a facility where squash players' interests come first.";

/** Staff shown on /coaches-and-club-pros/ — layout mirrors the live WP photo + bio columns. */
export const STAFF_PROFILES: StaffProfile[] = [
  {
    name: "Jeff Williams",
    role: "Head Pro",
    imageSrc: "/images/staff/jeff-williams.jpg",
    imageAlt: "Jeff Williams, Head Pro at Edmonton Squash Club",
    imageWidth: 1920,
    imageHeight: 2560,
    bio: [
      "Jeff Williams has been immersed in the world of squash since the age of nine, when he first picked up a racquet at the Glencoe Club in Calgary. What began as a casual after-school pastime quickly evolved into a lifelong passion and a dynamic career spanning over two decades. One of his earliest milestones came in 1992, when he captured a gold medal at the Alberta Winter Games as part of Calgary’s team.",
      "After graduating high school, Jeff pursued his love for the sport both on and off the court. He earned his certification as a squash professional and completed a Sports Administration Diploma at Mount Royal College. He currently holds an NCCP Level 3 coaching certification.",
      "In 1998, Jeff relocated to Edmonton to take on the role of Head Squash Professional at the Harley Club. His journey continued in 2001 when he joined the Royal Glenora Club as Associate Squash Professional under Ian Paton. By 2008, Jeff had risen to Head Squash Professional at RGC, a position he held until 2013. In collaboration with the founding board, Jeff played a pivotal role in establishing the Edmonton Squash Club in 2015. Since then, he has been a cornerstone of the club’s coaching team, dedicating the past decade to mentoring players and growing the squash community within ESC.",
      "Jeff’s coaching philosophy centers on inclusivity and growth. He’s dedicated to welcoming new players into the sport and helping athletes of all levels reach their full potential. His commitment to junior development has been a hallmark of his career, nurturing some of Edmonton’s top young talent who’ve gone on to compete nationally and internationally.",
      "With over 30 years of coaching experience, Jeff remains deeply passionate about squash and is excited to continue building a vibrant squash community through his work for the last 10 years at the Edmonton Squash Club.",
      "Jeff makes his home in Edmonton with his wife, Juliana, and their five children—David, Braeden, Aimee, Gabe, and Amelie.",
    ],
  },
];
