import Article from './Article';
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
    console.log(styles);
    // TODO Transform array to map
    const stylesMap: Map<string, Style> = new Map();


    return stylesMap;
  }

  // TODO You are going to need this function to merge properties from style with their parent
  static mergeParentProperties = (style: Style, stylesMap: Map<string, Style>) => {
    console.log(stylesMap);
    return style
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

interface DeviceStyles {
  mobile: Map<string, Array<Style>>;
  tablet: Map<string, Array<Style>>;
  desktop: Map<string, Array<Style>>;
}

export class Builder {
  articles: Array<Article>;
  styles: Map<string, Style>;
  devices: DeviceStyles;
  constructor(
    articles: Array<Article>,
    styles: Array<Style> | Map<string, Style>,
  ) {
    this.articles = articles;
    if (Array.isArray(styles)) {
      this.styles = Styles.resolveInheritance(styles);
    } else {
      this.styles = styles;
    }
    this.devices = {
      mobile: new Map(),
      tablet: new Map(),
      desktop: new Map(),
    };
  }

  // In here do the logic
  build() {

  }
}


export default Style;
