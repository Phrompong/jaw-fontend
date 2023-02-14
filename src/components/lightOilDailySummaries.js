import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { formatDate, getCountLightOil, getDetailLightOil } from "../service";
import { format } from "date-fns";
import { styles, ContainerModal } from "./deviceDailySummaries";

function DeviceShiftSummary() {
  const [data, setData] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [details, setDetails] = useState([]);

  const countJournalData = async () => {
    const result = await getCountLightOil("620398549fce3c3879c85705");

    const { data } = result;
    setData(data.lightOilDaily ? data.lightOilDaily.total : 0);
  };

  const detailLightOil = async () => {
    const result = await getDetailLightOil("620398549fce3c3879c85705");

    const { data } = result;
    setStartDate(data.startDate ? formatDate(data.startDate) : "");
    setEndDate(data.endDate ? formatDate(data.endDate) : "");
    setDetails(data.details.length > 0 ? data.details : []);
  };

  const toggleModal = () => setIsVisible(!isVisible);

  useEffect(() => {
    countJournalData();
    detailLightOil();
  }, []);

  return (
    <Container>
      <h1>LightOilDailySummary : {data} วัน</h1> &nbsp;
      <h1 style={{ color: "blue" }} onClick={toggleModal}>
        {startDate ? "Information" : ""}
      </h1>
      {isVisible && (
        <div style={styles.modal}>
          <ContainerModal>
            <h1 style={{ textAlign: "right" }} onClick={toggleModal}>
              x
            </h1>
            <h1 style={{ textAlign: "left" }}>Light oil Daily Summary</h1>
            <h2>วันที่เริ่มต้น : {startDate.toString()}</h2>&nbsp;
            <h2>วันที่เริ่มต้น : {endDate.toString()}</h2>
          </ContainerModal>

          <table style={{ border: "1px" }}>
            <tr>
              {details.map((item, index) => (
                <h2
                  key={index}
                  onClick={() => {
                    let code = [];
                    item.materials.map((item, index) => {
                      code.push(item.code + "=" + item.names[0].value);
                    });

                    alert("สินค้าที่ขาย =" + code);
                  }}
                >
                  {index + 1}. &nbsp;
                  {formatDate(item.businessDate)}
                </h2>
              ))}
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
