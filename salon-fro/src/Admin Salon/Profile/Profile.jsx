import React from "react";
import { Divider } from "@mui/material";
import ProfileFildCard from "./ProfileFildCard";

const Profile = () => {
  return (
    <div className="lg:px-20 lg:pb-20 space-y-20">
      <div className="w-full lg:w-[70%]">
        <h1 className="text-5xl font-bold pb-5">Glow Salon</h1>

        <div className="grid grid-cols-2 mb-20 gap-3">
          <div className="col-span-2">
            <img
              className="w-full rounded-md h-[15rem] object-cover"
              src="/placeholder-1.jpg"
              alt=""
            />
          </div>
          <div className="col-span-1">
            <img
              className="w-full rounded-md h-[15rem] object-cover"
              src="/placeholder-2.jpg"
              alt=""
            />
          </div>
          <div className="col-span-1">
            <img
              className="w-full rounded-md h-[15rem] object-cover"
              src="/placeholder-3.jpg"
              alt=""
            />
          </div>
        </div>

        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600">Owner Details</h1>
        </div>
        <div className="space-y-5">
          <div>
            <ProfileFildCard keys={"Owner Name"} value="John Doe" />
            <Divider />
            <ProfileFildCard keys={"Owner Email"} value="john@example.com" />
            <Divider />
            <ProfileFildCard keys={"Role"} value={"SALON_OWNER"} />
          </div>
        </div>
      </div>

      <div className="mt-10 lg:w-[70%]">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600">Salon Details</h1>
        </div>

        <div>
          <ProfileFildCard keys={"Salon Name"} value="Glow Salon" />
          <Divider />
          <ProfileFildCard keys={"Salon Address"} value="123 Main Street" />
          <Divider />
          <ProfileFildCard keys={"Open Time"} value="09:00 AM" />
          <Divider />
          <ProfileFildCard keys={"Close Time"} value="08:00 PM" />
        </div>
      </div>
    </div>
  );
};

export default Profile;