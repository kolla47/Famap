import PropTypes from "prop-types";
import { Box, Button, ButtonGroup } from "@mui/material";

const BackgroundSelector = ({ onChange }) => (
  <Box>
    <Box>Background :</Box>
    <ButtonGroup
      variant="contained"
      aria-label="Background selection button group"
    >
      <Button onClick={() => onChange("none")}>White</Button>
      <Button onClick={() => onChange("dots")}>Dots</Button>
      <Button onClick={() => onChange("lines")}>Lines</Button>
      <Button onClick={() => onChange("cross")}>Cross</Button>
    </ButtonGroup>
  </Box>
);

BackgroundSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default BackgroundSelector;
