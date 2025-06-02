import React from "react";
import DashboardSummaryCards from "../components/dashboard-comp/DashboardSummaryCards";
import RecentOrdersTable from "../components/dashboard-comp/RecentOrdersTable";
import RecentTransactions from "../components/dashboard-comp/RecentTransactions";

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <DashboardSummaryCards />
      <RecentOrdersTable />
      <RecentTransactions />
    </div>
  );
};

export default Dashboard;
