import React from "react";
import IconButton from "@mui/material/IconButton";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";

import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const BiggerToolTip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    boxShadow: theme.shadows[1],
    fontSize: 14,
  },
}));

const InfoTooltip = ({ message }) => {
  return (
    <BiggerToolTip title={message} placement="right">
      <IconButton style={{ padding: 0 }}>
        <HelpCenterIcon className="text-white" sx={{ fontSize: 32 }} />
      </IconButton>
    </BiggerToolTip>
  );
};

export default InfoTooltip;
