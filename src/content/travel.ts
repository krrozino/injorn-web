export interface TravelRecord {
  destination: string;
  direction: string;
  horseback: string;
  onFoot: string;
  distance: string;
}

export const knownTravelDistances: TravelRecord[] = [
  {
    destination: "Borda da Área Militar",
    direction: "Todas as direções",
    horseback: "2 dias",
    onFoot: "4 dias",
    distance: "≈ 100 km",
  },
  {
    destination: "Monastério de São Kael",
    direction: "Leste",
    horseback: "3 dias",
    onFoot: "6 dias",
    distance: "≈ 150 km",
  },
  {
    destination: "Vale do Oeste",
    direction: "Oeste",
    horseback: "2,5 dias",
    onFoot: "5 dias",
    distance: "≈ 125 km",
  },
  {
    destination: "Densa Floresta",
    direction: "Noroeste",
    horseback: "3 dias",
    onFoot: "6 dias",
    distance: "≈ 150 km",
  },
  {
    destination: "Grandes Montanhas do Sul",
    direction: "Sul",
    horseback: "3,5 dias",
    onFoot: "7 dias",
    distance: "≈ 175 km",
  },
  {
    destination: "Vael Karun / Covil dos Dragões",
    direction: "Sudeste",
    horseback: "4 dias",
    onFoot: "8 dias",
    distance: "≈ 200 km",
  },
];
