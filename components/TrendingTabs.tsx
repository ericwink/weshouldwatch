"use client";

import { ReactNode, useState, SyntheticEvent } from "react";
import { Tabs, Tab, Typography, Box } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TrendingTabs({ children }: { children: ReactNode[] }) {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ width: "100%" }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="Trending Movies"
            {...a11yProps(0)}
          />
          <Tab
            label="Trending TV"
            {...a11yProps(1)}
          />
          <Tab
            label="Trending People"
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <TabPanel
        value={value}
        index={0}
      >
        {children[0]}
      </TabPanel>
      <TabPanel
        value={value}
        index={1}
      >
        {children[1]}
      </TabPanel>
      <TabPanel
        value={value}
        index={2}
      >
        {children[2]}
      </TabPanel>
    </Box>
  );
}
