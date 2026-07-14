const Beam = require("../models/beam.model");
const Loom = require("../models/loom.model");
const LoomAllocation = require("../models/loomAllocation.model");

console.log("===========================");
console.log(LoomAllocation);
console.log("Model Name:", LoomAllocation.modelName);
console.log("Create:", LoomAllocation.create);
console.log("===========================");

const allocateBeam = async ({ beamId, loomId }) => {
  const beam = await Beam.findById(beamId);

  if (!beam) throw new Error("Beam not found");

  const loom = await Loom.findById(loomId);

  if (!loom) throw new Error("Loom not found");

  if (beam.status === "Allocated") throw new Error("Beam already allocated");

  if (loom.status !== "Idle") throw new Error("Loom is already occupied");

//   Allocation Entry

    const allocation = await LoomAllocation.create({
      loom: loom._id,
      beam: beam._id,
      party: beam.party,
      remainingCuts: beam.remainingCuts,
    });

//   const allocation = new LoomAllocation({
//     loom: loom._id,
//     beam: beam._id,
//     party: beam.party,
//     remainingCuts: beam.remainingCuts,
//   });

//   await allocation.save();

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

module.exports = {
  allocateBeam,
};
