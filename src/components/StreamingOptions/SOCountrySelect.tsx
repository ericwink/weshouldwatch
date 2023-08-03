"use client";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

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
  const handleChange = (event: SelectChangeEvent) => {
    setCountry(event.target.value);
  };

  return (
    <div>
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
            <MenuItem value={each.code}>{each.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SOCountrySelect;
