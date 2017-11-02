module.exports = {
  siteMetadata: {
    title: `Starmap`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },
    {
      resolve: `gatsby-transformer-csv`,
      options: {
        colParser: {
          hip: '!number',
          hd: '!number',
          hr: '!number',
          ra: '!number',
          dec: '!number',
          dist: '!number',
          pmra: '!number',
          pmdec: '!number',
          rv: '!number',
          mag: '!number',
          absmag: '!number',
          ci: '!number',
          x: '!number',
          y: '!number',
          z: '!number',
          vx: '!number',
          vy: '!number',
          vz: '!number',
          var_max: '!number',
          var_min: '!number',
          lum: '!number',
          comp: '!number',
          comp_primary: '!number',
          pmdecrad: '!number',
          pmrarad: '!number',
          decrad: '!number',
          rarad: '!number',
        },
      },
    },
    `gatsby-plugin-react-helmet`,
  ],
};
