"use client";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { countryCodes } from "./countryCodes";

export interface CountryCode {
  code: string;
  name: string;
}

export interface Props {
  codeList: CountryCode[];
  country: string;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
}

const SOCountrySelect = ({ codeList, country, setCountry }: Props) => {
  const [open, setOpen] = useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    setCountry(event.target.value);
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>{countryCodes[country]}</Button>
      <Dialog
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Select your location</DialogTitle>
        <DialogContent>
          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="demo-simple-select-autowidth-label">Country</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={country}
              onChange={handleChange}
              autoWidth
              label="Age"
            >
              {codeList.map(each => (
                <MenuItem
                  value={each.code}
                  key={each.code}
                >
                  {each.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SOCountrySelect;
