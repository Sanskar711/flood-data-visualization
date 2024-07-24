import Papa from 'papaparse';

const excelFile1 = 'https://drive.google.com/uc?export=download&id=1qLi6PaWw7FblfFAvHXTrp1zxVwlug-KT'
const excelFile2 = 'https://drive.google.com/uc?export=download&id=1WnLd5Z7IsftTM-OPgSO7eiHHRtIz0Zrd'
const geojsonFile = 'https://drive.google.com/uc?export=download&id=1m1n4iKVL2iHBRgcSpj2cbpHs2gy82cwp'

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
