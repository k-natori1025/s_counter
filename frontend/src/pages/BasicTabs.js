import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import a11yProps from '../components/a11yProps';
import TabPanel from '../components/TabPanel';
import Situation from '../components/Situation';
import CustomersList from '../components/CustomersList';

function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="混雑状況" {...a11yProps(0)} />
          <Tab label="入退室管理" {...a11yProps(1)} />
          <Tab label="イベント管理" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Situation />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CustomersList />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}

export default BasicTabs