import Select from "../../../components/ui/Select";

const ReceiptHeader = ({ parties, form, handleChange }) => {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="mb-6">

        <h2 className="text-xl font-semibold">
          Receipt Information
        </h2>

        <p className="text-slate-500 text-sm">
          Enter beam receipt details.
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

        <div>
          <label className="mb-2 block font-medium">
            Party
          </label>

          <Select
            name="party"
            value={form.party}
            onChange={handleChange}
            options={[
              {
                value: "",
                label: "Select Party",
              },

              ...parties.map((party) => ({
                value: party._id,
                label: party.partyName,
              })),
            ]}
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Received Date
          </label>

          <input
            type="date"
            name="receivedDate"
            value={form.receivedDate}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Driver Name
          </label>

          <input
            type="text"
            name="driverName"
            value={form.driverName}
            onChange={handleChange}
            placeholder="Optional"
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Vehicle Number
          </label>

          <input
            type="text"
            name="vehicleNumber"
            value={form.vehicleNumber}
            onChange={handleChange}
            placeholder="Optional"
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Transport
          </label>

          <input
            type="text"
            name="transportName"
            value={form.transportName}
            onChange={handleChange}
            placeholder="Optional"
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Party Challan No
          </label>

          <input
            type="text"
            name="partyChallanNumber"
            value={form.partyChallanNumber}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Received By
          </label>

          <input
            type="text"
            name="receivedBy"
            value={form.receivedBy}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Remarks
          </label>

          <input
            type="text"
            name="remarks"
            value={form.remarks}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>

      </div>

    </div>
  );
}

export default ReceiptHeader;