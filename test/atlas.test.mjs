import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import crypto from "node:crypto";
import path from "node:path";

const MAP_WIDTH = 1448;
const MAP_HEIGHT = 1086;
const EXPECTED_HASH = "3d08db349d2916e8d44bfb26914218ee0b6722860b6027d9c670edb71d39fc7e";
const EXPECTED_SIZE = 489448;
const ASSET_PATH = path.resolve("public/maps/injorn-atlas-mapa-v1.webp");

test("Atlas M0 asset integrity and dimensions", () => {
  assert.ok(fs.existsSync(ASSET_PATH), "Asset canônico deve existir em public/maps/");

  const stat = fs.statSync(ASSET_PATH);
  assert.strictEqual(stat.size, EXPECTED_SIZE, `Tamanho esperado: ${EXPECTED_SIZE} bytes`);

  const fileBuffer = fs.readFileSync(ASSET_PATH);
  const hash = crypto.createHash("sha256").update(fileBuffer).digest("hex");
  assert.strictEqual(hash, EXPECTED_HASH, "O hash SHA-256 deve coincidir exatamente com o especificado na Issue #4");
});

test("Normalized coordinates mathematical conversion", () => {
  function normalizedToLatLng(coord, width = MAP_WIDTH, height = MAP_HEIGHT) {
    const lng = coord.x * width;
    const lat = (1 - coord.y) * height;
    return [lat, lng];
  }

  function latLngToNormalized(lat, lng, width = MAP_WIDTH, height = MAP_HEIGHT) {
    const x = Math.max(0, Math.min(1, lng / width));
    const y = Math.max(0, Math.min(1, 1 - lat / height));
    return {
      x: Number(x.toFixed(4)),
      y: Number(y.toFixed(4)),
    };
  }

  // Top-left
  const tl = normalizedToLatLng({ x: 0, y: 0 });
  assert.deepStrictEqual(tl, [1086, 0]);
  const normTl = latLngToNormalized(tl[0], tl[1]);
  assert.deepStrictEqual(normTl, { x: 0, y: 0 });

  // Bottom-right
  const br = normalizedToLatLng({ x: 1, y: 1 });
  assert.deepStrictEqual(br, [0, 1448]);
  const normBr = latLngToNormalized(br[0], br[1]);
  assert.deepStrictEqual(normBr, { x: 1, y: 1 });

  // Center
  const center = normalizedToLatLng({ x: 0.5, y: 0.5 });
  assert.deepStrictEqual(center, [543, 724]);
  const normCenter = latLngToNormalized(center[0], center[1]);
  assert.deepStrictEqual(normCenter, { x: 0.5, y: 0.5 });
});
