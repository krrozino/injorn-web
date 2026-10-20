import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import crypto from "node:crypto";
import path from "node:path";
import {
  canonicalKingdomMap,
  normalizedToLatLng,
  latLngToNormalized,
  initialAtlasLayers,
  canonicalFeatures,
} from "../src/content/atlas.ts";

const EXPECTED_HASH = "3d08db349d2916e8d44bfb26914218ee0b6722860b6027d9c670edb71d39fc7e";
const EXPECTED_SIZE = 489448;
const ASSET_PATH = path.resolve("public/maps/injorn-atlas-mapa-v1.webp");

test("Atlas M0 asset integrity, dimensions and hash", () => {
  assert.ok(fs.existsSync(ASSET_PATH), "Asset canônico deve existir em public/maps/");

  const stat = fs.statSync(ASSET_PATH);
  assert.strictEqual(stat.size, EXPECTED_SIZE, `Tamanho esperado: ${EXPECTED_SIZE} bytes`);

  const fileBuffer = fs.readFileSync(ASSET_PATH);
  const hash = crypto.createHash("sha256").update(fileBuffer).digest("hex");
  assert.strictEqual(
    hash,
    EXPECTED_HASH,
    "O hash SHA-256 deve coincidir exatamente com o especificado na Issue #4"
  );

  assert.strictEqual(canonicalKingdomMap.width, 1448, "Largura canônica deve ser 1448");
  assert.strictEqual(canonicalKingdomMap.height, 1086, "Altura canônica deve ser 1086");
  assert.strictEqual(canonicalKingdomMap.imageSrc, "/maps/injorn-atlas-mapa-v1.webp");
});

test("Real coordinate conversion functions from src/content/atlas.ts (extremes and corners)", () => {
  // Top-left (origem): x=0, y=0 -> lat=1086, lng=0
  const tlLatLng = normalizedToLatLng({ x: 0, y: 0 });
  assert.deepStrictEqual(tlLatLng, [1086, 0]);
  const tlNorm = latLngToNormalized(tlLatLng[0], tlLatLng[1]);
  assert.deepStrictEqual(tlNorm, { x: 0, y: 0 });

  // Top-right: x=1, y=0 -> lat=1086, lng=1448
  const trLatLng = normalizedToLatLng({ x: 1, y: 0 });
  assert.deepStrictEqual(trLatLng, [1086, 1448]);
  const trNorm = latLngToNormalized(trLatLng[0], trLatLng[1]);
  assert.deepStrictEqual(trNorm, { x: 1, y: 0 });

  // Bottom-left: x=0, y=1 -> lat=0, lng=0
  const blLatLng = normalizedToLatLng({ x: 0, y: 1 });
  assert.deepStrictEqual(blLatLng, [0, 0]);
  const blNorm = latLngToNormalized(blLatLng[0], blLatLng[1]);
  assert.deepStrictEqual(blNorm, { x: 0, y: 1 });

  // Bottom-right: x=1, y=1 -> lat=0, lng=1448
  const brLatLng = normalizedToLatLng({ x: 1, y: 1 });
  assert.deepStrictEqual(brLatLng, [0, 1448]);
  const brNorm = latLngToNormalized(brLatLng[0], brLatLng[1]);
  assert.deepStrictEqual(brNorm, { x: 1, y: 1 });

  // Center: x=0.5, y=0.5 -> lat=543, lng=724
  const centerLatLng = normalizedToLatLng({ x: 0.5, y: 0.5 });
  assert.deepStrictEqual(centerLatLng, [543, 724]);
  const centerNorm = latLngToNormalized(centerLatLng[0], centerLatLng[1]);
  assert.deepStrictEqual(centerNorm, { x: 0.5, y: 0.5 });
});

test("Real coordinate conversion functions (fractional points and roundtrip stability)", () => {
  const points = [
    { x: 0.25, y: 0.75 },
    { x: 0.1234, y: 0.8765 },
    { x: 0.3333, y: 0.6667 },
    { x: 0.8, y: 0.2 },
    { x: 0.9999, y: 0.0001 },
  ];

  for (const pt of points) {
    const [lat, lng] = normalizedToLatLng(pt);
    assert.ok(lat >= 0 && lat <= canonicalKingdomMap.height, `lat deve estar entre 0 e 1086: ${lat}`);
    assert.ok(lng >= 0 && lng <= canonicalKingdomMap.width, `lng deve estar entre 0 e 1448: ${lng}`);

    const roundtrip = latLngToNormalized(lat, lng);
    assert.strictEqual(
      Math.abs(roundtrip.x - pt.x) < 0.001,
      true,
      `x deve ser preservado no roundtrip: ${roundtrip.x} vs ${pt.x}`
    );
    assert.strictEqual(
      Math.abs(roundtrip.y - pt.y) < 0.001,
      true,
      `y deve ser preservado no roundtrip: ${roundtrip.y} vs ${pt.y}`
    );
  }
});

test("Coordinate conversion resilience and clamping to [0, 1]", () => {
  // Valores negativos ou maiores que as dimensões do mapa devem ser limitados com segurança
  const clampedNeg = latLngToNormalized(-100, -50);
  assert.strictEqual(clampedNeg.x, 0);
  assert.strictEqual(clampedNeg.y, 1);

  const clampedExcess = latLngToNormalized(2000, 3000);
  assert.strictEqual(clampedExcess.x, 1);
  assert.strictEqual(clampedExcess.y, 0);
});

test("Player knowledge policy compliance in data contracts", () => {
  // Em M0, não deve existir nenhuma feição cartográfica inventada
  assert.strictEqual(
    canonicalFeatures.length,
    0,
    "Nenhuma feição geográfica fictícia ou não revisada deve estar populada em M0"
  );

  // Apenas a camada base está visível e travada; demais camadas aguardam M1/M3
  const baseLayer = initialAtlasLayers.find((l) => l.id === "base");
  assert.ok(baseLayer && baseLayer.visible && baseLayer.locked);

  const unreadyLayers = initialAtlasLayers.filter((l) => l.id !== "base");
  for (const layer of unreadyLayers) {
    assert.strictEqual(layer.visible, false, `Camada ${layer.id} deve iniciar oculta`);
    assert.ok(layer.badge, `Camada ${layer.id} deve ter badge de fase futura`);
  }
});
