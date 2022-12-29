export interface MainQuote {
  sentence: string;
  character: CharacterData;
}

export interface CharacterData {
  name: string;
  slug: string;
  house: HouseData;
}

export interface HouseData {
  name: string;
  slug: string;
}