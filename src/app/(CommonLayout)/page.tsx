import BrandingSection from "@/components/pages/Home/BrandingSection";
import CustomerReviews from "@/components/pages/Home/CustomerReview";
import SearchField from "@/components/pages/Home/SearchField";
import ShopOverview from "@/components/pages/Home/ShopOverview";

const HomePage = () => {
  return (
    <div>
      <BrandingSection />
      <SearchField />
      <ShopOverview />
      <CustomerReviews />
    </div>
  );
};

export default HomePage;
