const Beam = require("../models/beam.model");
const Loom = require("../models/loom.model");
const LoomAllocation = require("../models/loomAllocation.model");

console.log("===========================");
console.log(LoomAllocation);
console.log("Model Name:", LoomAllocation.modelName);
console.log("Create:", LoomAllocation.create);
console.log("===========================");

const allocateBeam = async ({ beamId, loomId }) => {
  const beam = await Beam.findById(beamId).populate("party", "partyName");

  if (!beam) throw new Error("Beam not found");

  const loom = await Loom.findById(loomId);

  if (!loom) throw new Error("Loom not found");

  if (beam.status === "Allocated") throw new Error("Beam already allocated");

  if (loom.status !== "Idle") throw new Error("Loom is already occupied");

  //   Allocation Entry

  const allocation = await LoomAllocation.create({
    loom: loom._id,
    loomNumber: loom.loomNumber,

    beam: beam._id,
    beamNumber: beam.beamNumber,

    party: beam.party,
    partyName: beam.party.partyName,

    designNo: beam.designNo || "N/A",

    totalCuts: beam.totalCuts,
    remainingCuts: beam.remainingCuts,

    allocationDate: new Date(),
    status: "Running",
  });
  // Update Beam

  beam.status = "Allocated";
  beam.currentLoom = loom._id;
  beam.allocationDate = new Date();

  await beam.save();

  // Update Loom

  loom.status = "Running";

  await loom.save();

  return allocation;
};

const getRunningAllocations = async () => {
  return LoomAllocation.find({
    status: "Running",
  }).sort({ loomNumber: 1 });
};

module.exports = {
  allocateBeam,
  getRunningAllocations,
};
