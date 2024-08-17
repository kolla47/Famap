import { useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  Collapse,
  Grid,
  Typography,
} from "@mui/material";
import { ExpandMore, ExpandLess, Email, Phone } from "@mui/icons-material";
import "reactflow/dist/style.css";

const PeopleCard = ({ person }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((prev) => !prev);

  const getFontSize = (name) => {
    if (name.length <= 10) return "h6";
    if (name.length <= 15) return "subtitle1";
    return "subtitle2";
  };

  const InfoItem = ({ icon: Icon, text, href }) => (
    <Grid container alignItems="center" justifyContent="center">
      <Grid item>
        <Icon sx={{ marginRight: 1 }} />
      </Grid>
      <Grid item>
        <Typography
          variant="body2"
          color="text.secondary"
          gutterBottom
          component="a"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {text}
        </Typography>
      </Grid>
    </Grid>
  );

  const genderGradient =
    person.gender === "Male"
      ? "linear-gradient(to bottom, #64b5f6, #bbdefb)" // Blue gradient for males
      : "linear-gradient(to bottom, #f48fb1, #fce4ec)"; // Pink gradient for females

  return (
    <Card
      sx={{
        minWidth: 250,
        margin: "auto",
        mr: 2,
        cursor: "pointer",
        transition: "box-shadow 0.3s",
        "&:hover": {
          boxShadow:
            "0px 2px 4px rgba(0, 0, 0, 0.2), 0px 4px 8px rgba(0, 0, 0, 0.1)",
        },
        background: genderGradient,
        borderRadius: 8,
        overflow: "hidden",
      }}
      onClick={toggleExpanded}
    >
      <CardContent>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{ flexGrow: 1 }}
        >
          <Avatar
            sx={{
              width: 35,
              height: 35,
              mr: 3,
              backgroundColor: "#ffffff",
              color: "#1976d2",
            }}
          >
            {person.name.charAt(0)}
          </Avatar>
          <Typography
            variant={getFontSize(person.name)}
            component="div"
            align="center"
          >
            {person.name}
          </Typography>
          {expanded ? <ExpandLess /> : <ExpandMore />}
        </Grid>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Grid
            container
            spacing={1}
            alignItems="center"
            justifyContent="center"
            sx={{ marginTop: 2 }}
          >
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Date of Birth: {person.dateOfBirth || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Gender: {person.gender || "N/A"}
              </Typography>
            </Grid>
            {person.email && (
              <InfoItem
                icon={Email}
                text={person.email}
                href={`mailto:${person.email}`}
              />
            )}
            {person.phoneNumber && (
              <InfoItem
                icon={Phone}
                text={person.phoneNumber}
                href={`tel:${person.phoneNumber}`}
              />
            )}
          </Grid>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default PeopleCard;
