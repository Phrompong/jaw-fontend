import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { formatDate, getCountDevice } from "../service";
import { format } from "date-fns";

function Device() {
  const [devices, setDevices] = useState(0);

  const countJournalData = async () => {
    const result = await getCountDevice("620398549fce3c3879c85705");

    const { data } = result;
    setDevices(data.devices ? data.devices.total : 0);
  };

  useEffect(() => {
    countJournalData();
  }, []);

  return (
    <Container>
      <h1>Device : {devices} </h1>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export default Device;
