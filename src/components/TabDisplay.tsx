"use client";

import { ReactNode, useState, SyntheticEvent, Children } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import SwipeableViews from "react-swipeable-views";

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  console.log("value: ", value);

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
          variant="scrollable"
        >
          {mappedTabNames}
        </Tabs>
      </Box>
      <Box sx={{ width: "100%" }}>
        <SwipeableViews
          index={value}
          onChangeIndex={handleChangeIndex}
          style={{ minHeight: "82vh" }}
        >
          {mappedChildren}
        </SwipeableViews>
      </Box>
    </Box>
  );
}
