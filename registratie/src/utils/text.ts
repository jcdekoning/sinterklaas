const singularOrPlural = (number:number, singular:string, plural:string) => {
  if(number === 1) {
    return singular;
  }

  return plural;
}

export { singularOrPlural };