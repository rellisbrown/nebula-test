import React, {
  useContext,
  useRef,
  useEffect,
  useState,
  useCallback,
} from 'react';
import styled from 'styled-components';
import { QlikContext } from '../utils/qlik/qlikContext';

import BasicChart from './BasicChart';
import CustomPieChart from './CustomPieChart';
import Faker from './Faker';

const StyledDashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const CurrentSelectionsBar = styled.div`
  margin: 0px auto 0px auto;
  width: 400px;
  height: 100px;
`;

const ChartsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 100%;
`;

const Dashboard = () => {
  const { doc, nebula } = useContext(QlikContext);
  /*   console.log(doc);
  console.log(nebula); */

  const currentSelectionsRef = useRef();

  const [currentSelections, setCurrentSelections] = useState();

  const renderCurrentSelections = useCallback(async () => {
    const selections = await nebula.selections();
    selections.mount(currentSelectionsRef.current);
    setCurrentSelections(selections);
  }, [nebula]);

  useEffect(() => {
    if (nebula && !currentSelections) {
      renderCurrentSelections();
    }
  }, [nebula, currentSelections, renderCurrentSelections]);

  console.log(nebula);

  const chartsArray = [
    {
      id: 'MEAjCJ',
      title: 'Pie Chart',
      width: '40%',
      height: '60%',
    },
    {
      id: 'MRmuW',
      title: 'Bar Chart',
      width: '40%',
      height: '60%',
    },
    {
      id: 'qamd',
      title: 'Line Chart',
      width: '80%',
      height: '60%',
    },
    {
      id: 'bsxkrg',
      title: 'Scatter Plot',
      width: '80%',
      height: '60%',
    },
  ];

  return (
    <StyledDashboardContainer>
      <CurrentSelectionsBar ref={currentSelectionsRef} />
      <ChartsContainer>
        {chartsArray.map((chart) => (
          <BasicChart
            key={chart.title}
            id={chart.id}
            title={chart.title}
            width={chart.width}
            height={chart.height}
          />
        ))}
        <CustomPieChart
          id={'MEAjCJ'}
          title={'Custom Pie Chart'}
          width={'60%'}
          height={'80%'}
        />
      </ChartsContainer>

      {/* <button onClick={() => chart.destroy()}>Destroy</button> */}
      {/* <Faker /> */}
    </StyledDashboardContainer>
  );
};

export default Dashboard;
