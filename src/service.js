import axios from "axios";
import React, { useState, useEffect } from "react";
import { zonedTimeToUtc } from "date-fns-tz";
import { format } from "date-fns";

export function formatDate(date) {
  return format(zonedTimeToUtc(new Date(date), "Asia/Bangkok"), "dd/MM/yyyy");
}

export async function getSites(body) {
  try {
    const { data } = await axios.post(
      "http://localhost:3001/api/v1/sites/query",
      body
    );

    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function getCountSite(site) {
  try {
    const { data } = await axios.get(
      `http://localhost:3001/api/v1/sites/count?site=${site}`
    );

    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function getCountDevice(site) {
  try {
    const { data } = await axios.get(
      `http://localhost:3001/api/v1/devices/count?site=${site}`
    );

    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function getCountDeviceDaily(site) {
  try {
    const { data } = await axios.get(
      `http://localhost:3001/api/v1/deviceDailySummaries/count?site=${site}`
    );

    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function getCountDeviceShift(site) {
  try {
    const { data } = await axios.get(
      `http://localhost:3001/api/v1/deviceShiftSummaries/count?site=${site}`
    );

    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function getCountLightOil(site) {
  try {
    const { data } = await axios.get(
      `http://localhost:3001/api/v1/lightOilDailySummaries/count?site=${site}`
    );

    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function getCountPumpDaily(site) {
  try {
    const { data } = await axios.get(
      `http://localhost:3001/api/v1/pumpDailySummaries/count?site=${site}`
    );

    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function getCountJournal(site) {
  try {
    const { data } = await axios.get(
      `http://localhost:3001/api/v1/journals/count?site=${site}`
    );

    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function getDetailDeviceDaily(site) {
  try {
    const { data } = await axios.get(
      `http://localhost:3001/api/v1/deviceDailySummaries/details?site=${site}`
    );

    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function getDetailDeviceShift(site) {
  try {
    const { data } = await axios.get(
      `http://localhost:3001/api/v1/deviceShiftSummaries/details?site=${site}`
    );

    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function getDetailLightOil(site) {
  try {
    const { data } = await axios.get(
      `http://localhost:3001/api/v1/lightOilDailySummaries/details?site=${site}`
    );

    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function getDetailPumpDaily(site) {
  try {
    const { data } = await axios.get(
      `http://localhost:3001/api/v1/pumpDailySummaries/details?site=${site}`
    );

    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function getCountDay(site) {
  try {
    const { data } = await axios.get(
      `http://localhost:3001/api/v1/days/count?site=${site}`
    );

    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}
