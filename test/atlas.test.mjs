import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import crypto from "node:crypto";
import path from "node:path";
import { atlasPanOptions, atlasFitOptions } from "../src/components/atlas/atlasMotion.ts";
import { publicPlaceRecordId } from "../src/content/placeRecord.ts";
import { isolateOutsideAtlasDialog } from "../src/components/atlas/atlasModalIsolation.ts";
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

test("M1 map anchors are bounded, unique and restricted to published knowledge", () => {
  const expected = new Set(["Capital Injorn", "Monastério de São Kael", "Vael Karun"]);
  assert.deepStrictEqual(new Set(canonicalFeatures.map((feature) => feature.label)), expected);
  assert.strictEqual(canonicalFeatures.length, 3, "Somente três âncoras revisáveis compõem M1");
  const ids = new Set();
  for (const feature of canonicalFeatures) {
    assert.equal(feature.mapId, canonicalKingdomMap.id);
    assert.equal(feature.published, true, "Dados do cliente devem ser explicitamente publicados");
    assert.equal(feature.type, "marker");
    assert.equal(feature.category, "place");
    assert.ok(!Array.isArray(feature.geometry), "Marcadores devem ter posição pontual");
    assert.ok(feature.geometry.x >= 0 && feature.geometry.x <= 1);
    assert.ok(feature.geometry.y >= 0 && feature.geometry.y <= 1);
    assert.ok(!ids.has(feature.id), "ID de âncora deve ser único");
    ids.add(feature.id);
  }
  assert.ok(!canonicalFeatures.some((feature) => feature.label === "Ponta da Luz"),
    "Ponta da Luz não tem posição aprovada e não pode ganhar marcador suposto");
});

test("M1 layers expose only approved map features; routes remain empty", () => {
  const base = initialAtlasLayers.find((layer) => layer.id === "base");
  const places = initialAtlasLayers.find((layer) => layer.id === "places");
  assert.equal(base?.visible, true);
  assert.equal(base?.locked, true);
  assert.equal(places?.visible, true);
  assert.equal(places?.count, 3);
  for (const layer of initialAtlasLayers.filter((entry) => entry.id !== "base" && entry.id !== "places")) {
    assert.equal(layer.visible, false);
    assert.equal(layer.count, 0);
  }
});

test("M1 Leaflet panTo honors prefers-reduced-motion instead of forcing movement", () => {
  assert.deepStrictEqual(atlasPanOptions(true), { animate: false });
  assert.deepStrictEqual(atlasPanOptions(false), { animate: true, duration: 0.35 });
  assert.deepStrictEqual(atlasFitOptions(true), { padding: [12, 12], animate: false });
  assert.deepStrictEqual(atlasFitOptions(false), { padding: [12, 12], animate: true });
});

test("M1 public place links use stable normalized anchors", () => {
  assert.equal(publicPlaceRecordId("Capital Injorn"), "lugar-capital-injorn");
  assert.equal(publicPlaceRecordId("Monastério de São Kael"), "lugar-monasterio-de-sao-kael");
  assert.equal(publicPlaceRecordId("Vael Karun"), "lugar-vael-karun");
});

test("M1 focus isolates global siblings and restores previous inert values", () => {
  class FakeElement {
    constructor() {
      this.children = [];
      this.parentElement = null;
      this.inert = false;
    }
    append(...children) {
      for (const child of children) {
        child.parentElement = this;
        this.children.push(child);
      }
      return this;
    }
  }

  const previousHTMLElement = globalThis.HTMLElement;
  globalThis.HTMLElement = FakeElement;
  try {
    const body = new FakeElement();
    const sevenGates = new FakeElement();
    const sevenSeals = new FakeElement();
    const page = new FakeElement();
    const header = new FakeElement();
    const mapSection = new FakeElement();
    const footer = new FakeElement();
    const frame = new FakeElement();
    const atlasButton = new FakeElement();
    const catalog = new FakeElement();
    const originalInert = new FakeElement();
    originalInert.inert = true;
    body.append(sevenGates, sevenSeals, page, originalInert);
    page.append(header, mapSection, footer);
    mapSection.append(frame);
    frame.append(atlasButton, catalog);

    const restore = isolateOutsideAtlasDialog(frame, body);
    assert.equal(sevenGates.inert, true, "Astrolábio deve ficar inerte");
    assert.equal(sevenSeals.inert, true, "Sete Selos devem ficar inertes");
    assert.equal(header.inert, true, "Cabeçalho externo deve ficar inerte");
    assert.equal(footer.inert, true, "Conteúdo externo deve ficar inerte");
    assert.equal(atlasButton.inert, false, "Controles do Atlas permanecem operantes");
    assert.equal(catalog.inert, false, "Catálogo continua acessível");

    restore();
    assert.equal(sevenGates.inert, false, "Astrolábio deve voltar ao estado normal");
    assert.equal(sevenSeals.inert, false);
    assert.equal(header.inert, false);
    assert.equal(footer.inert, false);
    assert.equal(originalInert.inert, true, "Preservar estado inert que já existia");
  } finally {
    if (previousHTMLElement === undefined) delete globalThis.HTMLElement;
    else globalThis.HTMLElement = previousHTMLElement;
  }
});

test("M1 CSS contracts keep Leaflet below toolbar and global overlays hidden in focus", () => {
  const css = fs.readFileSync(path.resolve("src/app/atlas/atlas-places.css"), "utf8");
  const readRule = (selector) => {
    const start = css.lastIndexOf(selector + " {");
    assert.ok(start >= 0, "Regra CSS não encontrada: " + selector);
    const end = css.indexOf("}", start);
    assert.ok(end > start, "Regra CSS incompleta: " + selector);
    return css.slice(start, end);
  };
  const readZ = (rule) => Number(rule.split("z-index:")[1]?.trim().split(";")[0]);
  const map = readRule(".atlas-viewer-frame .atlas-map-container");
  const toolbar = readRule(".atlas-viewer-frame .atlas-toolbar");
  const drawer = readRule(".atlas-viewer-frame .atlas-drawer");
  assert.ok(map.includes("isolation: isolate"), "Pane precisa ter contexto isolado");
  assert.ok(readZ(map) < readZ(toolbar), "Toolbar deve ficar acima da pane Leaflet");
  assert.ok(readZ(toolbar) < readZ(drawer), "Drawer deve ficar acima da toolbar");
  assert.ok(css.includes('body[data-injorn-atlas-focus="true"]'));
  assert.ok(css.includes(".seven-gates-trigger"));
  assert.ok(css.includes(".seven-seals-trigger"));
});
