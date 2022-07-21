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
  display: flex;
  height: 100%;
  width: 100%;
  margin: auto;

  & .Header-containerTitleStyle {
    text-align: center;
    margin-bottom: 20px;
  }
`;

const BasicChart = ({ id, title, width, height }) => {
  const { doc, nebula } = useContext(QlikContext);

  const chartRef = useRef();

  const [chart, setChart] = useState();

  const renderChart = useCallback(async () => {
    const renderedChart = await nebula.render({
      element: chartRef.current,
      id: id,
    });
    setChart(renderedChart);
  }, [nebula]);

  useEffect(() => {
    if (nebula && !chart) {
      renderChart();
    }
  }, [nebula, chart, renderChart]);

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

export default BasicChart;
