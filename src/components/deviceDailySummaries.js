import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  formatDate,
  getCountDeviceDaily,
  getDetailDeviceDaily,
} from "../service";

function DeviceDailySummary() {
  const [devices, setDevices] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [details, setDetails] = useState([]);

  const countDeviceDaily = async () => {
    const result = await getCountDeviceDaily("620398549fce3c3879c85705");

    const { data } = result;
    setDevices(data.deviceDailySummaries ? data.deviceDailySummaries.total : 0);
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
    countDeviceDaily();
    detailDeviceDaily();
  }, []);

  return (
    <Container>
      <h1>DeviceDailySummary : {devices} วัน</h1> &nbsp;
      <h1 style={{ color: "blue" }} onClick={toggleModal}>
        Information
      </h1>
      {isVisible && (
        <div style={styles.modal}>
          <ContainerModal>
            <h1 style={{ textAlign: "right" }} onClick={toggleModal}>
              x
            </h1>{" "}
            <h1 style={{ textAlign: "left" }}>Device Daily Summary</h1>
            <h2>วันที่เริ่มต้น : {startDate.toString()}</h2>&nbsp;
            <h2>วันที่เริ่มต้น : {endDate.toString()}</h2>
          </ContainerModal>

          <table style={{ border: "1px" }}>
            <tr>
              <td>
                {details.map((item, index) => (
                  <h2
                    key={index}
                    onClick={() => {
                      let hrs = [];
                      item.hours.map((item, index) => {
                        hrs.push(item.hour);
                      });

                      alert("จำนวนชัวโมง =" + hrs.sort((a, b) => a - b));
                    }}
                  >
                    {index + 1}. &nbsp;
                    {formatDate(item.date)}
                  </h2>
                ))}
              </td>
              <td>xx</td>
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

export const ContainerModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-left: 10px;
`;

export const styles = {
  modal: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: 20,
    boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
    maxHeight: "80%",
    overflowY: "auto",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
};

export default DeviceDailySummary;
