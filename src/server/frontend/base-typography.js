import Typography from 'typography';

const BaseTypography = Typography(
  {
    'baseFontSize': '16px',
    'baseLineHeight': '24px',
    'modularScales': [
      'diminished fourth'
    ],
    'googleFonts': [
      {
        'name': 'Lato',
        'styles': [
          '100',
          '400',
          '700',
          '900'
        ]
      }
    ],
    'headerFontFamily': 'Lato, sans-serif',
    'bodyFontFamily': 'Lato, sans-serif',
    'headerGray': 20,
    'headerGrayHue': 0,
    'bodyGray': 40,
    'bodyGrayHue': 0,
    'headerWeight': 400,
    'bodyWeight': 400,
    'boldWeight': 700
  }
);

export default BaseTypography;
