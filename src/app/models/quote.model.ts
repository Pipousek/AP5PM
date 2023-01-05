// Main Model
export interface MainQuote {
  sentence: string;
  character: CharacterData;
}

// Character Model inside Main Model
export interface CharacterData {
  name: string;
  slug: string;
  house: HouseData;
}

// House Model inside Character Model
export interface HouseData {
  name?: string;
  slug?: string;
}