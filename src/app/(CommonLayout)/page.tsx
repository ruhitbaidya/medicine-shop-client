import BrandingSection from "@/components/pages/Home/BrandingSection";
import CustomerReviews from "@/components/pages/Home/CustomerReview";
import MedicineDiscountSection from "@/components/pages/Home/DescountMedicine";
import MedicineBlogSection from "@/components/pages/Home/MedicineBlog";
import MedicineDisplaySection from "@/components/pages/Home/MedicineDisplay";
import MedicineNewsletter from "@/components/pages/Home/MedicineNewsLatter";
import SearchField from "@/components/pages/Home/SearchField";
import ShopOverview from "@/components/pages/Home/ShopOverview";

const HomePage = () => {
  return (
    <div>
      <BrandingSection />
      <SearchField />
      <ShopOverview />
      <MedicineDisplaySection />
      <MedicineDiscountSection />
      <MedicineNewsletter />
      <MedicineBlogSection />
      <CustomerReviews />
    </div>
  );
};

export default HomePage;
