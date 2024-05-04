import { useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  Collapse,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { ExpandMore, ExpandLess, Email, Phone } from "@mui/icons-material";
import "reactflow/dist/style.css";

const PeopleCard = ({ person }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // Calculate font size based on name length
  const getFontSize = (name) => {
    if (name.length <= 10) return "h6";
    if (name.length <= 15) return "subtitle1";
    return "subtitle2";
  };

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
        background: "linear-gradient(to bottom, #64b5f6, #bbdefb)",
        borderRadius: 8,
        overflow: "hidden",
      }}
      onClick={toggleExpanded}
    >
      <CardContent>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between" // Align items at start and end of container
          sx={{
            flexGrow: 1,
          }}
        >
          <Grid item>
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
          </Grid>
          <Grid item>
            <Typography
              variant={getFontSize(person.name)}
              component="div"
              align="center"
              gutterBottom={false}
            >
              {person.name}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton>
              {expanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </Grid>
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
                Date of Birth: {person.dateOfBirth}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Gender: {person.gender}
              </Typography>
            </Grid>
            {person.email && (
              <Grid container justifyContent="center">
                <Grid item>
                  <Email sx={{ marginRight: 1 }} />
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                    component="a"
                    href={`mailto:${person.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {person.email}
                  </Typography>
                </Grid>
              </Grid>
            )}
            {person.phoneNumber && (
              <Grid container justifyContent="center">
                <Grid item>
                  <Phone sx={{ marginRight: 1 }} />
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                    component="a"
                    href={`tel:${person.phoneNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {person.phoneNumber}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default PeopleCard;
