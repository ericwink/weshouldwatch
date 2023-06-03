"use client";

import { ReactNode, useState, SyntheticEvent, Children } from "react";
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

interface Props {
  children: ReactNode[];
  tabNames: string[];
}

export default function TabDisplay({ children, tabNames }: Props) {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const mappedTabNames = tabNames.map((tabName, index) => {
    return (
      <Tab
        label={tabName}
        {...a11yProps(index)}
        key={`${tabName}-${index}`}
      />
    );
  });

  const mappedChildren = Children.map(children, (child, index) => {
    return (
      <TabPanel
        value={value}
        index={index}
      >
        {child}
      </TabPanel>
    );
  });

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
          {mappedTabNames}
          {/* <Tab
            label={tabOne}
            {...a11yProps(0)}
          />
          <Tab
            label={tabTwo}
            {...a11yProps(1)}
          />
          <Tab
            label={tabThree}
            {...a11yProps(2)}
          /> */}
        </Tabs>
      </Box>
      {mappedChildren}
    </Box>
  );
}
