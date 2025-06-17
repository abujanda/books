import { Seo } from "@/components/seo";
import { Layout as MarketingLayout } from "@/layouts/marketing";
import { HomeCta } from "@/sections/home/home-cta";
import { HomeFaqs } from "@/sections/home/home-faqs";
import { HomeFeatures } from "@/sections/home/home-features";
import { HomeHero } from "@/sections/home/home-hero";
import { HomeReviews } from "@/sections/home/home-reviews";
import type { Page as PageType } from "@/types/page";

const Page: PageType = () => {
  return (
    <>
      <Seo />
      <main>
        <HomeHero />
        <HomeFeatures />
        <HomeReviews />
        <HomeCta />
        <HomeFaqs />
      </main>
    </>
  );
};

Page.getLayout = (page) => <MarketingLayout>{page}</MarketingLayout>;

export default Page;
