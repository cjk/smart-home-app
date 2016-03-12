import Typography from 'typography';

const { GoogleFont, TypographyStyle } = Typography(
  {
    "baseFontSize": "18px",
    "baseLineHeight": "28.5px",
    "modularScales": [
      "diminished fourth",
      [
        "768px",
        "minor third"
      ]
    ],
    "googleFonts": [
      {
        "name": "Lato",
        "styles": [
          "100",
          "400",
          "700",
          "900"
        ]
      }
    ],
    "headerFontFamily": "Lato, sans-serif",
    "bodyFontFamily": "Lato, sans-serif",
    "headerGray": 20,
    "headerGrayHue": 0,
    "bodyGray": 20,
    "bodyGrayHue": 0,
    "headerWeight": 700,
    "bodyWeight": 400,
    "boldWeight": 700,
    "fontFaces": []
  });

export default { GoogleFont, TypographyStyle };
