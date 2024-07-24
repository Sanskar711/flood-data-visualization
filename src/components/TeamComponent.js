// src/components/TeamComponent.js

import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

const teamMembers = [
  { Name: 'Alice Johnson', Role: 'Project Manager', Email: 'alice@example.com' },
  { Name: 'Bob Smith', Role: 'Lead Developer', Email: 'bob@example.com' },
  { Name: 'Charlie Brown', Role: 'Data Scientist', Email: 'charlie@example.com' }
];

const TeamComponent = () => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Role</TableCell>
          <TableCell>Email</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {teamMembers.map((member, index) => (
          <TableRow key={index}>
            <TableCell>{member.Name}</TableCell>
            <TableCell>{member.Role}</TableCell>
            <TableCell>{member.Email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default TeamComponent;
