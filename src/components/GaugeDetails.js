import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { DataContext } from '../context/DataContext';

const GaugeDetails = () => {
  const { gaugeId } = useParams();
  const { data, loading } = useContext(DataContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!loading) {
      const gaugeEvents = data.df2.filter(event => {
        const strippedGaugeId = event.GaugeID.replace(/-\w+$/, '');
        return strippedGaugeId === gaugeId;
      });
      setEvents(gaugeEvents);
    }
  }, [loading, gaugeId, data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Serial No.</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Peak Flood Level (m)</TableCell>
            <TableCell>Flood Type</TableCell>
            <TableCell>Peak Discharge Q (cumec)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((event, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{event['Start Date']}</TableCell>
              <TableCell>{event['End Date']}</TableCell>
              <TableCell>{event['Peak Flood Level (m)']}</TableCell>
              <TableCell>{event['Flood Type']}</TableCell>
              <TableCell>{event['Peak Discharge Q (cumec)']}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GaugeDetails;
