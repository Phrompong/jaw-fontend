import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  formatDate,
  getCountDeviceShift,
  getDetailDeviceDaily,
} from "../service";
import { format } from "date-fns";
import { styles, ContainerModal } from "./deviceDailySummaries";

function DeviceShiftSummary() {
  const [data, setData] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [details, setDetails] = useState([]);

  const countJournalData = async () => {
    const result = await getCountDeviceShift("620398549fce3c3879c85705");

    const { data } = result;
    setData(data.deviceShiftSummaries ? data.deviceShiftSummaries.total : 0);
  };

  const detailDeviceDaily = async () => {
    const result = await getDetailDeviceDaily("620398549fce3c3879c85705");

    const { data } = result;
    setStartDate(
      data.startDate.length > 0 ? formatDate(data.startDate[0].date) : ""
    );
    setEndDate(data.endDate.length > 0 ? formatDate(data.endDate[0].date) : "");
    setDetails(data.details.length > 0 ? data.details : []);
  };

  const toggleModal = () => setIsVisible(!isVisible);

  useEffect(() => {
    countJournalData();
    detailDeviceDaily();
  }, []);

  return (
    <Container>
      <h1>DeviceShiftSummary : {data} วัน</h1> &nbsp;
      <h1 style={{ color: "blue" }} onClick={toggleModal}>
        Information
      </h1>
      {isVisible && (
        <div style={styles.modal}>
          <ContainerModal>
            <h1 style={{ textAlign: "right" }} onClick={toggleModal}>
              x
            </h1>
            <h1 style={{ textAlign: "left" }}>Device Shift Summary</h1>
            <h2>วันที่เริ่มต้น : {startDate.toString()}</h2>&nbsp;
            <h2>วันที่เริ่มต้น : {endDate.toString()}</h2>
          </ContainerModal>

          <table style={{ border: "1px" }}>
            <tr>
              <td>
                {details.map((item, index) => (
                  <h2 key={index}>
                    {index + 1}. &nbsp;
                    {formatDate(item.date)}
                  </h2>
                ))}
              </td>
            </tr>
          </table>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

export default DeviceShiftSummary;
