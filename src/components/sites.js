import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { formatDate, getCountSite } from "../service";
import { format } from "date-fns";

function Site() {
  const [pumps, setPumps] = useState(0);
  const [tanks, setTanks] = useState(0);

  const countJournalData = async () => {
    const result = await getCountSite("620398549fce3c3879c85705");

    const { data } = result;
    setPumps(data.pumps ? data.pumps.total : 0);
    setTanks(data.tanks ? data.tanks.total : 0);
  };

  useEffect(() => {
    countJournalData();
  }, []);

  return (
    <Container>
      <h1>Pump : {pumps} </h1>
      <h1>Tank : {tanks}</h1>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export default Site;
