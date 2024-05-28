import SubAccountDetails from "@/components/forms/subaccount-details";
import UserDetails from "@/components/forms/user-details";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

type Props = {
  params: { subaccountId: string };
};

const SubAccountSettingsPage = async ({ params }: Props) => {
  const authUser = await currentUser();
  if (!authUser) return;

  const userDetails = await db.user.findUnique({
    where: { email: authUser.emailAddresses[0].emailAddress },
  });

  if (!userDetails) return;

  const subAccount = await db.subAccount.findUnique({
    where: { id: params.subaccountId },
  });

  if (!subAccount) return;

  const agencyDetails = await db.agency.findUnique({
    where: { id: subAccount.agencyId },
    include: { SubAccount: true },
  });

  if (!agencyDetails) return;

  const subAccounts = agencyDetails.SubAccount;

  return (
    <div className="flex lg:!flex-row flex-col gap-4">
      <SubAccountDetails
        agencyDetails={agencyDetails}
        userId={userDetails.id}
        userName={userDetails.name}
        details={subAccount}
      />

      <UserDetails
        id={params.subaccountId}
        subAccounts={subAccounts}
        userData={userDetails}
        type={"subaccount"}
      />
    </div>
  );
};

export default SubAccountSettingsPage;
