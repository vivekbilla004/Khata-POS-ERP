const DailyChallan = require("../models/dailyChallan.model");
const LoomAllocation = require("../models/loomAllocation.model");
const Beam = require("../models/beam.model");
const Loom = require("../models/loom.model");

const createDailyChallan = async ({ challanDate, entries }) => {
  let totalTaka = 0;

  const designMap = {};

  const challanEntries = [];

  for (const item of entries) {
    const allocation = await LoomAllocation.findById(item.allocation)
      .populate("beam")
      .populate("loom");

    if (!allocation) throw new Error("Allocation not found");

    if (allocation.status !== "Running")
      throw new Error(`Loom ${allocation.loom.loomNumber} is not running`);

    if (item.takaProduced > allocation.remainingCuts)
      throw new Error(
        `Produced taka exceeds remaining cuts for Beam ${allocation.beam.beamNumber}`,
      );

    // -----------------------------
    // Update Allocation
    // -----------------------------

    allocation.remainingCuts -= item.takaProduced;

    if (allocation.remainingCuts === 0) {
      allocation.status = "Completed";
    }

    await allocation.save();

    // -----------------------------
    // Update Beam
    // -----------------------------

    const beam = await Beam.findById(allocation.beam._id);

    beam.remainingCuts = allocation.remainingCuts;

    if (allocation.remainingCuts === 0) {
      beam.status = "Completed";
      beam.currentLoom = null;
      beam.allocationDate = null;
    }

    await beam.save();

    // -----------------------------
    // Update Loom
    // -----------------------------

    if (allocation.remainingCuts === 0) {
      const loom = await Loom.findById(allocation.loom._id);

      loom.status = "Idle";

      await loom.save();
    }

    // -----------------------------
    // Challan Entry
    // -----------------------------

    challanEntries.push({
      allocation: allocation._id,
      loom: allocation.loom._id,
      beam: beam._id,
      designNo: beam.designNo || "N/A",
      takaProduced: item.takaProduced,
    });

    totalTaka += item.takaProduced;

    if (!designMap[beam.designNo]) {
      designMap[beam.designNo] = 0;
    }

    designMap[beam.designNo] += item.takaProduced;
  }

  // -----------------------------
  // Design Summary
  // -----------------------------

  const designSummary = Object.keys(designMap).map((designNo) => ({
    designNo,
    totalTaka: designMap[designNo],
  }));

  // -----------------------------
  // Save Challan
  // -----------------------------

  const challan = await DailyChallan.create({
    challanDate,
    entries: challanEntries,
    totalTaka,
    designSummary,
  });

  return challan;
};

const getAllChallans = async () => {
  return await DailyChallan.find().sort({ challanDate: -1 });
};

const getChallanById = async (id) => {
  return await DailyChallan.findById(id);
};

module.exports = {
  createDailyChallan,
  getAllChallans,
  getChallanById,
};
