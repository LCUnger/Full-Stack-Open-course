export interface Country {
  commonName: string;
  officialName: string;
//   nativeNames: string[];
  alternativeSpellings: string[];
//   translations: string[];
}

export type SearchIndex = { [key: string]: string };

const buildSearchIndex = (data: Country[]) => {
    const index: SearchIndex = {}
    data.forEach((country) => {
      const allNames = [
        country.commonName,
        country.officialName,
        ...country.alternativeSpellings,
        // And maybe more
      ]
      allNames.forEach((name) => {
        const normalizedName = name.toLowerCase()
        index[normalizedName] = country.officialName
      })
    })

    return index
  }

export default buildSearchIndex