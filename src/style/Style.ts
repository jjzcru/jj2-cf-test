export interface Style {
  id: string;
  name?: string;
  description?: string;
  properties: { [key: string]: any };
  supportedDevices: Array<"mobile" | "tablet" | "desktop">;
  type?: "article" | "device" | "custom";
  parent: `${number}` | null;
  tablet: `${number}` | null;
  desktop: `${number}` | null;
}

export class Styles {
  static resolveInheritance = (
    styles: Array<Style>,
  ): Map<string, Style> => {
    // TODO Transform array to map
    const stylesMap: Map<string, Style> = new Map();
    console.log(styles);
    return stylesMap;
  }
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export function mergeDeep(target: any, ...sources: any): any {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

function isObject(item: any) {
  return item && typeof item === "object" && !Array.isArray(item);
}

export default Style;
