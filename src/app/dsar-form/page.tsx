"use client";

import { CircularProgress, Container, Box, TextField, Radio, FormControlLabel, Button, FormControl, FormLabel, RadioGroup, Typography, Checkbox } from "@mui/material";
import { handleFormSubmit } from "@/src/lib/serverActions";
import { FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const DSAR_Form = () => {
  const [success, setSuccess] = useState(false);

  const { mutate: sendForm, isLoading } = useMutation({
    mutationFn: async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const response = await handleFormSubmit(formData);
      if (response.error) throw new Error();
      return "success";
    },
    onSuccess: () => {
      setSuccess(true);
    },
    onError: () => {
      toast.error("There was an error, please try again", { theme: "colored" });
    },
  });

  if (success) return <Typography>Form submitted successfully</Typography>;

  return (
    <Container
      maxWidth="md"
      sx={{ pt: 2 }}
    >
      <form onSubmit={sendForm}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography>Data Subject Access Request Form</Typography>
          <FormLabel htmlFor="name">What is your full name?</FormLabel>
          <TextField
            placeholder="name"
            label="name"
            id="name"
            name="name"
          ></TextField>
          <FormLabel htmlFor="email">What is the email address you use to access this website?</FormLabel>
          <TextField
            placeholder="email"
            label="email"
            id="email"
            name="email"
            type="email"
          ></TextField>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">I am submitting this information on behalf of:</FormLabel>
            <RadioGroup
              aria-labelledby="radio-buttons-submitting-form-on-behalf-of"
              defaultValue="myself"
              name="on-behalf-of"
            >
              <FormControlLabel
                value="myself"
                control={<Radio />}
                label="Myself"
              />
              <FormControlLabel
                value="someone_else"
                control={<Radio />}
                label="Someone else"
              />
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel id="reason">What is the reason for your request?:</FormLabel>
            <RadioGroup
              aria-labelledby="radio-buttons-reason"
              defaultValue="myself"
              name="reason"
            >
              <FormControlLabel
                value="Get a copy of my personal information"
                control={<Radio />}
                label="Get a copy of my personal information"
              />
              <FormControlLabel
                value="Edit or correct my personal information"
                control={<Radio />}
                label="Edit or correct my personal information"
              />
              <FormControlLabel
                value="Restrict the processing of my personal information"
                control={<Radio />}
                label="Restrict the processing of my personal information"
              />
              <FormControlLabel
                value="Delete all my personal information"
                control={<Radio />}
                label="Delete all my personal information"
              />
            </RadioGroup>
          </FormControl>

          <FormLabel>I confirm the following:</FormLabel>
          <Box>
            <FormControlLabel
              required
              control={<Checkbox />}
              label="Under penalty of perjury, I declare all the above information to be true and accurate."
              name="all-accurate"
            />
            <FormControlLabel
              required
              control={<Checkbox />}
              label="I am the consumer of the above website or the agent authorized by the consumer to make this request on their behalf."
              name="consumer-or-agent"
            />
            <FormControlLabel
              required
              control={<Checkbox />}
              label="I understand that the deletion or restriction of my personal information is irreversible and may result in the termination of services with the above website"
              name="understand-deletion"
            />
            <FormControlLabel
              required
              control={<Checkbox />}
              label="I have read and agree to the privacy policy and I understand that I will be required to validate my request by email and I may be contacted in order to complete the request"
              name="agree-to-privacy-policy"
            />
          </Box>
        </Box>
        <Button type="submit">
          {isLoading && (
            <CircularProgress
              size={24}
              sx={{ position: "absolute", zIndex: 1, top: "50%", left: "50%", marginTop: "-12px", marginLeft: "-12px" }}
            />
          )}
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default DSAR_Form;
