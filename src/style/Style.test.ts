import { test, expect } from "vitest";
import { Styles, Style, Builder } from './Style'
import { Article } from './Article'

test("Style inheritance should work", () => {
    const styles: Array<Style> = getStyles();
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
    expect(properties['buttons']).toBeDefined();
    expect(properties['buttons'].length).toBe(0);
});


test("Styles should be assign in mobile", () => {
    const builder = new Builder(getArticles(), getStyles());
    builder.build();
    const { devices } = builder;

    expect(devices.mobile.size).toBe(2);
    let styles: Style[] | undefined = devices.mobile.get('#Col-9688709');
    expect(styles).toBeDefined();
    if (!styles) {
        return;
    }
    expect(styles.length).toBe(1);
    let style: Style = styles[0];
    if (!style) {
        return;
    }
    let { properties } = style;
    expect(properties['container']).toBeDefined();
    expect(properties['container']['background_color']).toBe('ff0000');
    expect(properties['container']['padding_left']).toBe(0);
    expect(properties['container']['padding_right']).toBe(0);


    styles = devices.mobile.get('#Col-9688710');
    expect(styles).toBeDefined();
    if (!styles) {
        return;
    }
    expect(styles.length).toBe(1);
    style = styles[0];
    if (!style) {
        return;
    }
    properties = style.properties;
    expect(properties['container']).toBeDefined();
    expect(properties['container']['background_color']).toBe('00ff00');
    expect(properties['container']['margin_left']).toBe(3);
    expect(properties['container']['margin_right']).toBe(5);
});

test("Styles should be assign in tablet", () => {
    const builder = new Builder(getArticles(), getStyles());
    builder.build();
    const { devices } = builder;

    expect(devices.tablet.size).toBe(3);
    let styles: Style[] | undefined = devices.tablet.get('#Col-9688709');
    expect(styles).toBeDefined();
    if (!styles) {
        return;
    }
    expect(styles.length).toBe(1);
    let style: Style = styles[0];
    if (!style) {
        return;
    }
    let { properties } = style;
    expect(properties['container']).toBeDefined();
    expect(properties['container']['background_color']).toBe('0000ff');
    expect(properties['container']['padding_left']).toBe(20);
    expect(properties['container']['padding_right']).toBe(20);
    expect(properties['container']['margin_left']).toBe(10);
    expect(properties['container']['margin_right']).toBe(30);


    styles = devices.tablet.get('#Col-9688710');
    expect(styles).toBeDefined();
    if (!styles) {
        return;
    }
    expect(styles.length).toBe(1);
    style = styles[0];
    if (!style) {
        return;
    }
    properties = style.properties;
    expect(properties['container']).toBeDefined();
    expect(properties['container']['background_color']).toBe('00ff00');
    expect(properties['container']['margin_left']).toBe(3);
    expect(properties['container']['margin_right']).toBe(5);
});

test("Styles should be assign in desktop", () => {
    const builder = new Builder(getArticles(), getStyles());
    builder.build();
    const { devices } = builder;

    expect(devices.desktop.size).toBe(3);
    let styles: Style[] | undefined = devices.desktop.get('#Col-9688709');
    expect(styles).toBeDefined();
    if (!styles) {
        return;
    }
    expect(styles.length).toBe(1);
    let style: Style = styles[0];
    if (!style) {
        return;
    }
    let { properties } = style;
    expect(properties['container']).toBeDefined();
    expect(properties['container']['background_color']).toBe('0000ff');
    expect(properties['container']['padding_left']).toBe(20);
    expect(properties['container']['padding_right']).toBe(20);
    expect(properties['container']['margin_left']).toBe(10);
    expect(properties['container']['margin_right']).toBe(30);


    styles = devices.desktop.get('#Col-9688710');
    expect(styles).toBeDefined();
    if (!styles) {
        return;
    }
    expect(styles.length).toBe(1);
    style = styles[0];
    if (!style) {
        return;
    }
    properties = style.properties;
    expect(properties['container']).toBeDefined();
    expect(properties['container']['background_color']).toBe('00ff00');
    expect(properties['container']['margin_left']).toBe(3);
    expect(properties['container']['margin_right']).toBe(5);
});

function getArticles(): Array<Article> {
    return [
        {
            id: '1',
            ArticleID: '1',
            style: '3',
            name: {
                'en': 'Example'
            },
            index: 0,
            pages: [],
            components: [
                {
                    id: "Col-9688709",
                    component: 'columns',
                    styles: ['5', '6'],
                    columns: [
                        [
                            {
                                id: "Col-9688710",
                                component: 'columns',
                                styles: ['7'],
                                columns: []
                            }
                        ]
                    ]
                }
            ]
        }
    ]
}

function getStyles(): Array<Style> {
    return [
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
            type: 'article',
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
                },
                "buttons": [],
                "dividers": [],
            },
            type: 'article',
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
            type: 'article',
            tablet: '4',
            desktop: '4',
            supportedDevices: ['mobile', 'tablet', 'desktop']
        },
        {
            id: '4',
            parent: null,
            properties: {
                'canvas': {
                    "background_color": "ff0000",
                }
            },
            type: 'device',
            tablet: null,
            desktop: null,
            supportedDevices: ['mobile', 'tablet', 'desktop']
        },
        {
            id: '5',
            parent: null,
            properties: {
                'container': {
                    "background_color": "ff0000",
                    "padding_left": 0,
                    "padding_right": 0,
                }
            },
            type: 'custom',
            tablet: null,
            desktop: null,
            supportedDevices: ['mobile']
        },
        {
            id: '6',
            parent: null,
            properties: {
                'container': {
                    "background_color": "0000ff",
                    "padding_left": 20,
                    "padding_right": 20,
                    "margin_left": 10,
                    "margin_right": 30,
                }
            },
            type: 'custom',
            tablet: null,
            desktop: null,
            supportedDevices: ['tablet', 'desktop']
        },
        {
            id: '7',
            parent: null,
            properties: {
                'container': {
                    "background_color": "00ff00",
                    "margin_left": 3,
                    "margin_right": 5,
                }
            },
            type: 'custom',
            tablet: null,
            desktop: null,
            supportedDevices: ['mobile', 'tablet', 'desktop']
        },
    ];
}