
export const filterContentsBySection = <T extends object>(
  contents: T,
  sectionPrefix: string
) => Object.keys({ ...contents }).filter((key) => key.startsWith(sectionPrefix))


export const getNumberOfElementsForSection = <T extends object>(contents: T, sectionPrefix: string) => {
  const filteredKeys = filterContentsBySection(contents, sectionPrefix);
  if (filteredKeys.length === 0) return -1;
  const maxNumber = Math.max(
    ...filteredKeys.map((key) => {
      const regex = new RegExp(`${sectionPrefix}(\\d+)_`);
      const match = key.match(regex);
      if (!match) return 0;
      return parseInt(match[1]);
    })
  );
  return maxNumber;
}