import Typography from 'typography';

const BaseTypography = Typography(
  {
    'baseFontSize': '20px',
    'baseLineHeight': '30px',
    'modularScales': [
      'perfect fifth'
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
    'headerFontFamily': 'Open Sans',
    'bodyFontFamily': 'Lora',
    'headerGray': '25',
    'headerGrayHue': 0,
    'bodyGray': '25',
    'bodyGrayHue': 0,
    'headerWeight': '900',
    'bodyWeight': 400,
    'boldWeight': 700,
    'fontFaces': [],
    'googleBodyFont': 'Lora',
    'bodyFont': 'Lora',
    'googleHeaderFont': 'Open Sans',
    'headerFont': 'Open Sans'
  });

export default BaseTypography;
