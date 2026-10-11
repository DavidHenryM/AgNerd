import { writeFile } from "node:fs/promises";

// Reusable flat-normal cube: three meshes share one vertex/index buffer.
const positions = [];
const normals = [];
const indices = [];
for (const [normal, corners] of [
  [[1, 0, 0], [[1, -1, -1], [1, 1, -1], [1, 1, 1], [1, -1, 1]]],
  [[-1, 0, 0], [[-1, -1, 1], [-1, 1, 1], [-1, 1, -1], [-1, -1, -1]]],
  [[0, 1, 0], [[-1, 1, -1], [-1, 1, 1], [1, 1, 1], [1, 1, -1]]],
  [[0, -1, 0], [[-1, -1, 1], [-1, -1, -1], [1, -1, -1], [1, -1, 1]]],
  [[0, 0, 1], [[-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]]],
  [[0, 0, -1], [[1, -1, -1], [-1, -1, -1], [-1, 1, -1], [1, 1, -1]]],
]) {
  const start = positions.length / 3;
  positions.push(...corners.flat().map(value => value / 2));
  normals.push(...corners.flatMap(() => normal));
  indices.push(start, start + 1, start + 2, start, start + 2, start + 3);
}
const binary = Buffer.concat([
  Buffer.from(new Float32Array(positions).buffer),
  Buffer.from(new Float32Array(normals).buffer),
  Buffer.from(new Uint16Array(indices).buffer),
]);
const nodes = [];
const roots = [];
function box(name, translation, scale, mesh = 0) {
  const index = nodes.length;
  nodes.push({ name, mesh, translation, scale });
  return index;
}
for (const [name, y] of [["Lower rail", 0.14], ["Upper rail", 0.47]]) {
  const root = nodes.length;
  nodes.push({ name, children: [root + 1] });
  box(`${name} mesh`, [0, y, 0], [0.12, 0.06, 6]);
  roots.push(root);
}
for (let i = 0; i < 12; i++) {
  const root = nodes.length;
  nodes.push({ name: `Station ${i}`, translation: [0, 0, -2.75 + i * 0.5], children: [root + 1, root + 2, root + 3] });
  box(`Upright ${i}`, [0, 0.305, 0], [0.07, 0.27, 0.045]);
  box(`Nozzle mount ${i}`, [0, 0.09, 0], [0.07, 0.04, 0.07], 1);
  box(`Yellow nozzle ${i}`, [0, 0.035, 0], [0.09, 0.07, 0.06], 2);
  roots.push(root);
}
const document = {
  asset: { version: "2.0", generator: "AgNerd procedural boom" },
  scene: 0, scenes: [{ nodes: roots }], nodes,
  buffers: [{ byteLength: binary.length }],
  bufferViews: [
    { buffer: 0, byteOffset: 0, byteLength: 288, target: 34962 },
    { buffer: 0, byteOffset: 288, byteLength: 288, target: 34962 },
    { buffer: 0, byteOffset: 576, byteLength: 72, target: 34963 },
  ],
  accessors: [
    { bufferView: 0, componentType: 5126, count: 24, type: "VEC3", min: [-0.5, -0.5, -0.5], max: [0.5, 0.5, 0.5] },
    { bufferView: 1, componentType: 5126, count: 24, type: "VEC3" },
    { bufferView: 2, componentType: 5123, count: 36, type: "SCALAR" },
  ],
  materials: [
    { name: "Galvanised frame", pbrMetallicRoughness: { baseColorFactor: [0.45, 0.5, 0.53, 1], metallicFactor: 0.65, roughnessFactor: 0.65 } },
    { name: "Dark nozzle mounts", pbrMetallicRoughness: { baseColorFactor: [0.06, 0.07, 0.08, 1], metallicFactor: 0, roughnessFactor: 0.8 } },
    { name: "Yellow nozzle tips", emissiveFactor: [0.25, 0.19, 0], pbrMetallicRoughness: { baseColorFactor: [1, 0.78, 0.015, 1], metallicFactor: 0, roughnessFactor: 0.65 } },
  ],
  meshes: [0, 1, 2].map(material => ({
    primitives: [{ attributes: { POSITION: 0, NORMAL: 1 }, indices: 2, material }],
  })),
};
const json = Buffer.from(JSON.stringify(document));
const padded = Buffer.alloc(Math.ceil(json.length / 4) * 4, 0x20);
json.copy(padded);
const header = Buffer.alloc(20);
header.writeUInt32LE(0x46546c67, 0);
header.writeUInt32LE(2, 4);
header.writeUInt32LE(28 + padded.length + binary.length, 8);
header.writeUInt32LE(padded.length, 12);
header.writeUInt32LE(0x4e4f534a, 16);
const binaryHeader = Buffer.alloc(8);
binaryHeader.writeUInt32LE(binary.length, 0);
binaryHeader.writeUInt32LE(0x004e4942, 4);
await writeFile(new URL("../public/models/Boom.glb", import.meta.url), Buffer.concat([header, padded, binaryHeader, binary]));
console.log("Generated Boom.glb: 6 m span, 0.5 m height, 12 yellow nozzles.");
