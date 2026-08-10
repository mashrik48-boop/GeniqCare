const GOALS = ['general', 'cardio', 'digestion', 'cognition', 'joint', 'weight'];
const DIETS = ['vegetarian', 'vegan', 'dairyfree', 'glutenfree', 'lactosefree', 'keto'];
const TOPICS = ['nutrition', 'fitness', 'science', 'health', 'lifestyle', 'product'];

const NUTRIENTS = {
  b12: { key: 'b12', name_en: 'Vitamin B12', name_fr: 'Vitamine B12', min: 140, max: 700 },
  vitd: { key: 'vitd', name_en: 'Vitamin D', name_fr: 'Vitamine D', min: 50, max: 125 },
  iron: { key: 'iron', name_en: 'Iron', name_fr: 'Fer', min: 60, max: 170 },
};

const PRACTITIONERS = [
  { id: 'p1', name: 'Dr. Amélie Tremblay', type_en: 'Naturopath', type_fr: 'Naturopathe' },
  { id: 'p2', name: 'Marc-Olivier Bélanger', type_en: 'Nutritionist', type_fr: 'Nutritionniste' },
  { id: 'p3', name: 'Sophie Gagnon', type_en: 'VitastiQ Specialist', type_fr: 'Spécialiste VitastiQ' },
  { id: 'p4', name: 'Dr. Julien Roy', type_en: 'DNA Test Specialist', type_fr: 'Spécialiste test ADN' },
];

const ARTICLES = [
  {
    id: 'a1', tags: ['nutrition', 'health'], min: 4,
    title_en: 'Why Vitamin D matters more in Québec winters',
    title_fr: 'Pourquoi la vitamine D compte davantage pendant les hivers québécois',
    body_en: 'Reduced sunlight exposure from October to April means many Québec residents run low on Vitamin D. Regular testing and consistent supplementation can help maintain healthy levels year-round.',
    body_fr: 'La réduction de l\'exposition au soleil d\'octobre à avril fait en sorte que plusieurs résident(e)s du Québec manquent de vitamine D. Des tests réguliers et une supplémentation constante aident à maintenir des niveaux sains toute l\'année.',
  },
  {
    id: 'a2', tags: ['fitness', 'product'], min: 3,
    title_en: 'Creatine 101: what it actually does',
    title_fr: 'Créatine 101 : ce qu\'elle fait vraiment',
    body_en: 'Creatine monohydrate is one of the most studied supplements for strength and power output. A daily 5g dose is the most common evidence-backed protocol.',
    body_fr: 'La créatine monohydrate est l\'un des suppléments les plus étudiés pour la force et la puissance. Une dose quotidienne de 5g est le protocole le plus reconnu.',
  },
  {
    id: 'a3', tags: ['science', 'health'], min: 5,
    title_en: 'Reading your own lab results, without the jargon',
    title_fr: 'Comprendre vos résultats de laboratoire, sans jargon',
    body_en: 'Reference ranges vary by lab and by person. Here is how to read a nutrient panel and know when a result is worth a conversation with a practitioner.',
    body_fr: 'Les plages de référence varient selon le laboratoire et la personne. Voici comment lire un bilan nutritionnel et savoir quand un résultat mérite une discussion avec un professionnel.',
  },
];
