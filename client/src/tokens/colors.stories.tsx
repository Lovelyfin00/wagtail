import React from 'react';
import colors, { Hues, Shade } from './colors';
import { generateColorVariables } from './colorVariables';

const description = `
Wagtail’s typographic styles are made available as separate design tokens, but in most scenarios it’s better to use one of the predefined text styles.
`;

interface PaletteProps {
  color: string;
  hues: Hues;
}

/**
 * Generates a contrast grid URL from our color palette.
 */
const getContrastGridLink = () => {
  const url = 'https://contrast-grid.eightshapes.com/';
  const parameters =
    '?version=1.1.0&es-color-form__tile-size=compact&es-color-form__show-contrast=aaa&es-color-form__show-contrast=aa&es-color-form__show-contrast=aa18';
  const bg: string[] = [];
  const fg: string[] = [];
  Object.values(colors).forEach((hues: Hues) => {
    Object.values(hues).forEach((shade: Shade) => {
      const color = `${shade.hex}, ${shade.textUtility.replace('w-text-', '')}`;
      bg.push(color);

      if (!shade.usage.toLowerCase().includes('background only')) {
        fg.push(color);
      }
    });
  });

  return `${url}${parameters}&background-colors=${encodeURIComponent(
    bg.join('\r\n'),
  )}&foreground-colors=${encodeURIComponent(fg.join('\r\n'))}`;
};

const Palette = ({ color, hues }: PaletteProps) => (
  <div className="w-mb-4 w-mr-4 w-flex w-flex-row">
    {Object.entries(hues).map(([name, shade]) => (
      <div key={name}>
        <h3 className="w-h3">{`${color} ${name === 'DEFAULT' ? '' : name}`}</h3>
        <div
          className={`w-p-3 w-pr-0 w-flex w-flex-col w-w-52 w-h-52 ${
            shade.bgUtility
          } ${
            color === 'white' ? 'w-border w-border-solid w-border-grey-520' : ''
          } w-text-14 w-text-${shade.contrastText}`}
        >
          <code>{shade.textUtility}</code>
          <code>{shade.bgUtility}</code>
          <code>{shade.cssVariable}</code>
          <code>{shade.hsl}</code>
          <code>{shade.hex}</code>
        </div>
        <p className="mt-3 w-w-52">{shade.usage}</p>
      </div>
    ))}
  </div>
);

export default {
  title: 'Foundation / Colors',
  parameters: {
    docs: {
      extractComponentDescription: () => description,
    },
  },
};

export const ColorPalette = () => (
  <>
    <p>
      View <a href={getContrastGridLink()}>Contrast Grid</a>. Here is our full
      color palette, with contrasting text chosen for readability of this
      example only.
    </p>
    {Object.entries(colors).map(([color, hues]) => (
      <div key={color}>
        <h2 className="w-sr-only">{color}</h2>
        <Palette color={color} hues={hues} />
      </div>
    ))}
  </>
);

const variablesMap = Object.entries(generateColorVariables(colors))
  .map(([cssVar, val]) => `${cssVar}: ${val};`)
  .join('');
const secondaryHSL = colors.secondary.DEFAULT.hsl.match(
  /\d+(\.\d+)?/g,
) as string[];
// Make sure this contains no empty lines, otherwise Sphinx docs will treat this as paragraphs.
const liveEditorCustomisations = `:root {
  --w-color-primary: ${colors.primary.DEFAULT.hex};
  /* Any valid CSS format is supported. */
  --w-color-primary-200: ${colors.primary[200].hsl};
  /* Set each HSL component separately to change all hues at once. */
  --w-color-secondary-hue: ${secondaryHSL[0]};
  --w-color-secondary-saturation: ${secondaryHSL[1]}%;
  --w-color-secondary-lightness: ${secondaryHSL[2]}%;
}`;
// Story using inline styles only so it can be copy-pasted into the Wagtail documentation for color customisations.
const demoStyles = `
  :root {${variablesMap}}
  .wagtail-color-swatch {
    border-collapse: separate;
    border-spacing: 4px;
  }

  .wagtail-color-swatch td:first-child {
    height: 1.5rem;
    width: 1.5rem;
    border: 1px solid #333;
    forced-color-adjust: none;
  }
`;

const warningComment =
  '<!-- Auto-generated with Storybook. See https://github.com/wagtail/wagtail/blob/main/client/src/tokens/colors.stories.tsx. Copy this comment’s parent section to update the `custom_user_interface_colours` documentation. -->';

const colorCustomisationsDemo = (
  <section>
    <div
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: warningComment,
      }}
    />
    <p>
      Make sure to test any customisations against our{' '}
      <a href={getContrastGridLink()}>Contrast Grid</a>. Try out your own
      customisations with this interactive style editor:
    </p>
    {/* Required styles are in a separate tag so they can’t be overridden, compressed to a single line for ease of copy-pasting. */}
    <style>{demoStyles.replace(/\s+/gm, ' ')}</style>
    <pre>
      {/* contentEditable style element so it can be edited directly in the browser. */}
      <style
        contentEditable
        suppressContentEditableWarning={true}
        style={{ display: 'block' }}
      >
        {liveEditorCustomisations}
      </style>
    </pre>
    <table className="wagtail-color-swatch">
      <thead>
        <tr>
          <th aria-label="Swatch" />
          <th>Variable</th>
          <th>Usage</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(colors).map((hues) =>
          Object.entries(hues)
            //  Show DEFAULT shades first, then in numerical order.
            .sort(([nameA], [nameB]) =>
              nameA === 'DEFAULT' ? -1 : Number(nameB) - Number(nameA),
            )
            .map(([name, shade]) => (
              <tr key={shade.hex}>
                <td style={{ backgroundColor: `var(${shade.cssVariable})` }} />
                <td>
                  <code>{shade.cssVariable}</code>
                </td>
                <td>{shade.usage}</td>
              </tr>
            )),
        )}
      </tbody>
    </table>
  </section>
);

export const ColorCustomisations = () => (
  <>
    <p>
      Use this story to test customising colors. The section below is also
      copied in the Wagtail docs so implementers know which colors are
      customisable in a given release.
    </p>
    <hr />
    {colorCustomisationsDemo}
  </>
);
