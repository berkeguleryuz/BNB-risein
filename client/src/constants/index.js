import {
  createCampaign,
  dashboard,
  profile1,
} from "../assets";

export const navlinks = [
  {
    name: "Dashboard",
    imgUrl: dashboard,
    link: "/",
  },
  {
    name: "Campaign",
    imgUrl: createCampaign,
    link: "/create-campaign",
  },
  {
    name: "Profile",
    imgUrl: profile1,
    link: "/profile",
  },
];
