import { test, expect } from "vitest";
import { Styles, Style } from './Style'

test("Style inheritance should work", () => {
    const styles: Array<Style> = [
        {
            id: '1',
            parent: null,
            properties: {
                'canvas': {
                    "body_color": "ffffff",
                    "padding_bottom": 2,
                }
            },
            tablet: null,
            desktop: null,
            supportedDevices: ['mobile', 'tablet', 'desktop']
        },
        {
            id: '2',
            parent: '1',
            properties: {
                'canvas': {
                    "body_color": "000000",
                    "padding_top": 0,
                }
            },
            tablet: null,
            desktop: null,
            supportedDevices: ['mobile', 'tablet', 'desktop']
        },
        {
            id: '3',
            parent: '2',
            properties: {
                'bullet': {
                    "font_style": "normal",
                }
            },
            tablet: null,
            desktop: null,
            supportedDevices: ['mobile', 'tablet', 'desktop']
        },
    ];
    const stylesMap = Styles.resolveInheritance(styles);
    let style: Style | undefined = stylesMap.get(`3`);
    expect(style).toBeDefined();
    if (!style) {
        return;
    }
    let { properties } = style;
    expect(style.parent).toBe(null);
    expect(properties?.['bullet']['font_style']).toBe('normal');
    expect(properties?.['canvas']['padding_bottom']).toBe(2);
    expect(properties?.['canvas']['padding_top']).toBe(0);
    expect(properties?.['canvas']['body_color']).toBe('000000');

    style = stylesMap.get('2');
    expect(style).toBeDefined();
    if (!style) {
        return;
    }

    properties = style.properties;
    expect(style.parent).toBe(null);
    expect(properties['bullet']).toBeUndefined();
    expect(properties['canvas']).toBeDefined();
    expect(properties['canvas']['padding_bottom']).toBe(2);
    expect(properties['canvas']['padding_top']).toBe(0);
    expect(properties['canvas']['body_color']).toBe('000000');

});