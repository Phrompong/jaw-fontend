import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { formatDate, getCountJournal } from "../service";
import { format } from "date-fns";

function Journal() {
  const [journals, setJournals] = useState(0);
  const [details, setDetails] = useState(0);
  const [payments, setPayments] = useState(0);
  const [dateNow, setDateNow] = useState(formatDate(new Date()));

  const countJournalData = async () => {
    const result = await getCountJournal("620398549fce3c3879c85705");

    const { data } = result;
    setJournals(data.journals ? data.journals.total : 0);
    setDetails(data.details ? data.details.total : 0);
    setPayments(data.payments ? data.payments.total : 0);
  };

  useEffect(() => {
    countJournalData();

    const intervalId = setInterval(() => {
      countJournalData();
      setDateNow(formatDate(new Date()));
    }, 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Container>
      {/* <h1>ข้อมูล ณ เวลา : {dateNow.toString()} </h1> */}
      <h1>Journal : {journals} </h1>
      <h1>Detail : {details}</h1>
      <h1>Payment : {payments}</h1>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export default Journal;
