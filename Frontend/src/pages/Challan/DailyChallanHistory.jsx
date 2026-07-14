import { useEffect, useState } from "react";
import { Eye, CalendarDays } from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";

import { getChallans } from "../../services/challan.service";

export default function DailyChallanHistory() {

  const [challans, setChallans] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {

    const data = await getChallans();
  console.log("Fetched challans:", data);
    setChallans(data);

  };

  return (

    <div className="space-y-6">

      <PageHeader
        title="Daily Challans"
        subtitle="Production History"
      />

      <Card>

        <div className="space-y-4">

          {challans.map((challan) => (

            <div
              key={challan._id}
              className="rounded-xl border p-5 hover:bg-slate-50"
            >

              <div className="flex justify-between items-center">

                <div>

                  <div className="flex items-center gap-2">

                    <CalendarDays size={18} />

                    <h2 className="font-semibold">

                      {new Date(
                        challan.challanDate
                      ).toLocaleDateString()}

                    </h2>

                  </div>

                  <p className="mt-2 text-slate-500">

                    Total Production :
                    {" "}
                    <strong>
                      {challan.totalTaka} Taka
                    </strong>

                  </p>

                </div>

                <button className="rounded-lg bg-blue-600 text-white px-4 py-2">

                  <Eye size={18} />

                </button>

              </div>

              <div className="mt-5 flex flex-wrap gap-3">

                {challan.designSummary.map((design) => (

                  <div
                    key={design.designNo}
                    className="rounded-full bg-indigo-100 px-4 py-2"
                  >

                    {design.designNo}
                    {" • "}
                    {design.totalTaka} Taka

                  </div>

                ))}

              </div>

            </div>

          ))}

        </div>

      </Card>

    </div>

  );
}