// https://qlik.dev/tutorials/build-a-simple-mashup-using-nebulajs
import { embed } from '@nebula.js/stardust';
import barChart from '@nebula.js/sn-bar-chart';
import pieChart from '@nebula.js/sn-pie-chart';
import lineChart from '@nebula.js/sn-line-chart';
import sankeyChart from '@nebula.js/sn-sankey-chart';
import funneChart from '@nebula.js/sn-funnel-chart';
import mekkoChart from '@nebula.js/sn-mekko-chart';
import kpi from '@nebula.js/sn-kpi';
import scatterPlot from '@nebula.js/sn-scatter-plot';

// Register the relevant charts with Nebula.
const nebulaConfig = embed.createConfiguration({
  context: {
    theme: 'light',
    language: 'en-US',
    constraints: {
      active: false,
      passive: false,
      select: false,
    },
  },
  types: [
    {
      name: 'barchart', // Name must be all lowercase, barChart breaks it
      load: () => Promise.resolve(barChart),
    },
    {
      name: 'piechart',
      load: () => Promise.resolve(pieChart),
    },
    {
      name: 'linechart',
      load: () => Promise.resolve(lineChart),
    },
    {
      name: 'sankeychart',
      load: () => Promise.resolve(sankeyChart),
    },
    {
      name: 'funnechart',
      load: () => Promise.resolve(funneChart),
    },
    {
      name: 'mekkochart',
      load: () => Promise.resolve(mekkoChart),
    },
    {
      name: 'kpi',
      load: () => Promise.resolve(kpi),
    },
    {
      name: 'scatterplot',
      load: () => Promise.resolve(scatterPlot),
    },
  ],
});

export default nebulaConfig;
