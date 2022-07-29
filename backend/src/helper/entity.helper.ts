export class EntityHelper {
  static getAliasFromObject = <T>(data: T, key: keyof T): string => {
    const value: string = String(data[key]);
    return this.getAliasFromString(value);
  };

  static getAliasFromString = (value: string): string => {
    const alias = value
      .trim()
      .split(" ")
      .map((value) => value.trim())
      .join(" ")
      .toLocaleLowerCase()
      .replace(/[-'",]/g, "")
      .replace(/á/g, "a")
      .replace(/é/g, "e")
      .replace(/í/g, "i")
      .replace(/ó/g, "o")
      .replace(/ú/g, "u")
      .replace(/\s/g, "-");
    return alias;
  };
}
