import jsPDF from "jspdf";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};
const colstyle = {
  width: "30%"
};
const tableStyle = {
  width: "100%"
};
const Prints = () => (
  <div>
    <h3>Time & Materials Statement of Work (SOW)</h3>
    <h4>General Information</h4>
    <table id="tab_customers" class="table table-striped" style={tableStyle}>
      <colgroup>
        <col span="1" style={colstyle} />
        <col span="1" style={colstyle} />
      </colgroup>
      <thead>
        <tr class="warning">
          <th>SOW Creation Date</th>
          <th>SOW Start Date</th>
          <th>Project</th>
          <th>Last Updated</th>
          <th>SOW End Date</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Dec 13, 2017</td>
          <td>Jan 1, 2018</td>
          <td>NM Connect - NMETNMCM</td>
          <td>Dec 13, 2017</td>
          <td>Dec 31, 2018</td>
        </tr>
      </tbody>
    </table>
    <p>
      This is a Time and Materials Statement of Work between Northwestern Mutual
      Life Insurance Company and Infosys with all general terms and conditions
      as described in the current Master Agreement and its related documents
    </p>
  </div>
);

const print = () => {
  const string = renderToString(<Prints />);
  const pdf = new jsPDF("p", "mm", "a4");
  const columns = [
    "SOW Creation Date",
    "SOW Start Date",
    "Project",
    "Last Updated",
    "SOW End Date"
  ];
  var rows = [
    [
      "Dec 13, 2017",
      "Jan 1, 2018",
      "ABC Connect - ABCXYZ",
      "Dec 13, 2017",
      "Dec 31, 2018"
    ]
  ];
  pdf.fromHTML(string);
  pdf.save("pdf");
};