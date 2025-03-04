import Modal from "@/components/admin/addmedicine/MedicineModal";
import MedicineTable from "@/components/admin/showtable/DisplayTable";
const MedicinePage = () => {
  return (
    <div>
      <div>
        <div className="flex justify-between items-center">
          <h2>Medicine</h2>
          <div className=" bg-gray-100 flex items-center justify-center">
            <Modal />
          </div>
        </div>
      </div>
      <div>
        <div>
          <MedicineTable />
        </div>
      </div>
    </div>
  );
};

export default MedicinePage;
