"use client";
import Container from "@/components/Container";
import AddNewVehicle from "@/modules/vehicle/AddNewVehicle";

const page = () => {
  return (
    <Container>
      <div className="flex w-full justify-center items-center">
        <div className="w-full mt-10">
          <AddNewVehicle />
        </div>
      </div>
    </Container>
  );
};

export default page;
