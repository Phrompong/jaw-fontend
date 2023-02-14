import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import Journal from "./components/journals";
import Site from "./components/sites";
import Device from "./components/devices";
import DeviceSummary from "./components/deviceDailySummaries";
import DeviceShiftSummary from "./components/deviceShiftSummaries";
import LightOilSummary from "./components/lightOilDailySummaries";
import PumpDailySummary from "./components/pumpDailySummaries";
import Day from "./components/day";
import { getSites } from "../src/service";
import { Button } from "react-bootstrap";

function App() {
  const [site, setSite] = useState("test");

  const siteData = async () => {
    const sites = await getSites({ filter: { code: "I329" } });
    setSite(sites.data[0].name);
  };

  useEffect(() => {
    siteData();
  }, []);

  return (
    <div style={{ padding: "10px" }}>
      <h1>สถานี : {site}</h1>
      <Site></Site>
      <Device></Device>
      <Day></Day>
      <Journal></Journal>
      <DeviceSummary></DeviceSummary>
      <DeviceShiftSummary></DeviceShiftSummary>
      <LightOilSummary></LightOilSummary>
      <PumpDailySummary></PumpDailySummary>
    </div>
  );
}

export default App;
