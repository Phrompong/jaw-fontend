import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { formatDate, getCountDay } from "../service";
import { format } from "date-fns";

function Day() {
  const [data, setData] = useState(0);

  const countDayData = async () => {
    const result = await getCountDay("620398549fce3c3879c85705");

    const { data } = result;
    console.log(data);
    setData(data.days ? data.days.total : 0);
  };

  useEffect(() => {
    countDayData();
  }, []);

  return (
    <Container>
      <h1>Day : {data} </h1>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export default Day;
