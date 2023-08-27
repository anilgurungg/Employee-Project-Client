import React from 'react';
import { format, formatDistanceToNow } from 'date-fns';

const TimestampToDate = ({ timestamp }) => {
  const date = new Date(timestamp * 1000); // Convert to milliseconds
  // const formattedDate = format(date, ' MM dd, yyyy h:mma');
  const timeAgo = formatDistanceToNow(date, { addSuffix: true });

  return <span>{timeAgo}</span>;
};

export default TimestampToDate;

