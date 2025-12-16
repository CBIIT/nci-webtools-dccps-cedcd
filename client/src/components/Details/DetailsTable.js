import React, { Component } from "react";
import { Link } from "react-router-dom";

class DetailsTable extends Component {
  render() {
    const params = this.props.params;
    const values = params.values;
    //console.dir(values)
    const cohorts = params.cohorts;
    const config = params.config;
    const sideHeader = config.sideHeader;
    const data_columns = [];

    const cohort_columns = cohorts.map((item, idx) => {
      const key = "th_cohort_" + item.cohort_id;
      data_columns.push("c_" + item.cohort_id);
      let style = { width: config.header[idx] + "px", height: "37px" };
      let url = "./cohort?id=" + item.cohort_id;
      return (
        <th style={style} key={key}>
          <Link to={url} onClick={this.props.saveHistory}>
            {" "}
            {item.cohort_acronym}{" "}
          </Link>
        </th>
      );
    });

    const column_count = cohorts.length + 1;
    const content = values.map((item, idx) => {
      const key = "rows_" + idx;
      if (item.type === "block") {
        let cls = values[idx + 1].cls ? "section-expand active" : "section-expand";
        let style = {
          height: sideHeader[idx] + "px",
        };
        return (
          <tr key={key} style={style}>
            <th
              className="compareGroup-header"
              colSpan={column_count}
              onClick={() => this.props.expand(idx + 1, item.rows)}>
              {item.name}
              <a className={cls}></a>
            </th>
          </tr>
        );
      } else if (item.type === "array") {
        let row = <th>{item.name}</th>;
        const cohort_row = data_columns.map((item_1, idx_1) => {
          const ckey = "c_" + idx + "_" + idx_1;
          const array = item[item_1].join("; ");
          const array_title = item[item_1].join("\n");
          return (
            <td key={ckey} title={array_title}>
              {array}
            </td>
          );
        });
        let cls = item.cls ? "compare-row" : "compare-row compare-section-hidden";
        let style = {
          height: sideHeader[idx] + "px",
        };
        return (
          <tr key={key} className={cls} style={style}>
            {row}
            {cohort_row}
          </tr>
        );
      } else {
        let style = {
          height: sideHeader[idx] + "px",
        };
        let row = <th style={style}>{item.name}</th>;
        const cohort_row = data_columns.map((item_1, idx_1) => {
          const ckey = "c_" + idx + "_" + idx_1;
          return (
            <td key={ckey} style={style} title={item[item_1]}>
              {item[item_1]}
            </td>
          );
        });
        let cls = item.cls ? "compare-row" : "compare-row compare-section-hidden";

        if (item.rows) {
          return (
            <tr key={key} className={cls} style={style} onClick={() => this.props.expand(idx + 1, item.rows)}>
              {row}
              {cohort_row}
            </tr>
          );
        } else {
          return (
            <tr key={key} className={cls} style={style}>
              {row}
              {cohort_row}
            </tr>
          );
        }
      }
    });

    let cname = "table-col-" + config.first_column_width;

    return (
      <div>
        <table
          cellSpacing="0"
          rules="all"
          has_results="true"
          border="1"
          id="compareGridView"
          style={{ borderCollapse: "collapse", borderLeft: "0px", tableLayout: "fixed" }}>
          <thead>
            <tr id="sticker" className="col-header">
              <th id="DataCollected" className={cname}>
                Data Collected
              </th>
              {cohort_columns}
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    );
  }
}

export default DetailsTable;
