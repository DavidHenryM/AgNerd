import { readFile, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { Cartesian3, Matrix4, Quaternion } from "cesium";

export async function readTractorGeometry(filename) {
  const buffer = await readFile(filename);
  if (buffer.readUInt32LE(0) !== 0x46546c67 || buffer.readUInt32LE(4) !== 2) throw new Error("Expected GLB version 2.");
  const jsonLength = buffer.readUInt32LE(12);
  const document = JSON.parse(buffer.subarray(20, 20 + jsonLength).toString("utf8"));
  const binary = buffer.subarray(28 + jsonLength);
  const minimum = new Cartesian3(Infinity, Infinity, Infinity);
  const maximum = new Cartesian3(-Infinity, -Infinity, -Infinity);
  const meshes = [];
  function visit(index, parent) {
    const node = document.nodes[index];
    const local = node.matrix ? Matrix4.fromArray(node.matrix) : Matrix4.fromTranslationQuaternionRotationScale(
      Cartesian3.fromArray(node.translation ?? [0, 0, 0]),
      new Quaternion(...(node.rotation ?? [0, 0, 0, 1])),
      Cartesian3.fromArray(node.scale ?? [1, 1, 1]),
    );
    const transform = Matrix4.multiply(parent, local, new Matrix4());
    if (node.mesh !== undefined) {
      const min = new Cartesian3(Infinity, Infinity, Infinity);
      const max = new Cartesian3(-Infinity, -Infinity, -Infinity);
      for (const primitive of document.meshes[node.mesh].primitives) {
        const accessor = document.accessors[primitive.attributes.POSITION];
        if (accessor.componentType !== 5126 || accessor.type !== "VEC3" || accessor.sparse) {
          throw new Error("Expected dense float32 tractor positions.");
        }
        const view = document.bufferViews[accessor.bufferView];
        for (let i = 0; i < accessor.count; i++) {
          const offset = (view.byteOffset ?? 0) + (accessor.byteOffset ?? 0) + i * (view.byteStride ?? 12);
          const point = Matrix4.multiplyByPoint(transform, new Cartesian3(
            binary.readFloatLE(offset), binary.readFloatLE(offset + 4), binary.readFloatLE(offset + 8),
          ), new Cartesian3());
          Cartesian3.minimumByComponent(min, point, min);
          Cartesian3.maximumByComponent(max, point, max);
        }
      }
      Cartesian3.minimumByComponent(minimum, min, minimum);
      Cartesian3.maximumByComponent(maximum, max, maximum);
      meshes.push({ name: node.name, minimum: min, maximum: max });
    }
    for (const child of node.children ?? []) visit(child, transform);
  }
  const roots = document.scenes[document.scene ?? 0].nodes;
  for (const root of roots) visit(root, Matrix4.IDENTITY);
  return { document, binary, roots, minimum, maximum, meshes };
}

export async function centreTractor(filename) {
  const geometry = await readTractorGeometry(filename);
  const { document, binary, roots, minimum, maximum } = geometry;
  const offset = [-(minimum.x + maximum.x) / 2, -minimum.y, -(minimum.z + maximum.z) / 2];
  if (offset.every(value => Math.abs(value) < 1e-6)) return geometry;
  const root = document.nodes.length;
  document.nodes.push({ name: "GPS footprint anchor", children: roots, translation: offset });
  document.scenes[document.scene ?? 0].nodes = [root];
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
  await writeFile(filename, Buffer.concat([header, padded, binaryHeader, binary]));
  return readTractorGeometry(filename);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const filename = new URL("../public/models/Tractor.glb", import.meta.url);
  const before = await readTractorGeometry(filename);
  const after = process.argv.includes("--centre") ? await centreTractor(filename) : before;
  console.log(JSON.stringify({ before: { minimum: before.minimum, maximum: before.maximum },
    after: { minimum: after.minimum, maximum: after.maximum }, meshes: after.meshes }, null, 2));
}
