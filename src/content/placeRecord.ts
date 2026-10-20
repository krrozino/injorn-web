/** Âncora estável para os registros públicos de lugares em /mundo. */
export function publicPlaceRecordId(name: string): string {
  return "lugar-" + name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
