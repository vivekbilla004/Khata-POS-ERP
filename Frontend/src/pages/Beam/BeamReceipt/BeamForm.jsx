const BeamForm = ({
  receipt,
  parties,
  handleReceiptChange,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

      {/* Party */}

      <div>

        <label className="block mb-2 text-sm font-medium text-slate-700">
          Party <span className="text-red-500">*</span>
        </label>

        <select
          name="party"
          value={receipt.party}
          onChange={handleReceiptChange}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
        >
          <option value="">Select Party</option>

          {parties.map((party) => (
            <option key={party._id} value={party._id}>
              {party.partyName}
            </option>
          ))}
        </select>

      </div>

      {/* Received Date */}

      <div>

        <label className="block mb-2 text-sm font-medium text-slate-700">
          Received Date <span className="text-red-500">*</span>
        </label>

        <input
          type="date"
          name="receivedDate"
          value={receipt.receivedDate}
          onChange={handleReceiptChange}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />

      </div>

      {/* Remarks */}

      <div className="md:col-span-2">

        <label className="block mb-2 text-sm font-medium text-slate-700">
          Remarks
        </label>

        <textarea
          rows={3}
          name="remarks"
          value={receipt.remarks}
          onChange={handleReceiptChange}
          placeholder="Enter Remarks..."
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none resize-none focus:border-blue-500"
        />

      </div>

    </div>
  );
}

export default BeamForm;