import React, {
  useContext,
  useRef,
  useEffect,
  useState,
  useCallback,
} from 'react';
import styled from 'styled-components';
import { QlikContext } from '../utils/qlik/qlikContext';

const StyledOuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  margin: auto;
`;

const StyledChartTitle = styled.h4`
  font-family: 'Segoe UI';
  display: flex;
  margin: auto;
  font-size: 32px;
`;

const StyledChartContainer = styled.div`
  /* display: flex; */
  height: 100%;
  width: 100%;
  /* margin: auto; */

  & .Header-containerTitleStyle {
    text-align: center;
    margin-bottom: 20px;
  }
`;

const CustomPieChart = ({ id, title, width, height }) => {
  const { doc, nebula } = useContext(QlikContext);

  const chartRef = useRef();

  const [chart, setChart] = useState();

  const slicesPlugin = {
    info: {
      name: 'pie-plugin',
      type: 'component-definition',
    },
    fn: ({ keys, layout }) => {
      console.log(keys, layout);
      const componentDefinition = {
        type: 'pie',

        // Provide the same name as the exisiting component to override it
        key: keys.COMPONENT.SLICES,
        settings: {
          slice: {
            innerRadius: 0.6,
            strokeWidth: 0,
            stroke: 'red',
            outerRadius: 0.8,
            cornerRadius: 2,
          },
        },
      };
      return componentDefinition;
    },
  };

  const labelsPlugin = {
    info: {
      name: 'labels',
      type: 'component-definition',
    },
    fn: ({ keys }) => {
      const componentDefinition = {
        // The type has to match with the componentName of the labels plugin definition above
        type: 'labels',
        key: keys.COMPONENT.PIE_LABELS,
        layout: {
          displayOrder: 2,
        },
        settings: {
          sources: [
            {
              component: 'slices',
              selector: 'path',
              strategy: {
                type: 'slice',
                settings: {
                  direction: 'horizontal',
                  align: 0.5,
                  justify: 1,
                  labels: [
                    {
                      /* label: (d) => d.data.label, */
                      fill: '#444',
                      fontSize: 16,
                      placements: [{ position: 'outside', fill: '#9a4040' }],
                    },
                    {
                      placements: [{ position: 'inside', fill: '#9a4040' }],
                      fontSize: 10,
                    },
                  ],
                },
              },
            },
          ],
        },
      };
      return componentDefinition;
    },
  };

  const renderChart = useCallback(async () => {
    if (chart) {
      chart.destroy();
    }
    const renderedChart = await nebula.render({
      element: chartRef.current,
      type: 'piechart',
      /* id: id, */
      plugins: [slicesPlugin, labelsPlugin],
      fields: ['Product Group Desc', '=Sum([Sales Margin Amount])'],
      properties: {
        title: 'Sales Amount by Product Group',
        dataPoint: {
          labelMode: 'share',
        },
      },
    });
    setChart(renderedChart);
  }, [nebula]);

  useEffect(() => {
    if (nebula /* && !chart */) {
      renderChart();
    }
  }, [nebula, /* chart, */ renderChart]);

  const getDimension = (dimension) => {
    if (typeof dimension == 'number') {
      return `${dimension}px`;
    }
    return dimension;
  };

  return (
    <StyledOuterContainer
      width={getDimension(width)}
      height={getDimension(height)}
    >
      <StyledChartTitle>{title}</StyledChartTitle>
      <StyledChartContainer ref={chartRef} />
    </StyledOuterContainer>
  );
};

export default CustomPieChart;
