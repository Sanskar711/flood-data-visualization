import Papa from 'papaparse';

const excelFile1 = '/data/metadata_org_indofloods.csv'
const excelFile2 = '/data/floodevents_org_indofloods.csv'
const geojsonFile = '/data/GeoJSON_Admin.json'

const fetchCSV = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const text = await response.text();
  return Papa.parse(text, { header: true }).data;
};

export const fetchData = async () => {
  try {
    const [df1, df2, states] = await Promise.all([
      fetchCSV(excelFile1),
      fetchCSV(excelFile2),
      fetch(geojsonFile).then(response => response.json())
    ]);

    // Validate data
    const validDf1 = df1.filter(row => row.Latitude && row.Longitude);
    return { df1: validDf1, df2, states };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
