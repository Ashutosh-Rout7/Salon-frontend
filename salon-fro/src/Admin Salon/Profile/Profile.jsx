import React from "react";
import { Divider, CircularProgress } from "@mui/material";
import ProfileFildCard from "./ProfileFildCard";
import { useauth } from "../../Context/AuthContext";
import { useSalon } from "../../Context/SalonContext";

const Profile = () => {
  const { user, loading: authLoading } = useauth();
  const { mySalon, mySalonLoading } = useSalon();

  const loading = authLoading || mySalonLoading;

  if (loading) {
    return (
      <div className="w-full flex justify-center py-20">
        <CircularProgress />
      </div>
    );
  }

  // fall back to placeholders if a salon image isn't set yet,
  // so the layout doesn't break with missing <img> sources
  const images = mySalon?.images?.length > 0
    ? mySalon.images
    : ["/placeholder-1.jpg", "/placeholder-2.jpg", "/placeholder-3.jpg"];

  return (
    <div className="lg:px-20 lg:pb-20 space-y-20">
      <div className="w-full lg:w-[70%]">
        <h1 className="text-5xl font-bold pb-5">
          {mySalon?.name || "No Salon Yet"}
        </h1>

        <div className="grid grid-cols-2 mb-20 gap-3">
          <div className="col-span-2">
            <img
              className="w-full rounded-md h-[15rem] object-cover"
              src={images[0]}
              alt={mySalon?.name || "Salon"}
            />
          </div>

          {images[1] && (
            <div className="col-span-1">
              <img
                className="w-full rounded-md h-[15rem] object-cover"
                src={images[1]}
                alt={mySalon?.name || "Salon"}
              />
            </div>
          )}

          {images[2] && (
            <div className="col-span-1">
              <img
                className="w-full rounded-md h-[15rem] object-cover"
                src={images[2]}
                alt={mySalon?.name || "Salon"}
              />
            </div>
          )}
        </div>

        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600">Owner Details</h1>
        </div>

        <div className="space-y-5">
          <div>
            <ProfileFildCard
              keys={"Owner Name"}
              value={user?.fullName || user?.username || "—"}
            />
            <Divider />
            <ProfileFildCard
              keys={"Owner Email"}
              value={user?.email || "—"}
            />
            <Divider />
            <ProfileFildCard
              keys={"Role"}
              value={user?.role || "—"}
            />
          </div>
        </div>
      </div>

      <div className="mt-10 lg:w-[70%]">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600">Salon Details</h1>
        </div>

        {mySalon ? (
          <div>
            <ProfileFildCard keys={"Salon Name"} value={mySalon.name || "—"} />
            <Divider />
            <ProfileFildCard keys={"City"} value={mySalon.city || "—"} />
            <Divider />
            <ProfileFildCard keys={"Salon Address"} value={mySalon.address || "—"} />
            <Divider />
            <ProfileFildCard keys={"Email"} value={mySalon.email || "—"} />
            <Divider />
            <ProfileFildCard keys={"Phone Number"} value={mySalon.phoneNumber || "—"} />
            <Divider />
            <ProfileFildCard keys={"Open Time"} value={mySalon.openTime || "—"} />
            <Divider />
            <ProfileFildCard keys={"Close Time"} value={mySalon.closeTime || "—"} />
          </div>
        ) : (
          <div className="p-5 bg-slate-50 rounded-md text-gray-500">
            You haven't created a salon yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
