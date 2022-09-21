import React, { useState } from "react";
import "./secondStep.css";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import demodata from "../../demodata.json";
import rect from "../../assets/rect.png";
import small from "../../assets/small.png";
import clos from "../../assets/clos.png";


const SecondStep = (props) => {
  const isShow = props.show;
  const [filterData, setFilterData] = useState(demodata);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRule, setSelectRule] = useState([]);

  const addRule = (data, key) => {
    setFilterData((current) =>
      current.filter((title) => {
        return title.title != data.title;
      })
    );
    setSelectRule((selectedRule) => [...selectedRule, data.title]);
    props.setRule(true);
  };

  const removeRule = (data, key) => {
    const cancelRule = demodata.filter((item) => item.title === data[key]);
    const updated = filterData.concat(cancelRule);
    setFilterData(updated);
    const rule = selectedRule.filter((item) => item != data[key]);
    setSelectRule(rule);
    if (rule.length === 0) {
      props.setRule(false);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    e.target.value == ""
      ? props.setTitle("Untitled Union Rule")
      : props.setTitle("My first union rule");
  };

  return (
    <div className="secondstep-container">
      {isShow && (
        <div className="inputs-container">
          <div className="addedRule">
            {selectedRule.map((title, key) => (
              <div className="searched-texts" onClick={() => removeRule(selectedRule, key)}> 
              <img src={rect} />
              <p className="searched-items" >{title}</p>
              <img src={small} />
              <img src={clos} />
              </div>
            ))}
          </div>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <IconButton sx={{ p: "10px", color: "#1DC9D4" }} aria-label="menu">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search for an existing Rule or insert Rule ID"
              inputProps={{
                "aria-label": "Search for an existing Rule or insert Rule ID",
              }}
              onChange={(e) => handleChange(e)}
            />
          </Paper>
          {filterData
            .filter((val) => {
              if (searchTerm == "") {
                return null;
              } else if (
                val.title.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            })
            .map((val, key) => {
              return (
                <div
                  id="key"
                  className="rule"
                  onClick={() => addRule(val, key)}
                >
                  {val.title}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default SecondStep;
